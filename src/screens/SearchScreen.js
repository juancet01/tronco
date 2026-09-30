import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { searchStyles as styles } from '../../stylos/global.styles';
import { useTrips } from '../context/TripContext';
import { getAllFlights } from '../services/flightService';

function adaptFlight(f) {
  const dep = new Date(f.departure_at);
  const arr = new Date(f.arrival_at);
  const fmt = (d) =>
    d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });

  return {
    id: f.id,
    title: `${f.origin_city || f.origin} → ${f.destination_city || f.destination}`,
    airline: f.airline,
    badge: f.badge || 'Nacional',
    time: `${fmt(dep)} - ${fmt(arr)}`,
    duration: f.duration,
    price: `$${Number(f.price).toFixed(2)} ${f.currency || 'USD'}`,
    raw: f,
  };
}

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addTrip, removeTrip, isTripSaved } = useTrips();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getAllFlights();
        if (mounted) setFlights(data.map(adaptFlight));
      } catch (e) {
        if (mounted) setError(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const normalize = (text) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const filteredData = useMemo(() => {
    const search = normalize(query.trim());
    if (!search) return flights;
    return flights.filter(
      (item) =>
        normalize(item.title).includes(search) ||
        normalize(item.airline).includes(search) ||
        normalize(item.badge).includes(search)
    );
  }, [query, flights]);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Buscar vuelos</Text>
        <Text style={styles.subtitle}>
          {loading ? 'Cargando...' : `${filteredData.length} resultados`}
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Busca una ruta, aerolínea o promoción"
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {loading && (
        <ActivityIndicator size="large" color="#0066cc" style={{ marginTop: 20 }} />
      )}

      {error && !loading && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Error de conexión</Text>
          <Text style={styles.emptyText}>{error}</Text>
        </View>
      )}

      {!loading && !error && (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No hay resultados</Text>
              <Text style={styles.emptyText}>Prueba con otra ciudad o aerolínea.</Text>
            </View>
          }
          renderItem={({ item }) => {
            const saved = isTripSaved(item.id);
            return (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.route}>{item.title}</Text>
                    <Text style={styles.airline}>{item.airline}</Text>
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

                <View style={styles.cardFooter}>
                  <View>
                    <Text style={styles.priceLabel}>Desde</Text>
                    <Text style={styles.price}>{item.price}</Text>
                  </View>
                  <TouchableOpacity
                    style={saved ? styles.buttonRemove : styles.button}
                    onPress={() => (saved ? removeTrip(item.id) : addTrip(item))}
                  >
                    <Text style={styles.buttonText}>
                      {saved ? 'Quitar' : 'Agregar'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}