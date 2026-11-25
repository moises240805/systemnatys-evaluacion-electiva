import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderStatus } from '../store/slices/ordersSlice';

const STATUS_FLOW = ['Pendiente', 'En preparación', 'Completado'];

export default function OrderDetailScreen({ route, navigation }) {
  const { orderId } = route.params;
  const dispatch = useDispatch();

  const order = useSelector((state) =>
    state.orders.orders.find((item) => item.id === orderId)
  );

  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se encontró el pedido {orderId}.</Text>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backBtnText}>Regresar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentIndex = STATUS_FLOW.indexOf(order.status);
  const nextStatus =
    STATUS_FLOW[(currentIndex + 1) % STATUS_FLOW.length];

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.code}>Código: {order.id}</Text>
        <Text style={styles.label}>Cliente: <Text style={styles.value}>{order.clientName}</Text></Text>
        <Text style={styles.label}>Cantidad de ítems: <Text style={styles.value}>{order.itemsCount}</Text></Text>
        <Text style={styles.label}>Total estimado: <Text style={styles.value}>{order.total}</Text></Text>
        <Text style={styles.label}>Estado actual: <Text style={styles.statusValue}>{order.status}</Text></Text>
        <Text style={styles.label}>Observaciones:</Text>
        <Text style={styles.notes}>{order.notes}</Text>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() =>
            dispatch(
              updateOrderStatus({
                orderId: order.id,
                nextStatus,
              })
            )
          }
        >
          <Text style={styles.primaryBtnText}>
            Cambiar estado a "{nextStatus}"
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backBtnText}>Regresar al listado</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  code: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
  },
  value: {
    fontWeight: '700',
    color: '#0f172a',
  },
  statusValue: {
    fontWeight: '700',
    color: '#1d4ed8',
  },
  notes: {
    fontSize: 14,
    color: '#334155',
    backgroundColor: '#f1f5f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 18,
  },
  primaryBtn: {
    backgroundColor: '#1d4ed8',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  backBtn: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  backBtnText: {
    color: '#0f172a',
    fontWeight: '700',
    fontSize: 14,
  },
  errorText: {
    fontSize: 15,
    color: '#dc2626',
    marginBottom: 12,
  },
});