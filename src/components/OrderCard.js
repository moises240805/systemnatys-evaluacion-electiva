import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default function OrderCard({ order, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.topRow}>
        <Text style={styles.orderId}>{order.id}</Text>
        <Text style={styles.badge}>{order.status}</Text>
      </View>
      <Text style={styles.client}>{order.clientName}</Text>
      <View style={styles.bottomRow}>
        <Text style={styles.meta}>Ítems: {order.itemsCount}</Text>
        <Text style={styles.total}>{order.total}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  orderId: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  badge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1d4ed8',
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  client: {
    fontSize: 15,
    color: '#334155',
    marginBottom: 8,
    fontWeight: '500',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  meta: {
    fontSize: 13,
    color: '#64748b',
  },
  total: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
});