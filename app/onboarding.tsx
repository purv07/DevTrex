import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Image,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  withSpring,
} from 'react-native-reanimated';
import { ArrowRight } from 'lucide-react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

// --- Background Elements Component ---
const BackgroundElements = ({ step }) => {
  // Different background elements for each step
  const getBackgroundForStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            {/* Dark semicircle in top left */}
            <Image 
              source={require('../assets/images/Group 411.png')}
              style={styles.darkSemicircle}
              resizeMode="contain"
            />
            {/* Abstract illustration elements */}
            <Image 
              source={require('../assets/images/illustration 1 copy.png')}
              style={styles.abstractElements}
              resizeMode="contain"
            />
          </>
        );
      case 1:
        return (
          <>
            {/* Grid pattern background for step 2 */}
            <Image 
              source={require('../assets/images/illustration 1 (1).png')}
              style={styles.gridPattern}
              resizeMode="contain"
            />
            {/* Additional decorative elements */}
            <View style={[styles.floatingIcon, styles.codeIcon1]}>
              <View style={styles.codeBlock} />
            </View>
            <View style={[styles.floatingIcon, styles.documentIcon2]}>
              <View style={styles.documentIcon} />
            </View>
          </>
        );
      case 2:
        return (
          <>
            {/* Grid pattern background for step 3 */}
            <Image 
              source={require('../assets/images/illustration 1 copy copy.png')}
              style={styles.gridPatternStep3}
              resizeMode="contain"
            />
            {/* Success floating icons */}
            <View style={[styles.floatingIcon, styles.successIcon1]}>
              <View style={styles.checkmark} />
            </View>
            <View style={[styles.floatingIcon, styles.successIcon2]}>
              <View style={styles.star} />
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.backgroundContainer}>
      {getBackgroundForStep()}
    </View>
  );
};

