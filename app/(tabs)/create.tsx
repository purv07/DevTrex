import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Camera, 
  Image as ImageIcon, 
  Video, 
  FileText, 
  Mic, 
  Code, 
  Palette, 
  Sparkles,
  ArrowRight 
} from 'lucide-react-native';

export default function CreateScreen() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const createOptions = [
    {
      id: 'photo',
      title: 'Photo Post',
      description: 'Share a moment with your community',
      icon: Camera,
      gradient: ['#3B82F6', '#1D4ED8'],
      color: '#3B82F6',
    },
    {
      id: 'gallery',
      title: 'Gallery',
      description: 'Upload from your photo library',
      icon: ImageIcon,
      gradient: ['#10B981', '#059669'],
      color: '#10B981',
    },
    {
      id: 'video',
      title: 'Video',
      description: 'Record or upload a video',
      icon: Video,
      gradient: ['#EF4444', '#DC2626'],
      color: '#EF4444',
    },
    {
      id: 'article',
      title: 'Article',
      description: 'Write a detailed post or blog',
      icon: FileText,
      gradient: ['#8B5CF6', '#7C3AED'],
      color: '#8B5CF6',
    },
    {
      id: 'audio',
      title: 'Voice Note',
      description: 'Record an audio message',
      icon: Mic,
      gradient: ['#F59E0B', '#D97706'],
      color: '#F59E0B',
    },
    {
      id: 'code',
      title: 'Code Snippet',
      description: 'Share code with syntax highlighting',
      icon: Code,
      gradient: ['#6B7280', '#4B5563'],
      color: '#6B7280',
    },
  ];

  const quickActions = [
    { title: 'Story', icon: Sparkles, color: '#EC4899' },
    { title: 'Poll', icon: Palette, color: '#8B5CF6' },
    { title: 'Event', icon: FileText, color: '#10B981' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create</Text>
          <Text style={styles.headerSubtitle}>Share your ideas with the world</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickActionsScroll}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.quickActionCard}>
                <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}20` }]}>
                  <action.icon size={20} color={action.color} />
                </View>
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Main Create Options */}
        <View style={styles.createOptionsContainer}>
          <Text style={styles.sectionTitle}>What would you like to create?</Text>
          <View style={styles.createGrid}>
            {createOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.createCard,
                  selectedType === option.id && styles.createCardSelected
                ]}
                onPress={() => setSelectedType(option.id)}
              >
                <LinearGradient
                  colors={option.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.createCardGradient}
                >
                  <option.icon size={32} color="#FFFFFF" strokeWidth={2} />
                </LinearGradient>
                <View style={styles.createCardContent}>
                  <Text style={styles.createCardTitle}>{option.title}</Text>
                  <Text style={styles.createCardDescription}>{option.description}</Text>
                </View>
                {selectedType === option.id && (
                  <View style={styles.selectedIndicator}>
                    <View style={[styles.selectedDot, { backgroundColor: option.color }]} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Content Input */}
        {selectedType && (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>Add your content</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.contentInput}
                placeholder="What's on your mind?"
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
            </View>
            
            {/* Tags Input */}
            <View style={styles.tagsContainer}>
              <Text style={styles.tagsLabel}>Tags (optional)</Text>
              <TextInput
                style={styles.tagsInput}
                placeholder="Add tags separated by commas..."
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>
        )}

        {/* Action Buttons */}
        {selectedType && (
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.draftButton}>
              <Text style={styles.draftButtonText}>Save as Draft</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.publishButton}>
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.publishGradient}
              >
                <Text style={styles.publishButtonText}>Publish</Text>
                <ArrowRight size={20} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  quickActionsContainer: {
    marginBottom: 32,
    paddingLeft: 24,
  },
  quickActionsScroll: {
    paddingRight: 24,
  },
  quickActionCard: {
    alignItems: 'center',
    marginRight: 20,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#374151',
    textAlign: 'center',
  },
  createOptionsContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  createGrid: {
    gap: 16,
  },
  createCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  createCardSelected: {
    borderColor: '#6366F1',
    shadowColor: '#6366F1',
    shadowOpacity: 0.2,
  },
  createCardGradient: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  createCardContent: {
    flex: 1,
  },
  createCardTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  createCardDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  selectedDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  contentContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contentInput: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#1F2937',
    minHeight: 120,
  },
  tagsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tagsLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#374151',
    marginBottom: 8,
  },
  tagsInput: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#1F2937',
  },
  actionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 32,
  },
  draftButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  draftButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#374151',
  },
  publishButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  publishGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  publishButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 100,
  },
});