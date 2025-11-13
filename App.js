import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// Import screen Anda
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Beranda') {
                iconName = focused ? 'navigate' : 'navigate-outline';
              } else if (route.name === 'Tentang') {
                iconName = focused ? 'information-circle' : 'information-circle-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#cc1f31', // Warna saat aktif
            tabBarInactiveTintColor: '#888', // Warna saat tidak aktif
            headerStyle: {
              backgroundColor: '#1d2956', // Background header
            },
            headerTitleStyle: {
              color: '#ffffff', // Warna teks header
            },
          })}
        >
          <Tab.Screen 
            name="Beranda" 
            component={HomeScreen} 
            options={{ title: 'Jejak Spidah' }} 
          />
          <Tab.Screen 
            name="Tentang" 
            component={AboutScreen} 
            options={{ title: 'Tentang Aplikasi' }} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}