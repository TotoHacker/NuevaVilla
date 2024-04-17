import React, { useState, useContext, useEffect } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { UserContext } from './UserContext'; // Importa el contexto de usuario

const FormView = ({ navigation }) => {
  const { userId } = useContext(UserContext); // Obtener el ID del usuario del contexto
  const [enfermedades, setEnfermedades] = useState([]);
  const [selectedEnfermedad, setSelectedEnfermedad] = useState('');
  const [loading, setLoading] = useState(true);
  const [enfermedadesSeleccionadas, setEnfermedadesSeleccionadas] = useState([]);

  // Función para cargar las enfermedades existentes al montar el componente
  useEffect(() => {
    fetchEnfermedades();
  }, []);

  // Función para obtener las enfermedades existentes desde el servidor
  const fetchEnfermedades = async () => {
    try {
      const response = await axios.get('http://192.168.0.8:8080/enfermedades');
      setEnfermedades(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener las enfermedades:', error.message);
    }
  };


  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    try {
      // Obtén solo los IDs de enfermedades seleccionadas
      const enfermedadesIds = enfermedadesSeleccionadas.map(enfermedad => enfermedad.id);
      // Enviar el formulario con el ID del usuario y los IDs de las enfermedades seleccionadas
      const response = await axios.post('http://192.168.0.9:8080/usuarios/enfermedades', {
        id_usuario: userId,
        id_enfermedades: enfermedadesIds, // Cambiar a id_enfermedades
      });
      console.log(response.data); // Muestra la respuesta del servidor en la consola
      Alert.alert('¡Exito!','Se a registrado con exito la(s) enfermedades');
      navigation.navigate('Main');// Aquí puedes manejar la respuesta del servidor como desees (por ejemplo, mostrar un mensaje de éxito)
    } catch (error) {
      console.error('Error al enviar el formulario:', error.message);
      // Aquí puedes manejar el error como desees (por ejemplo, mostrar un mensaje de error)
      Alert.alert('¡Error!','No se han podido registrar la(s) enfermedades, intentelo de nuevo');
    }
  };
  


  // Función para agregar una enfermedad a las seleccionadas
  const handleAddEnfermedad = () => {
    const enfermedadSeleccionada = enfermedades.find(enfermedad => enfermedad.id === selectedEnfermedad);
    if (selectedEnfermedad && !enfermedadesSeleccionadas.some(enf => enf.id === enfermedadSeleccionada.id)) {
      setEnfermedadesSeleccionadas([...enfermedadesSeleccionadas, enfermedadSeleccionada]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecciona una enfermedad:</Text>
      <Picker
        selectedValue={selectedEnfermedad}
        onValueChange={(itemValue) => setSelectedEnfermedad(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecciona una enfermedad" value="" />
        {enfermedades.map((enfermedad) => (
          <Picker.Item key={enfermedad.id} label={enfermedad.nombre} value={enfermedad.id} />
        ))}
      </Picker>

      <Button title="Agregar" onPress={handleAddEnfermedad} />

      <Text style={styles.label}>Enfermedades seleccionadas:</Text>
      {enfermedadesSeleccionadas.map((enfermedad, index) => (
        <Text key={index}>{enfermedad.nombre}</Text>
      ))}

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
  picker: {
    height: 50,
    marginBottom: 15,
  },
});

export default FormView;
