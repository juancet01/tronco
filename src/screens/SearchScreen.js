import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { searchStyles as styles } from '../../stylos/global.styles';

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
