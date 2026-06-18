import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';

import { ThemeContext } from '../../App';

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const theme = {
    background: isDarkMode ? '#0f172a' : '#f4f7fb',
    surface: isDarkMode ? '#111827' : '#ffffff',
    text: isDarkMode ? '#f8fafc' : '#0f172a',
    textMuted: isDarkMode ? '#cbd5e1' : '#64748b',
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Configuración</Text>

      <View style={[styles.card, { backgroundColor: theme.surface }]}>
        <View style={styles.row}>
          <View>
            <Text style={[styles.optionTitle, { color: theme.text }]}>Modo oscuro</Text>
            <Text style={[styles.optionSubtitle, { color: theme.textMuted }]}>Cambia la apariencia de la app</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: '#cbd5e1', true: '#2563eb' }}
            thumbColor={isDarkMode ? '#fff' : '#f8fafc'}
          />
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Cuenta</Text>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={[styles.linkText, { color: isDarkMode ? '#93c5fd' : '#2563eb' }]}>Cambiar contraseña</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={[styles.linkText, { color: isDarkMode ? '#93c5fd' : '#2563eb' }]}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 18,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  optionSubtitle: {
    marginTop: 4,
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 10,
  },
  linkButton: {
    paddingVertical: 8,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
  },
});