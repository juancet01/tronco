import { View, StyleSheet } from 'react-native';  // ← faltaba esto
import Header from '@/components/Header';

export default function HomeScreen() {
  return (
    <View style={s.container}>
      <Header />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});