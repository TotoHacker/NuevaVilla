import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
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
    paddingHorizontal: 20,
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
});

export default ClimaPage;
