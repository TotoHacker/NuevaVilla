import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native';
import { UserContext } from './UserContext'; // Importa el contexto de usuario
import { LineChart } from 'react-native-chart-kit';

const MainView = ({ navigation }) => {
  const { userId } = useContext(UserContext); // Obtener el ID del usuario del contexto
  const [sensorData, setSensorData] = useState([]); // Definir el estado sensorData y su función setSensorData
  const [minRadiacion, setMinRadiacion] = useState(null); // Estado para almacenar la radiación mínima

  useEffect(() => {
    obtenerDatosSensor();
    const intervalId = setInterval(obtenerDatosSensor, 2000); // Actualizar cada 2 segundos
    return () => clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonte
  }, []); // Llamar a obtenerDatosSensor() cuando el componente se monta

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  // Consumo de la API para traer los datos de la tabla sensor según el ID del usuario
  const obtenerDatosSensor = async () => {
    try {
      const response = await fetch(`http://192.168.0.8:8080/sensor/${userId}`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos del sensor');
      }
      const data = await response.json();
      console.log('Datos del sensor obtenidos:', data);
      setSensorData(data);
    } catch (error) {
      console.error('Error al obtener los datos del sensor:', error);
    }
  };

  // Consumo de la API para subir los datos del sensor
  const subirDatosSensor = async (data) => {
    try {
      const response = await fetch(`http://192.168.0.8:8080/sensor/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ datoSensor: data }), // Envía el dato del sensor en el cuerpo de la solicitud
      });
      if (!response.ok) {
        throw new Error('Error al subir los datos del sensor');
      }
      console.log('Datos del sensor subidos correctamente');
    } catch (error) {
      console.error('Error al subir los datos del sensor:', error);
    }
  };

  const fetchMaxUV = async () => {
    try {
      const response = await fetch(` http://192.168.0.9:8080/maxUv/${userId}`);
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
      const response = await fetch(' http://192.168.0.9:8080/sensor');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSensorData(data);
      console.log('Sensor data:', data);
      
      // Llama a fetchMaxUV() para obtener los datos de radiación UV
      await fetchMaxUV();
      await subirDatosSensor(data);

    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };

  const Micomponent = ({ data, minRadiacion }) => {
    // Verifica si minRadiacion es null y muestra el mensaje predeterminado en ese caso
    if (minRadiacion === null) {
      return (
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            <Image source={require('./assets/espera.png')} style={styles.imagenN} />
            <Text style={styles.textoS}>Presiona Checar radiación para dar recomendaciones</Text>
          </View>
        </View>
      );
    } else {
      const dataPoint = data.length > 0 ? data[data.length - 1].datoSensor : null;
      if (dataPoint === null) {
        return null;
      } else if (dataPoint >= minRadiacion) {
        return (
          <View style={styles.row}>
            <View style={styles.imageContainer}>
              <Image source={require('./assets/no_salir.png')} style={styles.imagen} />
              <Text style={styles.texto}>No puedes salir hoy</Text>
            </View>
          </View>
        );
      } else if (dataPoint >= minRadiacion - minRadiacion / 4) {
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
      } else if (dataPoint >= minRadiacion - (minRadiacion / 4) * 2) {
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
      } else {
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
      }
    }
  }; 

  const handleAnswerForm = () => {
    navigation.navigate('crud');
  };


  return (
    <ScrollView style={styles.contentContainer}>
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
          
        </View>

        {/* Gráfica de datos del sensor */}
        <Text style={styles.chartHeader}>Radicacion de hoy</Text>
        {sensorData && sensorData.length > 0 && (
          <LineChart
            data={{
              labels: sensorData.map((dataPoint, index) =>`Dato ${index + 1}`), // Etiquetas del eje X (índices de los datos)
              datasets: [
                {
                  data: sensorData.map(dataPoint => parseFloat(dataPoint.datoSensor)), // Datos del sensor convertidos a números
                },
              ],
            }}
            width={400}
            height={200}
            yAxisLabel="Uv "
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: '#FFFFFF',
              backgroundGradientFrom: '#FFFFFF',
              backgroundGradientTo: '#FFFFFF',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '7',
                strokeWidth: '2',
                stroke: '#E8A700',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        )}

        <View style={styles.body}>
        <TouchableOpacity style={styles.answerButton} onPress={handleCheckRadiation}>
            <Text style={styles.answerButtonText}>Checar Radiación de Hoy</Text>
          </TouchableOpacity>
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
    height: 'auto',
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
    width:350,
  },

  answerButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  recommendationsContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
  chartHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  
});

export default MainView;
