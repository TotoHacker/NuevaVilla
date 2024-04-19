import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native';
import { UserContext } from './UserContext'; // Importa el contexto de usuario

const MainView = ({ navigation }) => {
  const { userId } = useContext(UserContext); // Obtener el ID del usuario del contexto
  const [sensorData, setSensorData] = useState(null); // Definir el estado sensorData y su función setSensorData
  const [minRadiacion, setMinRadiacion] = useState(null); // Estado para almacenar la radiación mínima

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const fetchMaxUV = async () => {
    try {
      const response = await fetch(`http://192.168.0.8:8080/maxUv/${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Accede a los valores de radiación UV
      const radiacionesUV = data.radiaciones_uv;
      console.log('Datos de radiación UV:', radiacionesUV);
      
      if (radiacionesUV && radiacionesUV.length > 0) {
        // Encuentra el valor mínimo de radiación
        const minRadiacion = Math.min(...radiacionesUV);
        console.log('Radiación UV más baja:', minRadiacion);
        setMinRadiacion(minRadiacion); // Almacena la radiación mínima en el estado
        // Hacer algo con el valor mínimo, como mostrar un mensaje en la consola
      } else {
        console.log('No se ha añadido ninguna enfermedad.');
        // Envía una alerta si no se han añadido enfermedades
        alert('No tienes enfermedades añadidas. Por favor, contesta el formulario.');
      }
  
    } catch (error) {
      console.error('Error fetching max UV:', error);
    }
  };
  

  const handleCheckRadiation = async () => {
    try {
      const response = await fetch('http://192.168.0.14/sensor');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSensorData(data);
      console.log('Sensor data:', data);
      
      // Llama a fetchMaxUV() para obtener los datos de radiación UV
      await fetchMaxUV();

    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };

  const Micomponent = ({ data, minRadiacion }) => {
    // Verifica si minRadiacion es null y asigna valores predeterminados en ese caso
    const min = minRadiacion ? minRadiacion / 4 : null;
    const datAlt = minRadiacion ? minRadiacion - min : null;
    const datMed = minRadiacion ? minRadiacion - (2 * min) : null;
  
    // Verifica si minRadiacion es null y muestra el mensaje predeterminado en ese caso
    if (minRadiacion === null) {
      return (
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            <Image source={require('./assets/espera.png')} style={styles.imagenN} />
            <Text style={styles.textoS}>Presiona Checar radiacion para dar recomendaciones</Text>
          </View>
        </View>
      );
    } else if (data >= minRadiacion) {
      return (
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            <Image source={require('./assets/no_salir.png')} style={styles.imagen} />
            <Text style={styles.texto}>No puedes salir hoy</Text>
          </View>
        </View>
      );
    } else if (data >= datAlt) {
      return (
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            <Image source={require('./assets/crema_solar.png')} style={styles.imagen} />
            <Text style={styles.texto}>Aplica bloqueador solar</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('./assets/sombrilla.png')} style={styles.imagen} />
            <Text style={styles.texto}>Utiliza sombrilla</Text>
          </View>
        </View>
      );
    } else if (data >= datMed) {
      return (
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            <Image source={require('./assets/crema_solar.png')} style={styles.imagen} />
            <Text style={styles.texto}>Aplica bloqueador solar</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('./assets/gorrasol.png')} style={styles.imagen} />
            <Text style={styles.texto}>Usa gorra para el sol</Text>
          </View>
        </View>
      );
    } else if (data >= min) {
      return (
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            <Image source={require('./assets/salir.png')} style={styles.imagen} />
            <Text style={styles.texto}>Despejado, puedes salir hoy</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('./assets/gorrasol.png')} style={styles.imagen} />
            <Text style={styles.texto}>Usa gorra para el sol</Text>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }; 
  

  const handleAnswerForm = () => {
    navigation.navigate('Formulario');
  };

  const handlepronostico = () => {
    navigation.navigate('pronostico');
  };

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
          <View style={styles.recommendations}>
            <Micomponent data={sensorData} minRadiacion={minRadiacion} />
          </View>
          <TouchableOpacity style={styles.checkRadiationButton} onPress={handleCheckRadiation}>
            <Text style={styles.checkRadiationButtonText}>Checar Radiación de Hoy</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <TouchableOpacity onPress={handleAnswerForm} style={styles.answerButton}>
            <Text style={styles.answerButtonText}>Contestar Formulario</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlepronostico} style={styles.answerButton}>
            <Text style={styles.answerButtonText}>Clima</Text>
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
    alignItems: 'center',
  },
  recommendationsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  recommendations: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  imagen: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  imagenN: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  texto: {
    textAlign: 'center',
  },
  textoS: {
    fontSize:18,
    textAlign: 'center',
    width:200,
    color:'#E8A700',
    margin:5,
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
