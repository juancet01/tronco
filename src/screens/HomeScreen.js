// 1. Abrimos la caja de herramientas
import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';

// 2. Pantalla de INICIO (Solo pasajeros y tarjeta simple)
export default function HomeScreen() {
  return (
    // El teléfono (SafeAreaView)
    <SafeAreaView style={styles.fondoGeneral}>

      {/* El scroll para bajar */}
      <ScrollView>

        {/* ----- TÍTULOS (cabecera) ----- */}
        <Text style={styles.tituloGrande}>¡Buen viaje!</Text>
        <Text style={styles.tituloMediano}>Encuentra tu próximo vuelo</Text>

        {/* ----- PASAJEROS (SOLO ESTO QUEDA) ----- */}
        <Text style={styles.tituloSeccion}>Pasajeros</Text>
        
        {/* Fila horizontal con los 3 botones de pasajeros */}
        <View style={styles.filaHorizontal}>
          <View style={styles.botonFalso}><Text>1 pasajero</Text></View>
          <View style={styles.botonFalso}><Text>2 pasajeros</Text></View>
          <View style={styles.botonFalso}><Text>3+ pasajeros</Text></View>
        </View>

        {/* ----- TARJETA DEL VUELO (SUPER SIMPLE) ----- */}
        <View style={styles.tarjetaSimple}>

          {/* Fila 1: Ruta (Córdoba -> Salta) y Aerolínea (FlyBondi) */}
          <View style={styles.filaRuta}>
            <Text style={styles.textoRuta}>Córdoba → Salta</Text>
            <Text style={styles.textoAerolinea}>FlyBondi</Text>
          </View>

          {/* Fila 2: Horarios (Salida, duración, Llegada) */}
          <View style={styles.filaHorarios}>
            {/* Columna 1: Salida */}
            <View>
              <Text style={styles.horaGrande}>09:15</Text>
              <Text style={styles.textoChico}>Salida</Text>
            </View>

            {/* Centro: Duración */}
            <Text style={styles.textoDuracion}>2h 45m</Text>

            {/* Columna 2: Llegada */}
            <View>
              <Text style={styles.horaGrande}>12:00</Text>
              <Text style={styles.textoChico}>Llegada</Text>
            </View>
          </View>

          {/* Fila 3: Precio y Botón Agregar */}
          <View style={styles.filaPrecioBoton}>
            <Text style={styles.textoPrecio}>Desde <Text style={styles.textoPrecioNegrita}>$210 USD</Text></Text>
            <View style={styles.botonAzul}>
              <Text style={styles.textoBotonBlanco}>Agregar</Text>
            </View>
          </View>

        </View>

        {/* Espacio al final para no quedar pegado */}
        <View style={{ height: 50 }} />

      </ScrollView>
    </SafeAreaView>
  );
}

// ------------------------------------------------
// 3. ESTILOS (Colores y tamaños)
// ------------------------------------------------
const styles = StyleSheet.create({

  // Fondo gris clarito de toda la pantalla
  fondoGeneral: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 20,
  },

  // Título "¡Buen viaje!"
  tituloGrande: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginTop: 15,
  },

  // Subtítulo "Encuentra tu próximo vuelo"
  tituloMediano: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },

  // Título de la sección "Pasajeros"
  tituloSeccion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginBottom: 10,
    marginTop: 5,
  },

  // Fila para poner los 3 botones de pasajeros uno al lado del otro
  filaHorizontal: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  // Cada botón de pasajeros (es solo una cajita blanca con borde)
  botonFalso: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    marginRight: 10,
  },

  // ----------------- TARJETA DEL VUELO (simplificada) -----------------
  tarjetaSimple: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },

  // Fila de la ruta (izquierda y derecha)
  filaRuta: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Empuja cada texto a un extremo
    marginBottom: 15,
  },

  textoRuta: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A2E',
  },

  textoAerolinea: {
    fontSize: 14,
    color: '#2D6AFF',
    fontWeight: '500',
  },

  // Fila de los horarios (Salida, duración, Llegada)
  filaHorarios: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Reparte el espacio
    alignItems: 'center',
    marginBottom: 18,
  },

  horaGrande: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A2E',
  },

  textoChico: {
    fontSize: 12,
    color: '#888888',
  },

  textoDuracion: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '500',
  },

  // Fila del precio y el botón
  filaPrecioBoton: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Precio a la izquierda, botón a la derecha
    alignItems: 'center',
    borderTopWidth: 1, // Línea separadora arriba
    borderTopColor: '#EEEEEE',
    paddingTop: 15,
  },

  textoPrecio: {
    fontSize: 15,
    color: '#333333',
  },

  textoPrecioNegrita: {
    fontWeight: 'bold',
    color: '#1A1A2E',
  },

  botonAzul: {
    backgroundColor: '#2D6AFF',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 30,
  },

  textoBotonBlanco: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },

});