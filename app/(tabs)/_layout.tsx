import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { Home, Search, Plus, Bell, CircleUserRound as User } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Component for rendering each tab icon
const TabIcon = ({ icon: Icon, color, focused }) => {
  // If the tab is focused (active)
  if (focused) {
    return (
      // Container for the active icon with a shadow
      <View style={styles.activeIconContainer}>
        <LinearGradient
          // A vibrant purple gradient for the background
          colors={['#A855F7', '#8B5CF6']}
          style={styles.activeIconGradient}
        >
          {/* The icon itself, white and bold */}
          <Icon size={28} color="#FFFFFF" strokeWidth={2.5} />
        </LinearGradient>
      </View>
    );
  }

  // If the tab is not focused (inactive)
  return (
    // A simple container to ensure the icon is vertically centered
    <View style={styles.inactiveIconContainer}>
      {/* The icon uses the color provided by tabBarInactiveTintColor */}
      <Icon size={28} color={color} strokeWidth={2} />
    </View>
  );
};

// The main layout component for the tabs
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFFFFF', // Not used directly, but good practice
        tabBarInactiveTintColor: '#FFFFFF', // Makes inactive icons white
        
        // --- CORRECTED TAB BAR STYLE ---
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.select({ ios: 30, android: 20 }),
          left: 20,
          right: 20,
          height: 65,
          backgroundColor: '#000000',
          borderRadius: 32.5, // Half of height for a perfect pill shape
          borderTopWidth: 0, // No top border needed
          elevation: 20,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.3,
          shadowRadius: 20,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={Home} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={Search} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={Plus} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={Bell} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={User} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

// --- CLEANED UP STYLES ---
const styles = StyleSheet.create({
  activeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    // Add a subtle shadow to the active icon itself to make it pop
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
  activeIconGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveIconContainer: {
    // This container just ensures the icon is centered in its space
    justifyContent: 'center',
    alignItems: 'center',
  },
});