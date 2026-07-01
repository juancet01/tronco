// 1. Abrimos la caja de herramientas
import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { settingsStyles as styles } from '../../stylos/global.styles';

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