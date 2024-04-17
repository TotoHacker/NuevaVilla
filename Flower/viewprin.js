import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Image } from 'react-native';

import { UserContext } from './UserContext'; // Importa el contexto de usuario

const MainView = ({ navigation }) => {
  const [sensorData, setSensorData] = useState(null);
  const { userId } = useContext(UserContext); // Obtén el ID de usuario del contexto

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleAnswerForm = () => {
    navigation.navigate('Formulario');
  };

  const handleCheckRadiation = async () => {
    try {
      const response = await fetch('http://10.10.60.180/sensor');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.text(); // Leer el cuerpo de la respuesta directamente
      setSensorData(data);
      console.log('Radiación UV del sensor:', data); // Aquí data será el valor numérico del sensor
      handleUVActions

      // Realiza las acciones basadas en los datos de radiación UV
      handleUVActions(data);
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
    if (data) {
      const parsedData = JSON.parse(data);
      const radiacionesUV = parsedData.radiaciones_uv.map(Number); // Convertir los valores a números
      const minValue = Math.min(...radiacionesUV);
      const DivMaxUV = minValue / 4;
  
      if (sensorData >= minValue) {
        // Peligro
        return (
          <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
            <Text style={styles.texto}>No puedes salir hoy</Text>
            <Image source={require('./assets/no_salir.png')} style={styles.imagen} />
          </View>
        );
      } else if (sensorData <= (minValue - DivMaxUV)) {
        // Mayor
        return (
          <>
            <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
              <Text style={styles.texto}>Aplica bloqueador solar</Text>
              <Image source={require('./assets/crema_solar.png')} style={styles.imagen} />
            </View>
            <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
              <Text style={styles.texto}>Demasiado sol</Text>
              <Image source={require('./assets/sudor.png')} style={styles.imagen} />
            </View>
            <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
              <Text style={styles.texto}>Utiliza sombrilla</Text>
              <Image source={require('./assets/sombrilla.png')} style={styles.imagen} />
            </View>
          </>
        );
      } else if (sensorData <= (minValue - (2 * DivMaxUV))) {
        // Medio
        return (
          <>
            <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
              <Text style={styles.texto}>Aplica bloqueador solar</Text>
              <Image source={require('./assets/crema_solar.png')} style={styles.imagen} />
            </View>
            <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
              <Text style={styles.texto}>Usa gorra para el sol</Text>
              <Image source={require('./assets/gorrasol.png')} style={styles.imagen} />
            </View>
          </>
        );
      } else {
        // Nada
        return (
          <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
            <Text style={styles.texto}>Despejado, puedes salir hoy</Text>
            <Image source={require('./assets/salir.png')} style={styles.imagen} />
          </View>
        );
      }
    }
  };
  
  const fetchMaxUV = async () => {
    try {
      const response = await fetch(`http://10.10.52.160:8080/maxUv/${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Aquí puedes hacer algo con los datos de radiación UV obtenidos, por ejemplo, imprimir en la consola
      console.log('Datos de radiación UV:', data);
    } catch (error) {
      console.error('Error fetching max UV:', error);
    }
  };

  useEffect(() => {
    // Realiza la solicitud de radiación UV máxima al cargar el componente
    fetchMaxUV();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Flower Shield</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recommendationsContainer}>
          <Text style={styles.recommendationsHeader}>Recomendaciones:</Text>

          {/*aqui iran las imagenes dependiendo handleUVActions */}
          {handleUVActions(data)}

          <TouchableOpacity style={styles.checkRadiationButton} onPress={handleCheckRadiation}>
            <Text style={styles.checkRadiationButtonText}>Checar Radiación de Hoy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAnswerForm} style={styles.answerButton}>
            <Text style={styles.answerButtonText}>Contestar Formulario</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <TouchableOpacity onPress={handleAnswerForm} style={styles.answerButton}>
            <Text style={styles.answerButtonText}>Contestar Formulario</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#e98c00',
    backgroundColor: '#e98c00', // Salmón claro
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutButton: {
    padding: 10,
  },
  logoutButtonText: {
    fontSize: 12,
    color: '#fff',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100000,
  },
  answerButton: {
    backgroundColor: '#E8A700',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  recommendationsContainer: {
    maxHeight: 600,
    alignItems: 'center',
    marginTop: 20,
  },
  recommendationsHeader: {
    padding: 50,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkRadiationButton: {
    backgroundColor: '#E8A700',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkRadiationButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default MainView;
