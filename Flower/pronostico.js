import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native'; // Importa Image
import axios from 'axios';

const ClimaPage = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const obtenerPronosticoClima = async () => {
    try {
      const response = await axios.get(`http://10.10.52.124:8080/pronostico-clima/${city}`);
      setWeatherData(response.data);
    } catch (error) {
      setError('Error al obtener el pronóstico del clima');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/mapa.jpeg')} style={styles.imagen} /> 
      <TextInput
        style={styles.input}
        placeholder="Ingrese la ciudad"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Obtener Pronóstico del Clima" onPress={obtenerPronosticoClima} />
      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text>Temperatura: {weatherData.temperatura}</Text>
          <Text>Humedad: {weatherData.humedad}</Text>
        </View>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  errorText: {
    marginTop: 20,
    color: 'red',
    fontSize: 16,
  },
  imagen:{
    width: 150, // 5 cm en puntos
  height: 150, // 5 cm en puntos
  resizeMode: 'cover',
  alignSelf: 'center',
  marginTop: 6,
  },
});

export default ClimaPage;
