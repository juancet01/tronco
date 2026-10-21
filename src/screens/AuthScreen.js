import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AuthScreen() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    Alert.alert(
      'Autenticación no disponible',
      'Conecta un servicio de autenticación para iniciar sesión o crear una cuenta.'
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.brand}>TRONCO</Text>
            <Text style={styles.title}>
              {isRegistering ? 'Crea tu cuenta' : 'Bienvenido de nuevo'}
            </Text>
            <Text style={styles.subtitle}>
              {isRegistering
                ? 'Regístrate para comenzar a planear tu próximo viaje.'
                : 'Inicia sesión para continuar con tus viajes.'}
            </Text>
          </View>

          <View style={styles.form}>
            {isRegistering && (
              <View style={styles.field}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                  autoCapitalize="words"
                  onChangeText={setName}
                  placeholder="Tu nombre"
                  placeholderTextColor="#94a3b8"
                  style={styles.input}
                  value={name}
                />
              </View>
            )}

            <View style={styles.field}>
              <Text style={styles.label}>Correo electrónico</Text>
              <TextInput
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                onChangeText={setEmail}
                placeholder="nombre@correo.com"
                placeholderTextColor="#94a3b8"
                style={styles.input}
                value={email}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                autoComplete={isRegistering ? 'new-password' : 'password'}
                onChangeText={setPassword}
                placeholder="Ingresa tu contraseña"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                style={styles.input}
                value={password}
              />
            </View>

            <TouchableOpacity
              accessibilityRole="button"
              onPress={handleSubmit}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>
                {isRegistering ? 'Registrarme' : 'Iniciar sesión'}
              </Text>
            </TouchableOpacity>

            <View style={styles.registerPrompt}>
              <Text style={styles.promptText}>
                {isRegistering ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}
              </Text>
              <TouchableOpacity
                accessibilityRole="button"
                onPress={() => setIsRegistering((current) => !current)}
              >
                <Text style={styles.linkText}>
                  {isRegistering ? 'Inicia sesión' : 'Regístrate'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    marginBottom: 32,
  },
  brand: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 18,
  },
  title: {
    color: '#0f172a',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: '#64748b',
    fontSize: 16,
    lineHeight: 23,
  },
  form: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
  },
  field: {
    marginBottom: 18,
  },
  label: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderColor: '#cbd5e1',
    borderRadius: 12,
    borderWidth: 1,
    color: '#0f172a',
    fontSize: 16,
    minHeight: 50,
    paddingHorizontal: 14,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 12,
    marginTop: 4,
    minHeight: 52,
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  registerPrompt: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 22,
  },
  promptText: {
    color: '#64748b',
    fontSize: 14,
    marginRight: 5,
  },
  linkText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '700',
  },
});
