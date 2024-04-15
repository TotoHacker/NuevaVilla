import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const FormView = () => {
  const [enfermedad, setEnfermedad] = useState('');
  const [sintoma, setSintoma] = useState('');
  const [fecha, setFecha] = useState('');
  const [grado, setGrado] = useState('');
  const [observacion, setObservacion] = useState('');
  const [tratamiento, setTratamiento] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://192.168.0.8:3000/formulario', {
        enfermedad,
        sintoma,
        fecha,
        grado,
        observacion,
        tratamiento,
      });
      console.log(response.data); // Muestra la respuesta del servidor en la consola
      // Aquí puedes manejar la respuesta del servidor como desees (por ejemplo, mostrar un mensaje de éxito)
    } catch (error) {
      console.error('Error al enviar el formulario:', error.message);
      // Aquí puedes manejar el error como desees (por ejemplo, mostrar un mensaje de error)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enfermedad:</Text>
      <TextInput
        style={styles.input}
        value={enfermedad}
        onChangeText={setEnfermedad}
        placeholder="Enfermedad"
      />
      
      <Text style={styles.label}>Síntoma:</Text>
      <TextInput
        style={styles.input}
        value={sintoma}
        onChangeText={setSintoma}
        placeholder="Síntoma"
      />
      
      <Text style={styles.label}>Fecha:</Text>
      <TextInput
        style={styles.input}
        value={fecha}
        onChangeText={setFecha}
        placeholder="Fecha"
      />
      
      <Text style={styles.label}>Grado:</Text>
      <TextInput
        style={styles.input}
        value={grado}
        onChangeText={setGrado}
        placeholder="Grado"
      />
      
      <Text style={styles.label}>Observación:</Text>
      <TextInput
        style={styles.input}
        value={observacion}
        onChangeText={setObservacion}
        placeholder="Observación"
      />
      
      <Text style={styles.label}>Tratamiento:</Text>
      <TextInput
        style={styles.input}
        value={tratamiento}
        onChangeText={setTratamiento}
        placeholder="Tratamiento"
      />

      <Button title="Enviar formulario" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
});

export default FormView;
