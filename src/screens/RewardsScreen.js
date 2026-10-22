import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { rewardsStyles as styles } from '../../stylos/global.styles';
import { useTrips } from '../context/TripContext';

const REWARDS = [
  {
    id: 'football',
    name: 'Pelota de fútbol',
    description: 'Una pelota para llevar a tu próximo viaje.',
    emoji: '⚽',
    cost: 600,
  },
  {
    id: 'bottle',
    name: 'Botella reutilizable',
    description: 'Mantené tu bebida a mano durante el viaje.',
    emoji: '🥤',
    cost: 900,
  },
  {
    id: 'travel-pillow',
    name: 'Almohada de viaje',
    description: 'Más comodidad para tus vuelos largos.',
    emoji: '🛏️',
    cost: 1200,
  },
  {
    id: 'backpack',
    name: 'Mochila de viaje',
    description: 'Un accesorio práctico para tu próxima aventura.',
    emoji: '🎒',
    cost: 2000,
  },
];

export default function RewardsScreen() {
  const { points, redeemPoints } = useTrips();
  const [lastRedemption, setLastRedemption] = useState('');

  const handleRedeem = (reward) => {
    const redeemed = redeemPoints(reward.cost);

    if (!redeemed) {
      Alert.alert(
        'Te faltan puntos',
        `Necesitás ${reward.cost.toLocaleString('es-AR')} puntos para canjear ${reward.name}.`
      );
      return;
    }

    setLastRedemption(
      `Canjeaste ${reward.name} por ${reward.cost.toLocaleString('es-AR')} puntos.`
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Canjear puntos</Text>
      <Text style={styles.subtitle}>
        Elegí una recompensa y usá los puntos que ganaste viajando.
      </Text>

      <View style={styles.balance}>
        <Text style={styles.balanceLabel}>Tu saldo</Text>
        <Text style={styles.balanceValue}>
          {points.toLocaleString('es-AR')} puntos
        </Text>
      </View>

      {lastRedemption ? (
        <Text accessibilityRole="alert" style={styles.subtitle}>
          {lastRedemption}
        </Text>
      ) : null}

      {REWARDS.map((reward) => {
        const canRedeem = points >= reward.cost;

        return (
          <View key={reward.id} style={styles.rewardCard}>
            <Text style={styles.rewardEmoji}>{reward.emoji}</Text>
            <View style={styles.rewardInfo}>
              <Text style={styles.rewardName}>{reward.name}</Text>
              <Text style={styles.rewardDescription}>
                {reward.description}
              </Text>
              <Text style={styles.rewardCost}>
                {reward.cost.toLocaleString('es-AR')} puntos
              </Text>
            </View>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={{ disabled: !canRedeem }}
              disabled={!canRedeem}
              onPress={() => handleRedeem(reward)}
              style={[
                styles.redeemButton,
                !canRedeem && styles.disabledButton,
              ]}
            >
              <Text
                style={[
                  styles.redeemButtonText,
                  !canRedeem && styles.disabledButtonText,
                ]}
              >
                Canjear
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
}
