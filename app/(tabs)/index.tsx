import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, Search, TrendingUp, Users, Code as Code2, MessageSquare, Calendar, CircleCheck as CheckCircle, ArrowRight, Activity } from 'lucide-react-native';

export default function Dashboard() {
  const stats = [
    { label: 'Active Projects', value: '12', icon: Code2, color: '#4F46E5' },
    { label: 'Team Members', value: '24', icon: Users, color: '#3B82F6' },
    { label: 'Tasks Completed', value: '156', icon: CheckCircle, color: '#10B981' },
    { label: 'Messages', value: '89', icon: MessageSquare, color: '#8B5CF6' },
  ];

  const recentActivity = [
    { title: 'New project "Mobile App" created', time: '2 hours ago', type: 'project' },
    { title: 'Sarah completed task "UI Design"', time: '4 hours ago', type: 'task' },
    { title: 'Team meeting scheduled for tomorrow', time: '6 hours ago', type: 'meeting' },
    { title: 'Code review requested by John', time: '8 hours ago', type: 'code' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/images/new-logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.greeting}>Good morning!</Text>
              <Text style={styles.userName}>Welcome back to DevTrex</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Search size={20} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={20} color="#6B7280" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Card */}
        <View style={styles.heroCard}>
          <LinearGradient
            colors={['#4F46E5', '#3B82F6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Boost Your Team's Productivity</Text>
              <Text style={styles.heroSubtitle}>
                Collaborate seamlessly with your development team and track progress in real-time
              </Text>
              <TouchableOpacity style={styles.heroButton}>
                <Text style={styles.heroButtonText}>Get Started</Text>
                <ArrowRight size={16} color="#4F46E5" />
              </TouchableOpacity>
            </View>
            <View style={styles.heroIllustration}>
              <TrendingUp size={80} color="rgba(255,255,255,0.3)" />
            </View>
          </LinearGradient>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <TouchableOpacity key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                  <stat.icon size={20} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#EBF8FF' }]}>
                <Code2 size={24} color="#3B82F6" />
              </View>
              <Text style={styles.quickActionText}>New Project</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#F0F9FF' }]}>
                <Users size={24} color="#4F46E5" />
              </View>
              <Text style={styles.quickActionText}>Invite Team</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#F0FDF4' }]}>
                <Calendar size={24} color="#10B981" />
              </View>
              <Text style={styles.quickActionText}>Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#FEF7FF' }]}>
                <Activity size={24} color="#8B5CF6" />
              </View>
              <Text style={styles.quickActionText}>Analytics</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activityContainer}>
          <View style={styles.activityHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activityList}>
            {recentActivity.map((activity, index) => (
              <TouchableOpacity key={index} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Activity size={16} color="#4F46E5" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
                <ArrowRight size={16} color="#D1D5DB" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logo: {
    width: 28,
    height: 28,
  },
  greeting: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Poppins-Regular',
  },
  userName: {
    fontSize: 16,
    color: '#1F2937',
    fontFamily: 'Poppins-SemiBold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  heroCard: {
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  heroGradient: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroContent: {
    flex: 1,
    paddingRight: 16,
  },
  heroTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 28,
  },
  heroSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 20,
    lineHeight: 20,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 8,
  },
  heroButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#4F46E5',
  },
  heroIllustration: {
    opacity: 0.3,
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#374151',
    textAlign: 'center',
  },
  activityContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#4F46E5',
  },
  activityList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#374151',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#9CA3AF',
  },
});