// --- Character Illustration Component ---
const CharacterIllustration = ({ step }) => {
  const scaleValue = useSharedValue(0);
  const translateY = useSharedValue(30);

  React.useEffect(() => {
    scaleValue.value = withSpring(1, {
      damping: 12,
      stiffness: 100,
    });
    translateY.value = withSpring(0, {
      damping: 12,
      stiffness: 100,
    });
  }, [step]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scaleValue.value },
      { translateY: translateY.value },
    ],
  }));

  const getCharacterImage = () => {
    switch (step) {
      case 0:
        // Person working on laptop in beanbag
        return require('../assets/images/Work In Beanbag copy.png');
      case 1:
        // Person working at desk - new image for step 2
        return require('../assets/images/Work In Desk.png');
      case 2:
        // New thumbs up illustration for step 3
        return require('../assets/images/Rectangle copy.png');
      default:
        return require('../assets/images/Work In Beanbag copy.png');
    }
  };

  return (
    <View style={styles.illustrationContainer}>
      {/* Background Elements */}
      <BackgroundElements step={step} />
      
      {/* Soft cream floor */}
      <View style={styles.creamFloor} />
      
      {/* Character */}
      <Animated.View style={[styles.characterWrapper, animatedStyle]}>
        <Image 
          source={getCharacterImage()}
          style={styles.characterImage}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

// --- Progress Dots Component ---
const ProgressDots = ({ currentStep, totalSteps }) => {
  return (
    <View style={styles.progressContainer}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = index === currentStep;
        
        return (
          <View
            key={index}
            style={[
              styles.progressDot,
              {
                backgroundColor: isActive ? '#4F46E5' : '#E2E8F0',
                width: isActive ? 24 : 8,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

// --- Onboarding Data ---
const onboardingSteps = [
  {
    id: 1,
    title: "Let's Get Started",
    description: 'Our goal is to ensure that you have everything you need to feel comfortable, confident, and ready to make an impact.',
  },
  {
    id: 2,
    title: 'Your Onboarding Journey Begins!',
    description: 'Our goal is to ensure that you have everything you need to feel comfortable, confident, and ready to make an impact.',
  },
  {
    id: 3,
    title: 'Your First Steps to Success',
    description: 'Our goal is to ensure that you have everything you need to feel comfortable, confident, and ready to make an impact.',
  },
];

// --- Main Onboarding Component ---
export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const contentOpacity = useSharedValue(1);
  const slideX = useSharedValue(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      // Slide transition
      contentOpacity.value = withTiming(0, { duration: 200 });
      slideX.value = withTiming(-30, { duration: 200 }, () => {
        runOnJS(setCurrentStep)(currentStep + 1);
        slideX.value = 30;
        slideX.value = withTiming(0, { duration: 300 });
        contentOpacity.value = withTiming(1, { duration: 300 });
      });
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateX: slideX.value }],
  }));

  const currentStepData = onboardingSteps[currentStep];
  const isLastStep = currentStep === onboardingSteps.length - 1;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with step indicator */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Onboarding {currentStep + 1}</Text>
      </View>

      <Animated.View style={[styles.content, contentAnimatedStyle]}>
        {/* Illustration Section */}
        <View style={styles.illustrationSection}>
          <CharacterIllustration step={currentStep} />
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          <Text style={styles.title}>{currentStepData.title}</Text>
          <Text style={styles.description}>{currentStepData.description}</Text>
          
          {/* Progress Dots */}
          <ProgressDots 
            currentStep={currentStep} 
            totalSteps={onboardingSteps.length} 
          />
        </View>
      </Animated.View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>
            {isLastStep ? 'Get Started' : 'Next'}
          </Text>
          <ArrowRight size={16} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  headerText: {
    color: '#A0AEC0',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
  },
  illustrationSection: {
    flex: 0.6,
    position: 'relative',
  },
  illustrationContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // Background elements for step 1 using provided images
  darkSemicircle: {
    position: 'absolute',
    top: -20,
    left: -20,
    width: 180,
    height: 120,
  },
  abstractElements: {
    position: 'absolute',
    bottom: '45%',
    left: '5%',
    width: 100,
    height: 80,
    opacity: 0.6,
  },
  // Grid pattern for step 2
  gridPattern: {
    position: 'absolute',
    top: '10%',
    right: '5%',
    width: 200,
    height: 150,
    opacity: 0.4,
  },
  // Grid pattern for step 3
  gridPatternStep3: {
    position: 'absolute',
    top: '15%',
    left: '5%',
    width: 180,
    height: 140,
    opacity: 0.3,
  },
  // Floating icons for step 2
  floatingIcon: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeIcon1: {
    top: '25%',
    left: '10%',
    backgroundColor: '#EBF8FF',
  },
  documentIcon2: {
    bottom: '40%',
    right: '15%',
    backgroundColor: '#F0F9FF',
  },
  codeBlock: {
    width: 20,
    height: 15,
    backgroundColor: '#3B82F6',
    borderRadius: 2,
  },
  documentIcon: {
    width: 16,
    height: 20,
    backgroundColor: '#4F46E5',
    borderRadius: 2,
  },
  globe: {
    width: 18,
    height: 18,
    backgroundColor: '#2563EB',
    borderRadius: 9,
  },
  // Success icons for step 3
  successIcon1: {
    top: '20%',
    right: '25%',
    backgroundColor: '#F0FDF4',
  },
  successIcon2: {
    bottom: '30%',
    left: '20%',
    backgroundColor: '#FEF3C7',
  },
  checkmark: {
    width: 16,
    height: 16,
    backgroundColor: '#10B981',
    borderRadius: 8,
  },
  star: {
    width: 16,
    height: 16,
    backgroundColor: '#F59E0B',
    borderRadius: 2,
  },
  creamFloor: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    backgroundColor: '#FFFBF0',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  characterWrapper: {
    position: 'relative',
    zIndex: 10,
  },
  characterImage: {
    width: width * 0.65,
    height: height * 0.35,
  },
  contentSection: {
    flex: 0.4,
    paddingHorizontal: 32,
    paddingTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 32,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  progressDot: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E2E8F0',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
    paddingTop: 20,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  skipText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#A0AEC0',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    gap: 8,
    elevation: 3,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
});