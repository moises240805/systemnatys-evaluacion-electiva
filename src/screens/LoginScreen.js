import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../components/FormInput';
import { loginUser, clearAuthError } from '../store/slices/authSlice';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.authError);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onValidSubmit = (data) => {
    dispatch(
      loginUser({
        email: data.email,
        password: data.password,
      })
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Sistema Naty's</Text>
        <Text style={styles.subtitle}>
          Inicio de sesión — Módulo Móvil (Electiva III)
        </Text>

        <View style={styles.formBox}>
          <FormInput
            control={control}
            name="email"
            label="Correo electrónico"
            placeholder="usuario@natys.local"
            keyboardType="email-address"
            autoCapitalize="none"
            onInputChange={() => {
              if (authError) dispatch(clearAuthError());
            }}
            rules={{
              required: 'El correo electrónico es obligatorio.',
              maxLength: {
                value: 80,
                message: 'El correo no puede superar los 80 caracteres.',
              },
              pattern: {
                value: EMAIL_REGEX,
                message: 'Ingresa un formato de correo electrónico válido.',
              },
            }}
          />

          <FormInput
            control={control}
            name="password"
            label="Contraseña"
            placeholder="Mínimo 8 caracteres"
            secureTextEntry
            autoCapitalize="none"
            onInputChange={() => {
              if (authError) dispatch(clearAuthError());
            }}
            rules={{
              required: 'La contraseña es obligatoria.',
              minLength: {
                value: 8,
                message: 'La contraseña debe tener al menos 8 caracteres.',
              },
              maxLength: {
                value: 40,
                message: 'La contraseña no puede superar los 40 caracteres.',
              },
            }}
          />

          {authError ? (
            <View style={styles.alertBox}>
              <Text style={styles.alertText}>{authError}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onValidSubmit)}
            disabled={isSubmitting}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.hintBox}>
          <Text style={styles.hintTitle}>Credenciales ficticias de prueba:</Text>
          <Text style={styles.hintText}>Correo: moises.test@natys.local</Text>
          <Text style={styles.hintText}>Clave: NatysPassword123</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 24,
  },
  formBox: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  alertBox: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 14,
  },
  alertText: {
    color: '#b91c1c',
    fontSize: 13,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#1d4ed8',
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  hintBox: {
    marginTop: 18,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  hintTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: 4,
  },
  hintText: {
    fontSize: 12,
    color: '#1e40af',
  },
});