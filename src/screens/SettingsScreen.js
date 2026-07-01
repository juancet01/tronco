// 1. Abrimos la caja de herramientas
import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';

// 2. Pantalla de AJUSTES (Solo queda la campanita, sin la parte de seguridad)
export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.fondoGeneral}>
      <ScrollView>

        {/* ----- TÍTULO DE LA SECCIÓN (General) ----- */}
        <Text style={styles.tituloSeccion}>General</Text>

        {/* ----- TARJETA DE OPCIONES (Notificaciones, Idioma, Modo oscuro) ----- */}
        <View style={styles.tarjetaBlanca}>

          {/* Opción: Notificaciones (CON la campanita) */}
          <View style={styles.filaOpcion}>
            <Text style={styles.textoOpcion}>🔔 Notificaciones</Text>
            <Text style={styles.textoEstado}>Activadas</Text>
          </View>

          {/* Opción: Idioma (SIN emoji) */}
          <View style={styles.filaOpcion}>
            <Text style={styles.textoOpcion}>Idioma</Text>
            <Text style={styles.textoEstado}>Español</Text>
          </View>

          {/* Opción: Modo oscuro (SIN emoji) */}
          <View style={styles.filaOpcion}>
            <Text style={styles.textoOpcion}>Modo oscuro</Text>
            <Text style={styles.textoEstado}>Desactivado</Text>
          </View>

        </View>

        {/* ----- BOTÓN DE CERRAR SESIÓN (SIN emoji) ----- */}
        <View style={styles.botonCerrarSesion}>
          <Text style={styles.textoCerrarSesion}>Cerrar sesión</Text>
        </View>

        {/* Espacio al final */}
        <View style={{ height: 30 }} />

      </ScrollView>
    </SafeAreaView>
  );
}

// ------------------------------------------------
// 3. ESTILOS
// ------------------------------------------------
const styles = StyleSheet.create({

  fondoGeneral: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 20,
  },

  // Título de sección ("General")
  tituloSeccion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginTop: 20,
    marginBottom: 12,
    marginLeft: 5,
  },

  // Tarjeta blanca donde van las opciones
  tarjetaBlanca: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 5,
    marginBottom: 10,
  },

  // Cada fila de opción
  filaOpcion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  textoOpcion: {
    fontSize: 16,
    color: '#1A1A2E',
  },

  // Texto del estado (ej: "Activadas", "Español")
  textoEstado: {
    fontSize: 15,
    color: '#888888',
  },

  // Botón de Cerrar sesión (cajita roja)
  botonCerrarSesion: {
    backgroundColor: '#FF3B30',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },

  textoCerrarSesion: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

});