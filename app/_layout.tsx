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
import { authService } from '@/services/auth';

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const [isFrameworkReady, setIsFrameworkReady] = useState(false);
  const [showCustomSplash, setShowCustomSplash] = useState(true);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

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
        
        // Check authentication status
        const authenticated = await authService.isAuthenticated();
        setIsAuthenticated(authenticated);
        
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
        setIsAuthenticated(false);
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

  useEffect(() => {
    // Handle the transition from custom splash to appropriate screen
    if (isAnimationFinished && isFrameworkReady && !hasNavigated && (fontsLoaded || fontError) && isAuthenticated !== null) {
      setShowCustomSplash(false);
      setHasNavigated(true);
      
      // Ensure native splash is hidden on web
      if (Platform.OS === 'web') {
        SplashScreen.hideAsync();
      }
      
      // Navigate based on authentication status
      setTimeout(() => {
        if (isAuthenticated) {
          router.replace('/(tabs)');
        } else {
          router.replace('/onboarding');
        }
      }, 100);
    }
  }, [isAnimationFinished, isFrameworkReady, hasNavigated, fontsLoaded, fontError, isAuthenticated]);

  const handleAnimationFinish = () => {
    setIsAnimationFinished(true);
  };

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Show custom splash screen when appropriate
  if (showCustomSplash && isFrameworkReady) {
    return <AnimatedSplashScreen onAnimationFinish={handleAnimationFinish} />;
  }

  // Show nothing while framework is loading (native splash will be visible)
  if (!isFrameworkReady) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}