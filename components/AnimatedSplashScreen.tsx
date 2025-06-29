import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Platform, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  runOnJS,
  Easing,
  withRepeat,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// Optimized particle count for different platforms
const PARTICLE_COUNT = Platform.select({
  web: 25,
  ios: 12,
  android: 10,
  default: 10,
});

// Animation durations optimized for mobile
const ANIMATION_CONFIG = Platform.select({
  web: {
    backgroundDuration: 800,
    logoDelay: 400,
    logoDuration: 1000,
    shimmerDelay: 1500,
    shimmerDuration: 1200,
    totalDuration: 3000,
  },
  default: {
    backgroundDuration: 600,
    logoDelay: 200,
    logoDuration: 800,
    shimmerDelay: 1000,
    shimmerDuration: 800,
    totalDuration: 2500,
  },
});

// --- Reusable Particle Component ---
const Particle = ({ index }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    const delay = Math.random() * 2000;
    
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0, { duration: 1500 + Math.random() * 1000 })
        ),
        -1
      )
    );
    
    translateY.value = withDelay(
      delay,
      withRepeat(
        withTiming(-height, { 
          duration: 2500 + Math.random() * 1500,
          easing: Easing.out(Easing.ease),
        }),
        -1
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left: Math.random() * width,
          top: height + Math.random() * 100,
        },
        animatedStyle,
      ]}
    />
  );
};

// --- Reusable Ring Component ---
const Ring = ({ index }) => {
  const ring = useSharedValue(0);

  const ringStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(ring.value, [0, 0.5, 1], [0, 0.8, 0]),
      transform: [
        {
          scale: interpolate(ring.value, [0, 1], [0.3, 1.2]),
        },
      ],
    };
  });

  useEffect(() => {
    ring.value = withDelay(
      index * 400 + 800, // Start after logo appears
      withRepeat(
        withTiming(1, {
          duration: 2000,
          easing: Easing.out(Easing.ease),
        }),
        -1
      )
    );
  }, []);

  return (
    <Animated.View
      style={[
        styles.ring,
        {
          width: 120 + index * 40,
          height: 120 + index * 40,
          borderRadius: (120 + index * 40) / 2,
        },
        ringStyle,
      ]}
    />
  );
};

