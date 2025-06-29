import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { router } from 'expo-router';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import AnimatedSplashScreen from '@/components/AnimatedSplashScreen';
import { useFonts } from 'expo-font';
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  );
}

// Auth-aware navigation component
function AuthNavigator() {
  const { isSignedIn, isLoaded } = useAuth();
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const [showCustomSplash, setShowCustomSplash] = useState(true);
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    // Handle navigation logic
    if (isLoaded && !hasNavigated) {
      if (isSignedIn) {
        // User is already logged in - skip onboarding and login
        console.log('User is already signed in, navigating to dashboard...');
        
        // If animation is finished, navigate immediately
        if (isAnimationFinished) {
          setShowCustomSplash(false);
          setHasNavigated(true);
          
          // Hide native splash on web
          if (Platform.OS === 'web') {
            SplashScreen.hideAsync();
          }
          
          setTimeout(() => {
            router.replace('/(tabs)');
          }, 100);
        }
        // If animation is not finished, it will be handled in the next useEffect
      } else {
        // User is not logged in - show onboarding after animation
        console.log('User is not signed in, will show onboarding...');
        
        if (isAnimationFinished) {
          setShowCustomSplash(false);
          setHasNavigated(true);
          
          // Hide native splash on web
          if (Platform.OS === 'web') {
            SplashScreen.hideAsync();
          }
          
          setTimeout(() => {
            router.replace('/onboarding');
          }, 100);
        }
      }
    }
  }, [isLoaded, isSignedIn, isAnimationFinished, hasNavigated]);

  // Handle navigation when animation finishes (for already loaded auth state)
  useEffect(() => {
    if (isLoaded && isAnimationFinished && !hasNavigated) {
      setShowCustomSplash(false);
      setHasNavigated(true);
      
      // Hide native splash on web
      if (Platform.OS === 'web') {
        SplashScreen.hideAsync();
      }
      
      setTimeout(() => {
        if (isSignedIn) {
          console.log('Animation finished, user signed in - going to dashboard');
          router.replace('/(tabs)');
        } else {
          console.log('Animation finished, user not signed in - going to onboarding');
          router.replace('/onboarding');
        }
      }, 100);
    }
  }, [isLoaded, isSignedIn, isAnimationFinished, hasNavigated]);

  const handleAnimationFinish = () => {
    console.log('Animation finished, auth loaded:', isLoaded, 'signed in:', isSignedIn);
    setIsAnimationFinished(true);
  };

  // Show custom splash screen while auth is loading or animation is playing
  if (showCustomSplash || !isLoaded || !hasNavigated) {
    return <AnimatedSplashScreen onAnimationFinish={handleAnimationFinish} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  const [isFrameworkReady, setIsFrameworkReady] = useState(false);

  // Load Poppins fonts
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Light': Poppins_300Light,
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
  });

  // Use the required framework ready hook
  useFrameworkReady();

  useEffect(() => {
    // Initialize the app loading sequence
    const initializeApp = async () => {
      try {
        // Wait a moment to ensure the native splash is visible
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Mark framework as ready
        setIsFrameworkReady(true);
        
        // On mobile, ensure we show the custom splash after native splash
        if (Platform.OS !== 'web') {
          // Hide native splash and immediately show custom splash
          await SplashScreen.hideAsync();
        }
      } catch (error) {
        console.warn('Error during app initialization:', error);
        setIsFrameworkReady(true);
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    // Hide splash screen once fonts are loaded
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Show nothing while framework is loading (native splash will be visible)
  if (!isFrameworkReady) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <AuthNavigator />
      <StatusBar style="light" />
    </ClerkProvider>
  );
}