import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { Chrome as Home, Search, Plus, Bell, User } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const TabIcon = ({ icon: Icon, color, focused, isFloating }) => {
  if (focused && isFloating) {
    return (
      <View style={styles.floatingIconWrapper}>
        <LinearGradient
          colors={['#6366F1', '#8B5CF6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.floatingIconGradient}
        >
          <Icon size={24} color="#fff" strokeWidth={2.5} />
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.inactiveIconContainer}>
      <Icon size={22} color={color} strokeWidth={2} />
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
          borderWidth: 0,
          elevation: 25,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 15 },
          shadowOpacity: 0.4,
          shadowRadius: 25,
          // Remove horizontal padding to allow full width distribution
          paddingHorizontal: 0,
          paddingVertical: 0,
          borderTopWidth: 1,
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
          // Ensure proper flex distribution
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        },
        tabBarItemStyle: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          height: 70,
          // Remove margins to allow even distribution
          marginHorizontal: 0,
          // Ensure each tab takes equal space
          minWidth: 0,
        },
        tabBarBackground: () => (
          <View style={styles.tabBarBackground}>
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.95)', 'rgba(20, 20, 20, 0.95)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.tabBarGradient}
            />
          </View>
        ),
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
  tabBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 35,
    overflow: 'hidden',
  },
  tabBarGradient: {
    flex: 1,
    borderRadius: 35,
  },
  activeIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 12,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    borderWidth: 2,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  activeIconGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  inactiveIconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  floatingIconWrapper: {
  width: 65,
  height: 65,
  borderRadius: 32.5,
  marginTop: -25,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 10,
  zIndex: 10,
  backgroundColor: 'transparent',
  shadowColor: '#6366F1',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.5,
  shadowRadius: 10,
},

floatingIconGradient: {
  width: 65,
  height: 65,
  borderRadius: 32.5,
  justifyContent: 'center',
  alignItems: 'center',
},

});