// --- Main Splash Screen Component ---
export default function AnimatedSplashScreen({ onAnimationFinish }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const logoRotation = useSharedValue(-180);
  const backgroundOpacity = useSharedValue(0);
  const shimmerTranslateX = useSharedValue(-width);
  const glowOpacity = useSharedValue(0);

  useEffect(() => {
    const config = ANIMATION_CONFIG;
    
    const startAnimation = () => {
      // Background fade in
      backgroundOpacity.value = withTiming(1, { 
        duration: config.backgroundDuration,
        easing: Easing.out(Easing.cubic),
      });

      // Logo entrance animations
      logoOpacity.value = withDelay(
        config.logoDelay, 
        withTiming(1, { 
          duration: config.logoDuration,
          easing: Easing.out(Easing.cubic),
        })
      );
      
      logoRotation.value = withDelay(
        config.logoDelay, 
        withTiming(0, { 
          duration: config.logoDuration, 
          easing: Easing.out(Easing.back(1.2)),
        })
      );
      
      logoScale.value = withDelay(
        config.logoDelay,
        withSequence(
          withTiming(1.3, { 
            duration: config.logoDuration * 0.7, 
            easing: Easing.out(Easing.back(1.5)) 
          }),
          withTiming(1, { 
            duration: config.logoDuration * 0.3, 
            easing: Easing.inOut(Easing.cubic) 
          })
        )
      );

      // Glow effect
      glowOpacity.value = withDelay(
        config.logoDelay + 200,
        withSequence(
          withTiming(1, { duration: 600 }),
          withTiming(0.3, { duration: 400 })
        )
      );

      // Shimmer effect
      shimmerTranslateX.value = withDelay(
        config.shimmerDelay,
        withTiming(width, { 
          duration: config.shimmerDuration, 
          easing: Easing.inOut(Easing.cubic) 
        })
      );

      // Finish animation - only call the callback, don't navigate
      setTimeout(() => {
        runOnJS(onAnimationFinish)();
      }, config.totalDuration);
    };

    // Start animation immediately on mobile, small delay on web
    const initDelay = Platform.OS === 'web' ? 100 : 0;
    setTimeout(startAnimation, initDelay);
  }, []);

  const backgroundStyle = useAnimatedStyle(() => ({
    opacity: backgroundOpacity.value,
  }));

  const logoContainerStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [
      { scale: logoScale.value },
      { rotate: `${logoRotation.value}deg` },
    ],
  }));

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shimmerTranslateX.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const handleImageError = (error) => {
    console.warn('Logo image failed to load:', error);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log('Logo loaded successfully on', Platform.OS);
    setImageLoaded(true);
  };

  const renderLogo = () => {
    if (imageError) {
      // Fallback to a styled text logo if image fails
      return (
        <View style={styles.fallbackLogo}>
          <Text style={styles.fallbackLogoText}>DevTrex</Text>
          <Text style={styles.fallbackSubtext}>Logo Error</Text>
        </View>
      );
    }

    // Try multiple image sources as fallback
    const logoSources = [
      require('../assets/images/app-icon.png'),
      // Add a fallback URI if needed
      { uri: 'https://via.placeholder.com/120x120/6A0DAD/FFFFFF?text=DevTrex' }
    ];

    return (
      <Image
        source={logoSources[0]}
        style={styles.logo}
        resizeMode="contain"
        onError={handleImageError}
        onLoad={handleImageLoad}
        // Add these props for better loading on mobile
        fadeDuration={300}
        loadingIndicatorSource={{ uri: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Animated Background */}
      <Animated.View style={[StyleSheet.absoluteFill, backgroundStyle]}>
        <LinearGradient
          colors={['#8B5CF6', '#6A0DAD', '#4C1D95']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
      </Animated.View>

      {/* Floating particles background effect */}
      <View style={StyleSheet.absoluteFill}>
        {[...Array(PARTICLE_COUNT)].map((_, index) => (
          <Particle key={index} index={index} />
        ))}
      </View>

      {/* Animated rings around logo */}
      <View style={styles.ringsContainer}>
        {[...Array(3)].map((_, index) => (
          <Ring key={index} index={index} />
        ))}
      </View>
      
      {/* Logo Container */}
      <Animated.View style={[styles.logoContainer, logoContainerStyle]}>
        {/* Glow effect behind logo */}
        <Animated.View style={[styles.glowEffect, glowStyle]} />
        
        {/* Main Logo */}
        {renderLogo()}

        {/* Debug info for development */}
        {__DEV__ && (
          <View style={styles.debugInfo}>
            <Text style={styles.debugText}>
              Platform: {Platform.OS}
            </Text>
            <Text style={styles.debugText}>
              Image Loaded: {imageLoaded ? 'Yes' : 'No'}
            </Text>
            <Text style={styles.debugText}>
              Image Error: {imageError ? 'Yes' : 'No'}
            </Text>
          </View>
        )}

        {/* Shimmer overlay effect */}
        <View style={styles.shimmerContainer}>
           <Animated.View style={[styles.shimmerOverlay, shimmerStyle]}>
            <LinearGradient
              colors={['transparent', 'rgba(255,255,255,0.6)', 'transparent']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.shimmerGradient}
            />
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6A0DAD',
  },
  gradient: {
    flex: 1,
  },
  // Particle styles
  particle: {
    position: 'absolute',
    width: Platform.select({ web: 5, default: 3 }),
    height: Platform.select({ web: 5, default: 3 }),
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: Platform.select({ web: 2.5, default: 1.5 }),
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  // Ring styles
  ringsContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    position: 'absolute',
    borderWidth: Platform.select({ web: 2, default: 1 }),
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  // Logo and effects
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  glowEffect: {
    position: 'absolute',
    width: Platform.select({ web: 160, default: 130 }),
    height: Platform.select({ web: 160, default: 130 }),
    borderRadius: Platform.select({ web: 80, default: 65 }),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 15,
  },
  logo: {
    width: Platform.select({ web: 120, default: 100 }),
    height: Platform.select({ web: 120, default: 100 }),
    zIndex: 2,
  },
  fallbackLogo: {
    width: Platform.select({ web: 120, default: 100 }),
    height: Platform.select({ web: 120, default: 100 }),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    zIndex: 2,
  },
  fallbackLogoText: {
    color: '#FFFFFF',
    fontSize: Platform.select({ web: 18, default: 16 }),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fallbackSubtext: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: Platform.select({ web: 10, default: 8 }),
    textAlign: 'center',
    marginTop: 4,
  },
  debugInfo: {
    position: 'absolute',
    top: Platform.select({ web: 140, default: 120 }),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 4,
    zIndex: 5,
  },
  debugText: {
    color: '#FFFFFF',
    fontSize: 10,
    textAlign: 'center',
  },
  shimmerContainer: {
    position: 'absolute',
    width: Platform.select({ web: 120, default: 100 }),
    height: Platform.select({ web: 120, default: 100 }),
    borderRadius: 20,
    overflow: 'hidden',
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: '-50%',
    width: '50%',
    height: '100%',
    transform: [{ skewX: '-20deg' }],
    zIndex: 3,
  },
  shimmerGradient: {
    flex: 1,
  },
});