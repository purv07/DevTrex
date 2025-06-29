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
  Alert,
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
import { ArrowRight, Loader as Loader2 } from 'lucide-react-native';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useOAuth } from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';

const { width, height } = Dimensions.get('window');

// Complete the auth session for web
WebBrowser.maybeCompleteAuthSession();

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
  
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

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

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setAuthStatus('Connecting to Google...');

      console.log('Starting Google OAuth flow...');
      
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();
      
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        setAuthStatus('Authentication successful!');
        
        // Show success message
        if (Platform.OS !== 'web') {
          Alert.alert(
            'Welcome!',
            'You have successfully signed in with Google.',
            [
              {
                text: 'Continue',
                onPress: () => router.replace('/(tabs)'),
              },
            ]
          );
        } else {
          // For web, show a simple alert
          alert('Welcome! Authentication successful.');
          setTimeout(() => {
            router.replace('/(tabs)');
          }, 1000);
        }
      } else {
        // Handle sign-in or sign-up
        if (signIn || signUp) {
          setAuthStatus('Please complete the authentication process');
        } else {
          throw new Error('Authentication failed');
        }
      }
    } catch (error) {
      console.error('Google login error:', error);
      setAuthStatus('Authentication error');
      
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      
      if (Platform.OS !== 'web') {
        Alert.alert(
          'Error',
          errorMessage,
          [{ text: 'OK', style: 'default' }]
        );
      } else {
        alert(`Error: ${errorMessage}`);
      }
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
            <Text style={styles.mainTitle}>Create A</Text>
            <View style={styles.titleRow}>
              <Text style={styles.mainTitle}>Better </Text>
              <View style={styles.highlightContainer}>
                <Text style={styles.highlightText}>Future</Text>
              </View>
            </View>
            <Text style={styles.mainTitle}>For Yourself</Text>
            
            {/* Google branding */}
            <View style={styles.googleBranding}>
              <Text style={styles.googleText}>Powered by</Text>
              <View style={styles.googleLogo}>
                <Text style={styles.googleLogoText}>G</Text>
              </View>
            </View>
          </Animated.View>

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
            onPress={handleGoogleLogin}
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
                <Text style={styles.loginButtonText}>Start Now</Text>
                <ArrowRight size={20} color="#0F0F0F" />
              </>
            )}
          </TouchableOpacity>
          <Text style={styles.attributionText}>Sign in with Google to continue</Text>
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  highlightText: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#0F0F0F',
    lineHeight: 40,
  },
  googleBranding: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 8,
  },
  googleText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  googleLogo: {
    backgroundColor: '#4285F4',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleLogoText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
  },
  statusContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
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
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 20, // High elevation for Android
    minWidth: width * 0.6,
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