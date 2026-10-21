import React, { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { searchStyles as styles } from '../../stylos/global.styles';
import { cargarVuelos } from '../data/travelData';
import { useTrips } from '../context/TripContext';
import { getWeatherByIATA } from '../services/weatherService';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [weatherMap, setWeatherMap] = useState({});
  const [vuelos, setVuelos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState('');
  const { addToCart, removeFromCart, isInCart } = useTrips();

  useEffect(() => {
    let activo = true;

    cargarVuelos()
      .then((resultados) => {
        if (activo) setVuelos(resultados);
      })
      .catch((error) => {
        if (activo) setErrorCarga(error.message);
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  const normalize = (text) =>
    text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const filteredData = useMemo(() => {
    const search = normalize(query.trim());
    if (!search) return vuelos;
    return vuelos.filter(
      (item) =>
        normalize(item.title).includes(search) ||
        normalize(item.airline).includes(search) ||
        normalize(item.badge).includes(search) ||
        normalize(`${item.originCountry} ${item.destinationCountry}`).includes(search)
    );
  }, [query, vuelos]);

  // Cargar el clima de cada destino único
  useEffect(() => {
    const iatas = new Set();
    filteredData.forEach((item) => {
      // asume que el title es "XXX → YYY"
      const parts = item.title.split('→').map((s) => s.trim());
      if (parts[1]) iatas.add(parts[1]);
    });
iatas.forEach(async (iata) => {
  const w = await getWeatherByIATA(iata);
  if (w) {
    setWeatherMap((prev) => (prev[iata] ? prev : { ...prev, [iata]: w }));
  }
});
  }, [filteredData]);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Buscar vuelos</Text>
        <Text style={styles.subtitle}>
          {cargando ? 'Cargando vuelos…' : `${filteredData.length} resultados`}
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Busca una ruta, número de vuelo o país"
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          errorCarga ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No se pudieron cargar los vuelos</Text>
              <Text style={styles.emptyText}>{errorCarga}</Text>
            </View>
          ) : null
        }
        ListEmptyComponent={
          cargando ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Conectando con la base de datos…</Text>
            </View>
          ) : errorCarga ? null : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No hay resultados</Text>
              <Text style={styles.emptyText}>Prueba con otra ruta o país.</Text>
            </View>
            
          )
        }
        renderItem={({ item }) => {
          const agregado = isInCart(item.id);
          const destIata = item.title.split('→')[1]?.trim();
          const weather = weatherMap[destIata];

          return (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.route}>{item.title}</Text>
                  <Text style={styles.airline}>{item.airline}</Text>
                  <Text style={styles.airline}>{item.countryRoute}</Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              </View>

              <View style={styles.cardBody}>
                <View>
                  <Text style={styles.label}>Salida</Text>
                  <Text style={styles.value}>{item.time.split(' - ')[0]}</Text>
                </View>
                <View style={styles.durationBox}>
                  <Text style={styles.duration}>{item.duration}</Text>
                </View>
                <View>
                  <Text style={styles.label}>Llegada</Text>
                  <Text style={styles.value}>{item.time.split(' - ')[1]}</Text>
                </View>
              </View>

              {/* 👇 Bloque de clima */}
              {weather && (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={{ fontSize: 18, marginRight: 6 }}>
                    {weather.weather.emoji}
                  </Text>
                  <Text style={{ fontSize: 13, color: '#555' }}>
                    {weather.city}: {weather.temperature}°C · {weather.weather.text}
                  </Text>
                </View>
              )}

              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.priceLabel}>Desde</Text>
                  <Text style={styles.price}>{item.price}</Text>
                </View>
                <TouchableOpacity
                  style={agregado ? styles.buttonRemove : styles.button}
                  onPress={() =>
                    agregado ? removeFromCart(item.id) : addToCart(item)
                  }
                >
                  <Text style={styles.buttonText}>
                    {agregado ? 'Quitar' : 'Agregar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}