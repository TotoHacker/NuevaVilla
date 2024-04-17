import React, { useState, useContext } from 'react';
import { View, Button, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { UserContext } from './UserContext'; // Importa el contexto de usuario

const LoginScreen = ({ navigation }) => {
  const { setUserId } = useContext(UserContext); // Obtiene la función para establecer el ID del usuario del contexto
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.0.9:8080/login', {
        nombre: name,
        correo_electronico: email,
        contrasena: password,
      });
      if (response.status === 200) {
        const userIdFromServer = response.data.id;
        setUserId(userIdFromServer); // Establece el ID del usuario en el contexto de usuario
        // Después de establecer el ID del usuario, navega a la siguiente pantalla
        navigation.navigate('Main'); // Por ejemplo, navega a la pantalla principal de la aplicación
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
    navigation.navigate('Register');
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
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
