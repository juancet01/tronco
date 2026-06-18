import React, { useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

const DATA = [
  {
    id: '1',
    title: 'Bogotá → Medellín',
    airline: 'Avianca',
    time: '06:30 - 08:10',
    price: '$180 USD',
    duration: '1h 40m',
    badge: 'Más vendido',
  },
  {
    id: '2',
    title: 'Cali → Cartagena',
    airline: 'LATAM',
    time: '09:15 - 12:00',
    price: '$210 USD',
    duration: '2h 45m',
    badge: 'Oferta',
  },
  {
    id: '3',
    title: 'Medellín → Cancún',
    airline: 'Volaris',
    time: '13:40 - 18:20',
    price: '$320 USD',
    duration: '3h 40m',
    badge: 'Directo',
  },
  {
    id: '4',
    title: 'Bogotá → Lima',
    airline: 'JetSmart',
    time: '16:05 - 18:55',
    price: '$150 USD',
    duration: '2h 50m',
    badge: 'Economy',
  },
];

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  const filteredData = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return DATA;

    return DATA.filter(
      (item) =>
        item.title.toLowerCase().includes(search) ||
        item.airline.toLowerCase().includes(search) ||
        item.badge.toLowerCase().includes(search)
    );
  }, [query]);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Buscar vuelos</Text>
        <Text style={styles.subtitle}>{filteredData.length} resultados</Text>
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
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
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
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Ver vuelo</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fb',
  },
  topSection: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#64748b',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  input: {
    height: 56,
    backgroundColor: '#fff',
    borderColor: '#dbe2ff',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0f172a',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#0f172a',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  route: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0f172a',
  },
  airline: {
    marginTop: 4,
    fontSize: 13,
    color: '#64748b',
  },
  badge: {
    backgroundColor: '#eef2ff',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    color: '#2563eb',
    fontSize: 11,
    fontWeight: '700',
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  label: {
    fontSize: 12,
    color: '#94a3b8',
  },
  value: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  durationBox: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  duration: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  priceLabel: {
    fontSize: 12,
    color: '#94a3b8',
  },
  price: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  emptyText: {
    marginTop: 6,
    color: '#64748b',
  },
});
