// 1. Abrimos la caja de herramientas
import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { profileStyles as styles } from '../../stylos/global.styles';

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