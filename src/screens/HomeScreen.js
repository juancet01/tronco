// 1. Abrimos la caja de herramientas
import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { homeStyles as styles } from '../../stylos/global.styles';

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
        <View style={styles.espaciadorFinal} />

      </ScrollView>
    </SafeAreaView>
  );
}