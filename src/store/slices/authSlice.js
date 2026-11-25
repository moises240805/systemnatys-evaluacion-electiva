import { createSlice } from '@reduxjs/toolkit';

const INITIAL_USERS = [
  {
    id: 1,
    name: 'Moisés Pereira',
    email: 'moises.test@natys.local',
    password: 'NatysPassword123',
    role: 'Administrador',
  },
  {
    id: 2,
    name: 'Elías Armas',
    email: 'elias.test@natys.local',
    password: 'LarenceUser2026',
    role: 'Coordinador',
  },
  {
    id: 3,
    name: 'Edgmairys Apóstol',
    email: 'edgmairys.test@natys.local',
    password: 'ProyectoTest2026',
    role: 'Operador',
  },
];

const initialState = {
  users: INITIAL_USERS,
  currentUser: null,
  authError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { email, password } = action.payload;
      const normalizedEmail = email.trim().toLowerCase();

      const matchedUser = state.users.find(
        (user) =>
          user.email.toLowerCase() === normalizedEmail &&
          user.password === password
      );

      if (matchedUser) {
        const { password: _, ...safeUser } = matchedUser;
        state.currentUser = safeUser;
        state.authError = null;
      } else {
        state.currentUser = null;
        state.authError = 'Credenciales inválidas. Verifica correo y contraseña.';
      }
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.authError = null;
    },
    clearAuthError: (state) => {
      state.authError = null;
    },
  },
});

export const { loginUser, logoutUser, clearAuthError } = authSlice.actions;
export default authSlice.reducer;