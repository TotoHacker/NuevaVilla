import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native'; // Importa Alert para mostrar mensajes de error
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    // Validar campos antes de enviar la solicitud de registro
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
    

    try {
      const response = await axios.post('http://192.168.0.8:8080/signup', {
        nombre: name,
        correo_electronico: email,
        contrasena: password,
      });
      console.log(response.data);

      // Si el registro es exitoso, navegar a la pantalla de inicio de sesión
      navigation.navigate('Login'); // Navegar a la pantalla de inicio de sesión
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
  
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address" // Establece el tipo de teclado a email-address
          style={styles.input}
        />

        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
        />
      </View>
      <Button title="Registrarse" onPress={handleRegister} />
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
  formContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 25,
  },
  input: {
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: '#007BFF',
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: 50,
    borderRadius: 25,
    fontSize: 16,
  },
});

export default RegisterScreen;
