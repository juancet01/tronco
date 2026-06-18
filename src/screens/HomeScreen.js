import React, { useContext, useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

import { ThemeContext } from '../../App';

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
  {
    id: '5',
    title: 'Cartagena → Barranquilla',
    airline: 'Wingo',
    time: '07:50 - 08:45',
    price: '$95 USD',
    duration: '55m',
    badge: 'Rápido',
  },
  {
    id: '6',
    title: 'Cúcuta → Bogotá',
    airline: 'Avianca',
    time: '18:30 - 19:50',
    price: '$140 USD',
    duration: '1h 20m',
    badge: 'Próximo',
  },
];

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const { isDarkMode } = useContext(ThemeContext);

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

  const theme = {
    background: isDarkMode ? '#0f172a' : '#f4f7fb',
    surface: isDarkMode ? '#111827' : '#ffffff',
    surfaceAlt: isDarkMode ? '#0b1220' : '#f8fafc',
    text: isDarkMode ? '#f8fafc' : '#0f172a',
    textMuted: isDarkMode ? '#cbd5e1' : '#64748b',
    border: isDarkMode ? '#1e293b' : '#e2e8f0',
    chip: isDarkMode ? '#1e293b' : '#e2e8f0',
    chipActive: isDarkMode ? '#1e3a8a' : '#dbeafe',
    chipText: isDarkMode ? '#bfdbfe' : '#334155',
    chipTextActive: isDarkMode ? '#dbeafe' : '#1d4ed8',
    badgeBg: isDarkMode ? '#172554' : '#eef2ff',
    badgeText: isDarkMode ? '#bfdbfe' : '#2563eb',
    inputBg: isDarkMode ? '#0b1220' : '#ffffff',
    inputBorder: isDarkMode ? '#1e293b' : '#dbe2ff',
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <View>
          <Text style={[styles.greeting, { color: theme.text }]}>¡Buen viaje!</Text>
          <Text style={[styles.subtitle, { color: theme.textMuted }]}>Encuentra tu próximo vuelo</Text>
        </View>
        <View style={[styles.avatar, { backgroundColor: '#2563eb' }]}>
          <Text style={styles.avatarText}>M</Text>
        </View>
      </View>

      <View style={styles.searchPanel}>
        <View style={[styles.searchRow, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }, { borderWidth: 1 }]}> 
          <TextInput
            style={[styles.input, { color: theme.text }]}
            placeholder="¿A dónde viajas?"
            placeholderTextColor={theme.textMuted}
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.quickFilters}>
          <TouchableOpacity style={[styles.filterChip, { backgroundColor: theme.chip }]}> 
            <Text style={[styles.filterText, { color: theme.chipText }]}>Ida y vuelta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterChipActive, { backgroundColor: theme.chipActive }]}> 
            <Text style={[styles.filterTextActive, { color: theme.chipTextActive }]}>Una sola vía</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterChip, { backgroundColor: theme.chip }]}> 
            <Text style={[styles.filterText, { color: theme.chipText }]}>1 pasajero</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.emptyTitle, { color: theme.text }]}>No hay vuelos</Text>
            <Text style={[styles.emptyText, { color: theme.textMuted }]}>Intenta buscar otra ruta o aerolínea.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.card, { backgroundColor: theme.surface, shadowColor: isDarkMode ? '#000' : '#0f172a' }]}>
            <View style={styles.cardTop}>
              <View>
                <Text style={[styles.route, { color: theme.text }]}>{item.title}</Text>
                <Text style={[styles.airline, { color: theme.textMuted }]}>{item.airline}</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: theme.badgeBg }]}>
                <Text style={[styles.badgeText, { color: theme.badgeText }]}>{item.badge}</Text>
              </View>
            </View>

            <View style={styles.cardMiddle}>
              <View>
                <Text style={[styles.timeLabel, { color: isDarkMode ? '#94a3b8' : '#94a3b8' }]}>Salida</Text>
                <Text style={[styles.timeValue, { color: theme.text }]}>{item.time.split(' - ')[0]}</Text>
              </View>
              <View style={[styles.durationBox, { backgroundColor: theme.surfaceAlt }]}>
                <Text style={[styles.durationText, { color: theme.textMuted }]}>{item.duration}</Text>
              </View>
              <View>
                <Text style={[styles.timeLabel, { color: isDarkMode ? '#94a3b8' : '#94a3b8' }]}>Llegada</Text>
                <Text style={[styles.timeValue, { color: theme.text }]}>{item.time.split(' - ')[1]}</Text>
              </View>
            </View>

            <View style={styles.cardBottom}>
              <View>
                <Text style={[styles.priceLabel, { color: isDarkMode ? '#94a3b8' : '#94a3b8' }]}>Desde</Text>
                <Text style={[styles.price, { color: theme.text }]}>{item.price}</Text>
              </View>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Reservar</Text>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 12,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 18,
  },
  searchPanel: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  searchRow: {
    borderRadius: 18,
    paddingHorizontal: 12,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },
  input: {
    height: 56,
    fontSize: 16,
  },
  quickFilters: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  filterChip: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterChipActive: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
  },
  filterTextActive: {
    fontSize: 12,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  route: {
    fontSize: 17,
    fontWeight: '800',
  },
  airline: {
    marginTop: 4,
    fontSize: 13,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  cardMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  timeLabel: {
    fontSize: 12,
  },
  timeValue: {
    fontSize: 15,
    fontWeight: '700',
  },
  durationBox: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  durationText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  priceLabel: {
    fontSize: 12,
  },
  price: {
    fontSize: 22,
    fontWeight: '800',
  },
  bookButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 12,
  },
  bookButtonText: {
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
  },
  emptyText: {
    marginTop: 6,
  },
});