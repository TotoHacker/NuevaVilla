import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { UserContext } from './UserContext'; // Importa el contexto de usuario

const MainView = ({ navigation }) => {
  const [sensorData, setSensorData] = useState(null);
  const { idUser } = useContext(UserContext); // Obtén el ID de usuario del contexto

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleAnswerForm = () => {
    navigation.navigate('Formulario');
  };

  const handleCheckRadiation = async () => {
    try {
      const response = await fetch('http://192.168.0.14/sensor');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.text(); // Leer el cuerpo de la respuesta directamente
      setSensorData(data);
      console.log('Radiación UV del sensor:', data); // Aquí data será el valor numérico del sensor
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };
  

  const fetchMaxUV = async () => {
    try {
      const response = await fetch(`http://192.168.0.14/maxUv/${idUser}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Aquí puedes hacer algo con la radiación UV máxima obtenida, por ejemplo, imprimir en la consola
      console.log('Radiación UV máxima:', data.maxUV);
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
          {/* Renderizar sensorData aquí */}
          <TouchableOpacity style={styles.checkRadiationButton} onPress={handleCheckRadiation}>
            <Text style={styles.checkRadiationButtonText}>Checar Radiación de Hoy</Text>
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
    backgroundColor: '#FF6347',
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
    backgroundColor: '#6495ED',
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
