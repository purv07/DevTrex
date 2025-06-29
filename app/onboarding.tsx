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
  runOnJS,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

// --- Illustration Components ---
const TimeIllustration = () => (
  <View style={styles.illustrationContainer}>
    {/* Sparkle */}
    <View style={[styles.sparkle, { top: 40, left: 60 }]}>
      <View style={styles.sparkleInner} />
    </View>
    
    {/* Main Clock Circle */}
    <View style={styles.clockContainer}>
      <LinearGradient
        colors={['#FF6B35', '#F7931E']}
        style={styles.clockGradient}
      >
        <View style={styles.clockCutout} />
      </LinearGradient>
    </View>
    
    {/* Wing/Feather Element */}
    <View style={styles.wingContainer}>
      <LinearGradient
        colors={['#6366F1', '#8B5CF6']}
        style={styles.wing}
      />
    </View>
  </View>
);

const LearningIllustration = () => (
  <View style={styles.illustrationContainer}>
    {/* Background Circles */}
    <View style={[styles.backgroundCircle, styles.circle1]} />
    <View style={[styles.backgroundCircle, styles.circle2]} />
    
    {/* Main Learning Card */}
    <View style={styles.learningCard}>
      <LinearGradient
        colors={['#6366F1', '#8B5CF6']}
        style={styles.cardGradient}
      >
        {/* Smiley Face */}
        <View style={styles.smileyContainer}>
          <View style={styles.smileyFace}>
            <View style={styles.eye} />
            <View style={styles.eye} />
            <View style={styles.smile} />
          </View>
        </View>
        
        {/* Card Elements */}
        <View style={styles.cardElements}>
          <View style={styles.cardLine} />
          <View style={[styles.cardLine, { width: 30 }]} />
        </View>
      </LinearGradient>
    </View>
  </View>
);

const CertificateIllustration = () => (
  <View style={styles.illustrationContainer}>
    {/* Background Orb */}
    <View style={styles.backgroundOrb} />
    
    {/* Certificate Book */}
    <View style={styles.certificateContainer}>
      <LinearGradient
        colors={['#FF6B35', '#F7931E']}
        style={styles.certificateGradient}
      >
        {/* Book Pages */}
        <View style={styles.bookPages} />
        
        {/* Star */}
        <View style={styles.starContainer}>
          <View style={styles.star} />
        </View>
        
        {/* Lock Icon */}
        <View style={styles.lockContainer}>
          <View style={styles.lock} />
        </View>
      </LinearGradient>
    </View>
  </View>
);

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
                backgroundColor: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.3)',
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
    title: 'We really value\nyour time',
    description: 'The classes last for 60 minutes,\nyou can schedule for any day.',
    illustration: TimeIllustration,
    buttonText: 'Continue Now',
  },
  {
    id: 2,
    title: 'You will\nlearn online',
    description: 'You won\'t need to spend money\nand time going to school.',
    illustration: LearningIllustration,
    buttonText: 'Continue Now',
  },
  {
    id: 3,
    title: 'You will learn\ncorrectly',
    description: 'Our teachers has a special\ninternational level certificate.',
    illustration: CertificateIllustration,
    buttonText: 'Let\'s Started',
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
  const IllustrationComponent = currentStepData.illustration;

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.content, contentAnimatedStyle]}>
        {/* Illustration Section */}
        <View style={styles.illustrationSection}>
          <IllustrationComponent />
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{currentStepData.title}</Text>
            <Text style={styles.description}>{currentStepData.description}</Text>
          </View>
          
          {/* Progress Dots */}
          <ProgressDots 
            currentStep={currentStep} 
            totalSteps={onboardingSteps.length} 
          />
          
          {/* Continue Button */}
          <TouchableOpacity onPress={handleNext} style={styles.continueButton}>
            <Text style={styles.continueButtonText}>
              {currentStepData.buttonText}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 10 : 0,
    paddingBottom: 20,
  },
  skipButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  skipText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  content: {
    flex: 1,
  },
  illustrationSection: {
    flex: 0.55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContainer: {
    width: width * 0.6,
    height: width * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  
  // Time Illustration Styles
  sparkle: {
    position: 'absolute',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sparkleInner: {
    width: 12,
    height: 12,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }],
  },
  clockContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
  },
  clockGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockCutout: {
    width: 40,
    height: 40,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  wingContainer: {
    position: 'absolute',
    right: -10,
    top: 20,
  },
  wing: {
    width: 60,
    height: 80,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  
  // Learning Illustration Styles
  backgroundCircle: {
    position: 'absolute',
    borderRadius: 50,
  },
  circle1: {
    width: 40,
    height: 40,
    backgroundColor: '#FF6B35',
    top: 20,
    right: 30,
  },
  circle2: {
    width: 24,
    height: 24,
    backgroundColor: '#F472B6',
    bottom: 40,
    left: 20,
  },
  learningCard: {
    width: 140,
    height: 100,
    borderRadius: 16,
    overflow: 'hidden',
    transform: [{ rotate: '-15deg' }],
  },
  cardGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  smileyContainer: {
    alignItems: 'flex-end',
  },
  smileyFace: {
    width: 24,
    height: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  eye: {
    position: 'absolute',
    width: 3,
    height: 3,
    backgroundColor: '#6366F1',
    borderRadius: 1.5,
  },
  smile: {
    position: 'absolute',
    bottom: 4,
    width: 8,
    height: 4,
    borderBottomWidth: 2,
    borderBottomColor: '#6366F1',
    borderRadius: 4,
  },
  cardElements: {
    gap: 4,
  },
  cardLine: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 1,
    width: 60,
  },
  
  // Certificate Illustration Styles
  backgroundOrb: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#6366F1',
    borderRadius: 30,
    top: -10,
    right: -10,
    opacity: 0.8,
  },
  certificateContainer: {
    width: 120,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    transform: [{ rotate: '10deg' }],
  },
  certificateGradient: {
    flex: 1,
    position: 'relative',
  },
  bookPages: {
    position: 'absolute',
    right: 8,
    top: 8,
    bottom: 8,
    width: 80,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 4,
  },
  starContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  star: {
    width: 16,
    height: 16,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }],
  },
  lockContainer: {
    position: 'absolute',
    bottom: 20,
    right: 30,
  },
  lock: {
    width: 12,
    height: 12,
    backgroundColor: '#6366F1',
    borderRadius: 2,
  },
  
  // Content Section Styles
  contentSection: {
    flex: 0.45,
    paddingHorizontal: 32,
    justifyContent: 'space-between',
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 24,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 40,
  },
  progressDot: {
    height: 8,
    borderRadius: 4,
  },
  continueButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  continueButtonText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});