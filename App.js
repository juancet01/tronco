import React, { createContext, useMemo, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { TripProvider } from './src/context/TripContext';

export const ThemeContext = createContext();

const Tab = createBottomTabNavigator();


export default function App() {

 <TripProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </TripProvider>
    
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
      <TripProvider>
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
          <Tab.Screen
            name="Inicio"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Inicio',
              tabBarIcon: ({ color, size }) => (
                <Image
                  source={require('./img/ChatGPT Image 2 jul 2026, 01_31_41.png')}
                  style={{ width: 24, height: 24 }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Buscar"
            component={SearchScreen}
            options={{
              tabBarLabel: 'Buscar',
              tabBarIcon: ({ color, size }) => (
                <Image
                  source={require('./img/ChatGPT Image 2 jul 2026, 01_32_53.png')}
                  style={{ width: 24, height: 24 }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Perfil"
            component={ProfileScreen}
            options={{
              tabBarLabel: 'Perfil',
              tabBarIcon: ({ color, size }) => (
                <Image
                  source={require('./img/ChatGPT Image 2 jul 2026, 01_35_46.png')}
                  style={{ width: 24, height: 24 }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Ajustes"
            component={SettingsScreen}
            options={{
              tabBarLabel: 'Ajustes',
              tabBarIcon: ({ color, size }) => (
                <Image
                  source={require('./img/ChatGPT Image 2 jul 2026, 01_38_09.png')}
                  style={{ width: 24, height: 24 }}
                />
              ),
            }}
          />
          </Tab.Navigator>
        </NavigationContainer>
      </TripProvider>
    </ThemeContext.Provider>
  );
}