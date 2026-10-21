import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { cartStyles as styles } from '../../stylos/global.styles';
import { useTrips } from '../context/TripContext';
import { createBooking } from '../services/flightService';

const MOCK_CARD_NUMBER = '4242424242424242';

function formatPrice(amount) {
  return `$${Math.round(amount).toLocaleString('es-AR')}`;
}

export default function CartScreen() {
  const { cartTrips, removeFromCart } = useTrips();
  const [comprando, setComprando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const precioInvalido = cartTrips.some(
    (trip) => !Number.isFinite(trip.priceAmount) || trip.priceAmount < 0
  );
  const total = cartTrips.reduce(
    (sum, trip) => sum + trip.priceAmount * trip.passengerCount,
    0
  );

  const comprarVuelos = async () => {
    setComprando(true);
    setMensaje(null);
    let comprados = 0;
    let errorCompra = null;

    for (const trip of cartTrips) {
      try {
        await createBooking({
          flightId: trip.id,
          passengerCount: trip.passengerCount || 1,
          cardNumber: MOCK_CARD_NUMBER,
          cardName: 'Compra de prueba',
        });
        removeFromCart(trip.id);
        comprados += 1;
      } catch (error) {
        errorCompra = error;
        break;
      }
    }

    if (errorCompra) {
      setMensaje({
        error: true,
        texto:
          comprados > 0
            ? `Se completó la compra de ${comprados} vuelo(s). Los vuelos restantes siguen en el carrito. ${errorCompra.message}`
            : `No se pudo completar la compra. Los vuelos siguen en el carrito. ${errorCompra.message}`,
      });
    } else {
      setMensaje({
        error: false,
        texto: `Compra de prueba completada para ${comprados} vuelo(s). No se realizó ningún cobro real.`,
      });
    }

    setComprando(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <Text style={styles.title}>Carrito de compras</Text>
      <Text style={styles.subtitle}>
        {cartTrips.length} {cartTrips.length === 1 ? 'vuelo' : 'vuelos'}
      </Text>

      {mensaje ? (
        <Text style={[styles.notice, mensaje.error && styles.noticeError]}>
          {mensaje.texto}
        </Text>
      ) : null}

      {cartTrips.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
          <Text style={styles.emptyText}>
            Agregá vuelos desde Inicio o Buscar para comprarlos.
          </Text>
        </View>
      ) : (
        <>
          {cartTrips.map((trip) => {
            const passengerCount = trip.passengerCount || 1;
            const price = Number.isFinite(trip.priceAmount)
              ? formatPrice(trip.priceAmount * passengerCount)
              : 'Precio no disponible';

            return (
              <View key={trip.id} style={styles.card}>
                <Text style={styles.route}>{trip.title}</Text>
                <Text style={styles.detail}>{trip.airline}</Text>
                <Text style={styles.detail}>{trip.time}</Text>
                <View style={styles.row}>
                  <View>
                    <Text style={styles.detail}>
                      {passengerCount} {passengerCount === 1 ? 'pasajero' : 'pasajeros'}
                    </Text>
                    <Text style={styles.price}>{price}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.removeButton}
                    disabled={comprando}
                    onPress={() => removeFromCart(trip.id)}
                    accessibilityRole="button"
                  >
                    <Text style={styles.removeText}>Quitar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

          <View style={styles.summary}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.total}>
                {precioInvalido ? 'No disponible' : formatPrice(total)}
              </Text>
            </View>
            <Text style={styles.detail}>
              Compra de prueba: no se realizará ningún cobro real.
            </Text>
            <TouchableOpacity
              style={[styles.buyButton, (comprando || precioInvalido) && styles.disabledButton]}
              disabled={comprando || precioInvalido}
              onPress={comprarVuelos}
              accessibilityRole="button"
            >
              <Text style={styles.buyButtonText}>
                {comprando ? 'Procesando compra…' : 'Comprar vuelos'}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
}
