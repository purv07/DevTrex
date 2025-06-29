import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, Loader as Loader2, Linkedin } from 'lucide-react-native';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { authService } from '@/services/auth';

const { width, height } = Dimensions.get('window');

// --- Floating Elements Component ---
const FloatingElements = () => {
  const elements = [
    { size: 40, top: '15%', left: '10%', delay: 0 },
    { size: 60, top: '25%', right: '15%', delay: 200 },
    { size: 30, top: '45%', left: '5%', delay: 400 },
    { size: 50, top: '55%', right: '10%', delay: 600 },
    { size: 35, bottom: '25%', left: '15%', delay: 800 },
    { size: 45, bottom: '15%', right: '20%', delay: 1000 },
  ];

  return (
    <View style={StyleSheet.absoluteFill}>
      {elements.map((element, index) => {
        const translateY = useSharedValue(0);
        const opacity = useSharedValue(0.3);

        React.useEffect(() => {
          const animate = () => {
            translateY.value = withTiming(
              Math.random() * 20 - 10,
              { duration: 2000 + Math.random() * 1000 },
              () => {
                translateY.value = withTiming(
                  Math.random() * 20 - 10,
                  { duration: 2000 + Math.random() * 1000 },
                  () => runOnJS(animate)()
                );
              }
            );
          };

          setTimeout(() => {
            opacity.value = withTiming(0.6, { duration: 1000 });
            animate();
          }, element.delay);
        }, []);

        const animatedStyle = useAnimatedStyle(() => ({
          transform: [{ translateY: translateY.value }],
          opacity: opacity.value,
        }));

        return (
          <Animated.View
            key={index}
            style={[
              styles.floatingElement,
              {
                width: element.size,
                height: element.size,
                borderRadius: element.size / 2,
                top: element.top,
                bottom: element.bottom,
                left: element.left,
                right: element.right,
              },
              animatedStyle,
            ]}
          />
        );
      })}
    </View>
  );
};

// --- Main Login Component ---
export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(30);
  const buttonOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(50);
  const lottieOpacity = useSharedValue(0);
  const lottieScale = useSharedValue(0.8);

  React.useEffect(() => {
    // Animate title
    titleOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));
    titleTranslateY.value = withDelay(300, withSpring(0, { damping: 12 }));

    // Animate button section
    buttonOpacity.value = withDelay(600, withTiming(1, { duration: 800 }));
    buttonTranslateY.value = withDelay(600, withSpring(0, { damping: 12 }));

    // Animate Lottie animation (after button)
    lottieOpacity.value = withDelay(900, withTiming(1, { duration: 800 }));
    lottieScale.value = withDelay(900, withSpring(1, { damping: 12 }));
  }, []);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonTranslateY.value }],
  }));

  const lottieAnimatedStyle = useAnimatedStyle(() => ({
    opacity: lottieOpacity.value,
    transform: [{ scale: lottieScale.value }],
  }));

  const handleLinkedInLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setAuthStatus('Connecting to LinkedIn...');

      console.log('Starting LinkedIn OAuth flow...');
      
      const result = await authService.signInWithLinkedIn();
      
      if (result.success && result.user) {
        setAuthStatus('Authentication successful!');
        
        // Show success message and navigate
        setTimeout(() => {
          router.replace('/(tabs)');
        }, 1000);
      } else {
        throw new Error(result.error || 'Authentication failed');
      }
    } catch (error) {
      console.error('LinkedIn login error:', error);
      setAuthStatus('');
      
      const errorMessage = error instanceof Error && error.message ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      
      // Clear error after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoading(false);
      setTimeout(() => setAuthStatus(''), 3000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Lottie Animation - Background layer */}
        <Animated.View style={[styles.lottieContainer, lottieAnimatedStyle]}>
          <LottieView
            source={require('../assets/images/Animation - 1751180980647.json')}
            autoPlay
            loop={false}
            style={styles.lottieAnimation}
            resizeMode="contain"
          />
        </Animated.View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Floating Background Elements */}
          <FloatingElements />

          {/* Header Section */}
          <Animated.View style={[styles.headerSection, titleAnimatedStyle]}>
            <Text style={styles.mainTitle}>Connect Your</Text>
            <View style={styles.titleRow}>
              <Text style={styles.mainTitle}>Professional </Text>
              <View style={styles.highlightContainer}>
                <Text style={styles.highlightText}>Network</Text>
              </View>
            </View>
            <Text style={styles.mainTitle}>With DevTrex</Text>
            
            {/* LinkedIn branding */}
            <View style={styles.linkedinBranding}>
              <Text style={styles.linkedinText}>Powered by</Text>
              <View style={styles.linkedinLogo}>
                <Linkedin size={20} color="#FFFFFF" />
              </View>
            </View>
          </Animated.View>

          {/* Error Message */}
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Status Message */}
          {authStatus && (
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>{authStatus}</Text>
            </View>
          )}

          {/* Spacer to push content to center */}
          <View style={styles.spacer} />
        </ScrollView>

        {/* Fixed Button at Bottom - Positioned over animation */}
        <Animated.View style={[styles.fixedButtonContainer, buttonAnimatedStyle]}>
          <TouchableOpacity
            onPress={handleLinkedInLogin}
            style={[styles.loginButton, isLoading && styles.loginButtonLoading]}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} color="#0F0F0F" style={styles.loadingIcon} />
                <Text style={styles.loginButtonText}>Connecting...</Text>
              </>
            ) : (
              <>
                <Linkedin size={20} color="#0F0F0F" />
                <Text style={styles.loginButtonText}>Continue with LinkedIn</Text>
                <ArrowRight size={20} color="#0F0F0F" />
              </>
            )}
          </TouchableOpacity>
          
          {/* LinkedIn attribution */}
          <Text style={styles.attributionText}>
            Sign in with LinkedIn to access your professional network
          </Text>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  keyboardView: {
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
    paddingBottom: 140, // Add padding to account for fixed button
    zIndex: 10, // Ensure scroll content is above animation
  },
  floatingElement: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 119, 181, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 119, 181, 0.2)',
  },
  headerSection: {
    alignItems: 'center',
    marginTop: height * 0.08,
    marginBottom: height * 0.06,
  },
  mainTitle: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 40,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlightContainer: {
    backgroundColor: '#0077B5',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  highlightText: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    lineHeight: 40,
  },
  linkedinBranding: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 8,
  },
  linkedinText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  linkedinLogo: {
    backgroundColor: '#0077B5',
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.3)',
  },
  statusContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  statusText: {
    color: '#4ECDC4',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(78, 205, 196, 0.3)',
  },
  spacer: {
    flex: 1,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24, // Account for safe area
    paddingTop: 20,
    alignItems: 'center',
    zIndex: 50, // Highest z-index to ensure it's on top
    backgroundColor: 'transparent',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 25,
    gap: 12,
    shadowColor: '#0077B5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 20, // High elevation for Android
    minWidth: width * 0.8,
    zIndex: 60, // Ensure button is on top
  },
  loginButtonLoading: {
    opacity: 0.8,
  },
  loginButtonText: {
    color: '#0F0F0F',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  loadingIcon: {
    // Add rotation animation for loading icon
    transform: [{ rotate: '0deg' }],
  },
  attributionText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginTop: 12,
  },
  lottieContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1, // Background layer
  },
  lottieAnimation: {
    width: width * 1.4,
    height: height * 0.5,
  },
});