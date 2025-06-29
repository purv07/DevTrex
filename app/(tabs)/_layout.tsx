import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { Home, Search, Plus, Bell, CircleUserRound as User } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const TabIcon = ({ icon: Icon, color, focused }) => {
  if (focused) {
    return (
      <View style={styles.activeIconContainer}>
        <LinearGradient
          colors={['#8B5CF6', '#A855F7', '#C084FC']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.activeIconGradient}
        >
          <Icon size={24} color="#FFFFFF" strokeWidth={2.5} />
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.inactiveIconContainer}>
      <Icon size={24} color={color} strokeWidth={2} />
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#E5E7EB',
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.select({
            ios: 34,
            android: 20,
            web: 20,
          }),
          left: 20,
          right: 20,
          height: 70,
          backgroundColor: '#000000',
          borderRadius: 35,
          borderTopWidth: 0,
          elevation: 25,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 15 },
          shadowOpacity: 0.4,
          shadowRadius: 25,
          paddingHorizontal: 8, // Add slight padding for aesthetics
        },
        tabBarItemStyle: {
          flex: 1, // This is key for even distribution
          alignItems: 'center',
          justifyContent: 'center',
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

const styles = StyleSheet.create({
  activeIconContainer: {
    width: 54,
    height: 54,
    borderRadius: 27,
    overflow: 'hidden',
    elevation: 12,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  activeIconGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveIconContainer: {
    // This container should just be for layout, not for visuals
    width: 54,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
});