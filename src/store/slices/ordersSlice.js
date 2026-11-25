import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [
    {
      id: 'PED-101',
      clientName: 'Comercial El Cercado',
      itemsCount: 12,
      total: '$145.00',
      status: 'Pendiente',
      notes: 'Entrega en horario matutino, verificar empaque.',
    },
    {
      id: 'PED-102',
      clientName: 'Bodega Santa Rosa',
      itemsCount: 6,
      total: '$78.50',
      status: 'En preparación',
      notes: 'Solicita factura fiscal al entregar.',
    },
    {
      id: 'PED-103',
      clientName: 'Distribuidora Lara Norte',
      itemsCount: 20,
      total: '$260.00',
      status: 'Completado',
      notes: 'Pago confirmado mediante transferencia.',
    },
  ],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    updateOrderStatus: (state, action) => {
      const { orderId, nextStatus } = action.payload;
      const target = state.orders.find((order) => order.id === orderId);
      if (target) {
        target.status = nextStatus;
      }
    },
  },
});

export const { updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;