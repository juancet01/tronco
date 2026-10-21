import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { cartStyles as styles } from '../../stylos/global.styles';
import { useTrips } from '../context/TripContext';

function getUnitPrice(price) {
  const match = String(price).match(/-?\d[\d.,]*/);

  if (!match) {
    return null;
  }

  const separators = match[0].match(/[.,]/g) || [];
  const lastSeparator = Math.max(match[0].lastIndexOf('.'), match[0].lastIndexOf(','));
  const decimalPlaces = lastSeparator < 0 ? 0 : match[0].length - lastSeparator - 1;
  const hasGroupingSeparator = separators.length > 1 || decimalPlaces === 3;
  let normalized = match[0];

  if (hasGroupingSeparator && decimalPlaces === 3) {
    normalized = normalized.replace(/[.,]/g, '');
  } else if (hasGroupingSeparator) {
    normalized = normalized
      .slice(0, lastSeparator)
      .replace(/[.,]/g, '')
      .concat('.', normalized.slice(lastSeparator + 1));
  } else {
    normalized = normalized.replace(',', '.');
  }

  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : null;
}

function formatPrice(amount, currency) {
  return `$${amount.toLocaleString('es-AR')} ${currency}`.trim();
}

export default function CartScreen() {
  const { savedTrips, removeTrip, clearTrips, addPoints } = useTrips();
  const [purchaseMessage, setPurchaseMessage] = useState('');
  const tripsWithPrices = savedTrips.map((trip) => {
    const unitPrice = getUnitPrice(trip.price);
    const passengerCount = trip.passengerCount || 1;

    return {
      ...trip,
      unitPrice,
      passengerCount,
      subtotal: unitPrice === null ? null : unitPrice * passengerCount,
    };
  });
  const hasInvalidPrice = tripsWithPrices.some((trip) => trip.subtotal === null);
  const total = tripsWithPrices.reduce(
    (sum, trip) => sum + (trip.subtotal ?? 0),
    0
  );
  const pointsEarned = Math.round(total * 0.1);
  const currency =
    savedTrips[0]?.price?.replace(/[$0-9., ]/g, '').trim() || 'USD';

  const handlePurchase = () => {
    const confirmationCode = `TRV-${Date.now().toString(36).toUpperCase()}`;
    const purchasedCount = savedTrips.length;
    addPoints(pointsEarned);
    clearTrips();
    setPurchaseMessage(
      `Compra de prueba confirmada para ${purchasedCount} vuelo(s). Sumaste ${pointsEarned.toLocaleString('es-AR')} puntos. Código: ${confirmationCode}. No se realizó ningún cobro real.`
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Carrito de compras</Text>
      <Text style={styles.subtitle}>
        {savedTrips.length} {savedTrips.length === 1 ? 'vuelo' : 'vuelos'}
      </Text>

      {purchaseMessage ? (
        <Text style={styles.notice}>{purchaseMessage}</Text>
      ) : null}

      {savedTrips.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
          <Text style={styles.emptyText}>
            Agregá vuelos desde Inicio o Buscar para comprarlos.
          </Text>
        </View>
      ) : (
        <>
          {tripsWithPrices.map((trip) => (
            <View key={trip.id} style={styles.card}>
              <Text style={styles.route}>{trip.title}</Text>
              <Text style={styles.detail}>{trip.airline}</Text>
              <Text style={styles.detail}>{trip.time}</Text>
              <View style={styles.row}>
                <View>
                  <Text style={styles.detail}>
                    {trip.passengerCount}{' '}
                    {trip.passengerCount === 1 ? 'pasajero' : 'pasajeros'}
                  </Text>
                  <Text style={styles.price}>
                    {trip.subtotal === null
                      ? 'Precio no disponible'
                      : formatPrice(trip.subtotal, currency)}
                  </Text>
                </View>
                <TouchableOpacity
                  accessibilityRole="button"
                  onPress={() => removeTrip(trip.id)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeText}>Quitar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <View style={styles.summary}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.total}>
                {hasInvalidPrice
                  ? 'No disponible'
                  : formatPrice(total, currency)}
              </Text>
            </View>
            <Text style={styles.detail}>
              Compra de prueba: no se realizará ningún cobro real.
            </Text>
            <Text style={styles.detail}>
              Vas a sumar {pointsEarned.toLocaleString('es-AR')} puntos con esta compra.
            </Text>
            <TouchableOpacity
              accessibilityRole="button"
              disabled={hasInvalidPrice}
              onPress={handlePurchase}
              style={[
                styles.buyButton,
                hasInvalidPrice && styles.disabledButton,
              ]}
            >
              <Text style={styles.buyButtonText}>Comprar vuelos</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
}
