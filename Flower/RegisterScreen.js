import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const RegisterScreen = () => {
  const [name, setName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://192.168.0.8:3000/register', {
        nombre: name,
        UsuoCorr: email,
        contraseña: password,
      });
      console.log(response.data); 
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
          placeholder="Apellido"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />
        <TextInput
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
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
