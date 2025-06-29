import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  SafeAreaView,
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
import { ArrowRight } from 'lucide-react-native';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';

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

  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(30);
  const buttonOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(50);
  const lottieOpacity = useSharedValue(0);
  const lottieScale = useSharedValue(0.8);

  React.useEffect(() => {
    // Animate Lottie animation first (background)
    lottieOpacity.value = withDelay(100, withTiming(1, { duration: 1000 }));
    lottieScale.value = withDelay(100, withSpring(1, { damping: 15 }));

    // Animate title
    titleOpacity.value = withDelay(400, withTiming(1, { duration: 800 }));
    titleTranslateY.value = withDelay(400, withSpring(0, { damping: 12 }));

    // Animate button section
    buttonOpacity.value = withDelay(700, withTiming(1, { duration: 800 }));
    buttonTranslateY.value = withDelay(700, withSpring(0, { damping: 12 }));
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

  const handleLogin = async () => {
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Lottie Animation - Fixed Background */}
      <Animated.View style={[styles.lottieBackground, lottieAnimatedStyle]}>
        <LottieView
          source={require('../assets/images/Animation - 1751180980647.json')}
          autoPlay
          loop={false}
          style={styles.lottieAnimation}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Content Container */}
      <View style={styles.contentContainer}>
        {/* Floating Background Elements */}
        <FloatingElements />

        {/* Header Section - Top Area */}
        <Animated.View style={[styles.headerSection, titleAnimatedStyle]}>
          <Text style={styles.mainTitle}>Create A</Text>
          <View style={styles.titleRow}>
            <Text style={styles.mainTitle}>Better </Text>
            <View style={styles.highlightContainer}>
              <Text style={styles.highlightText}>Future</Text>
            </View>
          </View>
          <Text style={styles.mainTitle}>For Yourself</Text>
        </Animated.View>

        {/* Spacer to push button to bottom */}
        <View style={styles.flexSpacer} />

        {/* Login Button Section - Bottom Area */}
        <Animated.View style={[styles.buttonSection, buttonAnimatedStyle]}>
          <TouchableOpacity
            onPress={handleLogin}
            style={[styles.loginButton, isLoading && styles.loginButtonLoading]}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? 'Signing In...' : 'Start Now'}
            </Text>
            {!isLoading && <ArrowRight size={20} color="#0F0F0F" />}
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    position: 'relative',
  },
  lottieBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0, // Background layer
  },
  lottieAnimation: {
    width: width * 1.8,
    height: height * 0.9,
    opacity: 0.4, // More subtle background effect
  },
  contentContainer: {
    flex: 1,
    zIndex: 1, // Content layer above background
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  floatingElement: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerSection: {
    alignItems: 'center',
    marginTop: height * 0.12,
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
  flexSpacer: {
    flex: 1, // This pushes the button to the bottom
  },
  buttonSection: {
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 34 : 24, // Safe area padding
    marginBottom: 20,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
    gap: 12,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
    minWidth: width * 0.7,
    // Enhanced button styling for prominence
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  loginButtonLoading: {
    opacity: 0.8,
  },
  loginButtonText: {
    color: '#0F0F0F',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
});