// 1. Abrimos la caja de herramientas
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { homeStyles as styles } from '../../stylos/global.styles';
import { TRAVEL_DATA } from '../data/travelData';
import { useTrips } from '../context/TripContext';
import { getWeatherByIATA } from '../services/weatherService'; // 👈 NUEVO

// Helper para sacar la ciudad destino del título ("Córdoba → Salta")
const getDestino = (title) => {
  if (!title) return null;
  const parts = title.split('→');
  return parts[1]?.trim() || null;
};

// 2. Pantalla de INICIO
export default function HomeScreen() {
  const [pasajerosSeleccionados, setPasajerosSeleccionados] = useState('1 pasajero');
  const [weatherMap, setWeatherMap] = useState({}); // 👈 NUEVO

  const { savedTrips, addTrip: addTripGlobal, removeTrip: removeTripGlobal } = useTrips();

  const recommendedTrips = useMemo(() => TRAVEL_DATA.slice(0, 3), []);
  const displayedTrips = savedTrips.length > 0 ? savedTrips : recommendedTrips;

  // 👇 NUEVO: cargar clima para cada destino único de los viajes mostrados
  useEffect(() => {
    const destinos = new Set();
    displayedTrips.forEach((trip) => {
      const dest = getDestino(trip.title);
      if (dest) destinos.add(dest);
    });

    destinos.forEach(async (dest) => {
      const w = await getWeatherByIATA(dest);
      if (w) {
        setWeatherMap((prev) => (prev[dest] ? prev : { ...prev, [dest]: w }));
      }
    });
  }, [displayedTrips]);

  const getMultiplicador = () => {
    if (pasajerosSeleccionados === '1 pasajero') return 1;
    if (pasajerosSeleccionados === '2 pasajeros') return 2;
    if (pasajerosSeleccionados === '3+ pasajeros') return 3;
    return 1;
  };

  const formatearPrecio = (precioOriginal, multiplicador) => {
    const numero = parseFloat(precioOriginal.replace(/[^0-9.]/g, ''));
    if (isNaN(numero)) return precioOriginal;
    const total = numero * multiplicador;
    const sufijo = precioOriginal.replace(/[$0-9., ]/g, '').trim();
    return sufijo ? `$${total} ${sufijo}` : `$${total}`;
  };

  const handleAddTrip = (trip) => {
    addTripGlobal(trip);
  };

  const handleRemoveTrip = (tripId) => {
    removeTripGlobal(tripId);
  };

  return (
    <SafeAreaView style={styles.fondoGeneral}>
      <ScrollView>
        {/* TÍTULOS */}
        <Text style={styles.tituloGrande}>¡Buen viaje!</Text>
        <Text style={styles.tituloMediano}>Encuentra tu próximo vuelo</Text>

        {/* ----- PASAJEROS ----- */}
        <Text style={styles.tituloSeccion}>Pasajeros</Text>
        <View style={styles.filaHorizontal}>
          <TouchableOpacity
            style={[
              styles.botonPasajero,
              pasajerosSeleccionados === '1 pasajero' && styles.botonPasajeroSeleccionado,
            ]}
            accessibilityRole="button"
            accessibilityState={{ selected: pasajerosSeleccionados === '1 pasajero' }}
            onPress={() => setPasajerosSeleccionados('1 pasajero')}
          >
            <Text
              style={[
                styles.textoBotonPasajero,
                pasajerosSeleccionados === '1 pasajero' &&
                  styles.textoBotonPasajeroSeleccionado,
              ]}
            >
              1 pasajero
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.botonPasajero,
              pasajerosSeleccionados === '2 pasajeros' && styles.botonPasajeroSeleccionado,
            ]}
            accessibilityRole="button"
            accessibilityState={{ selected: pasajerosSeleccionados === '2 pasajeros' }}
            onPress={() => setPasajerosSeleccionados('2 pasajeros')}
          >
            <Text
              style={[
                styles.textoBotonPasajero,
                pasajerosSeleccionados === '2 pasajeros' &&
                  styles.textoBotonPasajeroSeleccionado,
              ]}
            >
              2 pasajeros
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.botonPasajero,
              pasajerosSeleccionados === '3+ pasajeros' && styles.botonPasajeroSeleccionado,
            ]}
            accessibilityRole="button"
            accessibilityState={{ selected: pasajerosSeleccionados === '3+ pasajeros' }}
            onPress={() => setPasajerosSeleccionados('3+ pasajeros')}
          >
            <Text
              style={[
                styles.textoBotonPasajero,
                pasajerosSeleccionados === '3+ pasajeros' &&
                  styles.textoBotonPasajeroSeleccionado,
              ]}
            >
              3+ pasajeros
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.tituloSeccion}>Tus vuelos</Text>

        {savedTrips.length === 0 ? (
          <Text style={styles.textoChico}>Aún no agregaste vuelos. Te mostramos recomendaciones.</Text>
        ) : null}

        {displayedTrips.map((trip) => {
          const multiplicador = getMultiplicador();
          const precioMultiplicado = formatearPrecio(trip.price, multiplicador);

          // 👇 NUEVO: sacar el clima del destino de este viaje
          const dest = getDestino(trip.title);
          const weather = dest ? weatherMap[dest] : null;

          return (
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

              {/* 👇 NUEVO: bloque de clima */}
              {weather && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
                    paddingHorizontal: 4,
                  }}
                >
                  <Text style={{ fontSize: 18, marginRight: 6 }}>
                    {weather.weather.emoji}
                  </Text>
                  <Text style={{ fontSize: 13, color: '#555' }}>
                    {weather.city}: {weather.temperature}°C · {weather.weather.text}
                  </Text>
                </View>
              )}

              <View style={styles.filaPrecioBoton}>
                <View>
                  <Text style={styles.textoPrecio}>Desde</Text>
                  <Text style={styles.textoPrecioNegrita}>
                    {precioMultiplicado}
                  </Text>
                </View>
                <TouchableOpacity
                  style={savedTrips.some((item) => item.id === trip.id) ? styles.botonRojo : styles.botonAzul}
                  onPress={() => (savedTrips.some((item) => item.id === trip.id) ? handleRemoveTrip(trip.id) : handleAddTrip(trip))}
                >
                  <Text style={styles.textoBotonBlanco}>
                    {savedTrips.some((item) => item.id === trip.id) ? 'Quitar' : 'Agregar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        <View style={styles.espaciadorFinal} />
      </ScrollView>
    </SafeAreaView>
  );
}