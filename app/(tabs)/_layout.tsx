import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { Chrome as Home, Search, Plus, Bell, User } from 'lucide-react-native';

const TabIcon = ({ icon: Icon, color, focused }) => {
  return (
    <View
      style={[
        styles.iconContainer,
        focused && styles.iconContainerActive,
      ]}
    >
      <Icon size={22} color={focused ? '#FFFFFF' : color} strokeWidth={2} />
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
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.select({ ios: 34, android: 20, web: 20 }),
          left: 20,
          right: 20,
          height: 65,
          backgroundColor: '#000000',
          borderRadius: 30,
          borderTopWidth: 1,
          borderTopColor: 'rgba(255,255,255,0.1)',
          overflow: 'visible',
        },
        tabBarItemStyle: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
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
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerActive: {
    backgroundColor: '#6366F1',
  },
});
