import React, { createContext, useMemo, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';

export const ThemeContext = createContext();

const Tab = createBottomTabNavigator();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = useMemo(
    () => ({
      isDarkMode,
      toggleTheme: () => setIsDarkMode((prev) => !prev),
    }),
    [isDarkMode]
  );

  return (
    <ThemeContext.Provider value={theme}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
              borderTopColor: isDarkMode ? '#1e293b' : '#e2e8f0',
            },
            tabBarActiveTintColor: '#2563eb',
            tabBarInactiveTintColor: isDarkMode ? '#94a3b8' : '#64748b',
          }}
        >
          <Tab.Screen name="Inicio" component={HomeScreen} />
          <Tab.Screen name="Perfil" component={ProfileScreen} />
          <Tab.Screen name="Ajustes" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}