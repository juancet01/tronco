// 1. Abrimos la caja de herramientas
import React, { useMemo, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { homeStyles as styles } from '../../stylos/global.styles';
import { TRAVEL_DATA } from '../data/travelData';

// 2. Pantalla de INICIO (Solo pasajeros y tarjeta simple)
export default function HomeScreen() {
  const [savedTrips, setSavedTrips] = useState([]);

  const recommendedTrips = useMemo(() => TRAVEL_DATA.slice(0, 3), []);
  const displayedTrips = savedTrips.length > 0 ? savedTrips : recommendedTrips;

  const handleAddTrip = (trip) => {
    setSavedTrips((currentTrips) => {
      if (currentTrips.some((item) => item.id === trip.id)) {
        return currentTrips;
      }

      return [...currentTrips, trip];
    });
  };

  const handleRemoveTrip = (tripId) => {
    setSavedTrips((currentTrips) => currentTrips.filter((item) => item.id !== tripId));
  };

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

        <Text style={styles.tituloSeccion}>Tus vuelos</Text>

        {savedTrips.length === 0 ? (
          <Text style={styles.textoChico}>Aún no agregaste vuelos. Te mostramos recomendaciones.</Text>
        ) : null}

        {displayedTrips.map((trip) => (
          <View key={trip.id} style={styles.tarjetaSimple}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.textoRuta}>{trip.title}</Text>
                <Text style={styles.textoAerolinea}>{trip.airline}</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{trip.badge}</Text>
              </View>
            </View>

            <View style={styles.cardBody}>
              <View>
                <Text style={styles.textoChico}>Salida</Text>
                <Text style={styles.horaGrande}>{trip.time.split(' - ')[0]}</Text>
              </View>

              <View style={styles.durationBox}>
                <Text style={styles.textoDuracion}>{trip.duration}</Text>
              </View>

              <View>
                <Text style={styles.textoChico}>Llegada</Text>
                <Text style={styles.horaGrande}>{trip.time.split(' - ')[1]}</Text>
              </View>
            </View>

            <View style={styles.filaPrecioBoton}>
              <View>
                <Text style={styles.textoPrecio}>Desde</Text>
                <Text style={styles.textoPrecioNegrita}>{trip.price}</Text>
              </View>
              <TouchableOpacity
                style={savedTrips.some((item) => item.id === trip.id) ? styles.botonRojo : styles.botonAzul}
                onPress={() => (savedTrips.some((item) => item.id === trip.id) ? handleRemoveTrip(trip.id) : handleAddTrip(trip))}
              >
                <Text style={styles.textoBotonBlanco}>{savedTrips.some((item) => item.id === trip.id) ? 'Quitar' : 'Agregar'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Espacio al final para no quedar pegado */}
        <View style={styles.espaciadorFinal} />

      </ScrollView>
    </SafeAreaView>
  );
}