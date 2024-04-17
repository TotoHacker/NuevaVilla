import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username: username,
        password: password
      });
      if (response.status === 200) {
        // El inicio de sesión fue exitoso, redirigir a la pantalla principal
        navigation.navigate('Main');
      } else {
        // El inicio de sesión falló, mostrar mensaje de error
        setErrorMessage('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión: ', error.message);
      // El inicio de sesión falló debido a un error de red, mostrar mensaje de error
      setErrorMessage('Error de conexión. Por favor, comprueba tu conexión a internet.');
    }
  };

  const handleRegister = () => {
    // Redirigir a la pantalla de registro
    navigation.navigate('Main');
  };

  return (
    
    <View style={styles.container}>

      <TextInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <Button title="Iniciar Sesión" onPress={handleLogin} />
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.registerText}>¿No tienes una cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: '#007BFF',
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 50,
    borderRadius: 25,
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  registerText: {
    marginTop: 20,
    color: '#007BFF',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
