import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { ThemeContext } from '../../App';

export default function ProfileScreen() {
  const { isDarkMode } = useContext(ThemeContext);

  const theme = {
    background: isDarkMode ? '#0f172a' : '#f4f7fb',
    surface: isDarkMode ? '#111827' : '#ffffff',
    text: isDarkMode ? '#f8fafc' : '#0f172a',
    textMuted: isDarkMode ? '#cbd5e1' : '#64748b',
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>M</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={[styles.name, { color: theme.text }]}>Mateo Pérez</Text>
          <Text style={[styles.email, { color: theme.textMuted }]}>mateo.perez@email.com</Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.surface, shadowColor: isDarkMode ? '#000' : '#000' }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>Información personal</Text>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.textMuted }]}>Teléfono</Text>
          <Text style={[styles.value, { color: theme.text }]}>+57 300 123 4567</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.textMuted }]}>País</Text>
          <Text style={[styles.value, { color: theme.text }]}>Colombia</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.textMuted }]}>Miembro desde</Text>
          <Text style={[styles.value, { color: theme.text }]}>Marzo 2024</Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.surface, shadowColor: isDarkMode ? '#000' : '#000' }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>Preferencias</Text>
        <View style={styles.preferenceRow}>
          <Text style={[styles.preferenceText, { color: theme.text }]}>Notificaciones de vuelos</Text>
          <Text style={styles.toggle}>ON</Text>
        </View>
        <View style={styles.preferenceRow}>
          <Text style={[styles.preferenceText, { color: theme.text }]}>Modo oscuro</Text>
          <Text style={styles.toggle}>{isDarkMode ? 'ON' : 'OFF'}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Editar perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
  },
  headerInfo: {
    marginLeft: 14,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
  },
  email: {
    marginTop: 4,
    fontSize: 14,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  preferenceText: {
    fontSize: 14,
    fontWeight: '600',
  },
  toggle: {
    color: '#2563eb',
    fontSize: 13,
    fontWeight: '800',
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});