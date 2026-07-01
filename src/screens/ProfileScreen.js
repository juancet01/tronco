// 1. Abrimos la caja de herramientas
import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';

// 2. Pantalla de PERFIL (Sin la estadística de Vuelos)
export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.fondoGeneral}>
      <ScrollView>

        {/* ----- TARJETA DEL PERFIL (Foto, nombre, correo) ----- */}
        <View style={styles.tarjetaPerfil}>
          
          {/* Círculo gris con la letra "U" (simula la foto) */}
          <View style={styles.circuloFoto}>
            <Text style={styles.letraFoto}>U</Text>
          </View>

          {/* Nombre del usuario */}
          <Text style={styles.nombreUsuario}>Juan Pérez</Text>
          
          {/* Correo electrónico */}
          <Text style={styles.correoUsuario}>juan.perez@email.com</Text>

        </View>

        {/* ----- TARJETA DE ESTADÍSTICAS (SOLO Puntos y Destinos) ----- */}
        <View style={styles.tarjetaEstadisticas}>
          
          {/* Estadística 1: Puntos (ya no está Vuelos) */}
          <View style={styles.itemEstadistica}>
            <Text style={styles.numeroEstadistica}>1,250</Text>
            <Text style={styles.textoEstadistica}>Puntos</Text>
          </View>

          {/* Estadística 2: Destinos */}
          <View style={styles.itemEstadistica}>
            <Text style={styles.numeroEstadistica}>8</Text>
            <Text style={styles.textoEstadistica}>Destinos</Text>
          </View>

        </View>

        {/* ----- TARJETA DE OPCIONES DEL PERFIL (Teléfono, fecha, nacionalidad) ----- */}
        <View style={styles.tarjetaOpciones}>
          
          {/* Fila 1: Teléfono */}
          <View style={styles.filaOpcion}>
            <Text style={styles.textoOpcion}>Teléfono</Text>
            <Text style={styles.textoValor}>+54 9 351 123-4567</Text>
          </View>

          {/* Fila 2: Fecha de nacimiento */}
          <View style={styles.filaOpcion}>
            <Text style={styles.textoOpcion}>Fecha de nac.</Text>
            <Text style={styles.textoValor}>15 / 07 / 1990</Text>
          </View>

          {/* Fila 3: Nacionalidad */}
          <View style={styles.filaOpcion}>
            <Text style={styles.textoOpcion}>Nacionalidad</Text>
            <Text style={styles.textoValor}>Argentina</Text>
          </View>

        </View>

        {/* Espacio al final */}
        <View style={{ height: 30 }} />

      </ScrollView>
    </SafeAreaView>
  );
}

// ------------------------------------------------
// 3. ESTILOS (Colores y tamaños)
// ------------------------------------------------
const styles = StyleSheet.create({

  fondoGeneral: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 20,
  },

  // --- TARJETA DEL PERFIL (arriba) ---
  tarjetaPerfil: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },

  circuloFoto: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E0E7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  letraFoto: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2D6AFF',
  },

  nombreUsuario: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A2E',
  },

  correoUsuario: {
    fontSize: 15,
    color: '#666666',
    marginTop: 4,
  },

  // --- TARJETA DE ESTADÍSTICAS (AHORA CON 2 ITEMS: Puntos y Destinos) ---
  tarjetaEstadisticas: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-around', // Reparte los 2 items uniformemente
    marginBottom: 15,
  },

  itemEstadistica: {
    alignItems: 'center',
  },

  numeroEstadistica: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D6AFF',
  },

  textoEstadistica: {
    fontSize: 14,
    color: '#888888',
    marginTop: 2,
  },

  // --- TARJETA DE OPCIONES ---
  tarjetaOpciones: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 5,
    marginBottom: 15,
  },

  filaOpcion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  textoOpcion: {
    fontSize: 16,
    color: '#1A1A2E',
  },

  textoValor: {
    fontSize: 16,
    color: '#888888',
  },

});