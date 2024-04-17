import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'react-native';

const Micomponent = () =>(
  <View style={styles.imageContainer}>
  <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
  <Text style={styles.texto}>Aplicate bloqueador solar</Text>
      <Image source={require('./assets/crema_solar.png')} style={styles.imagen} />
    </View>
    <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
    <Text style={styles.texto}>Usa gorra para el sol</Text>
  <Image source={require('./assets/gorrasol.png')} style={styles.imagen} />
  </View>
  <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
  <Text style={styles.texto}>Utiliza sombrilla </Text>
  <Image source={require('./assets/sombrilla.png')} style={styles.imagen} />
  </View>
  <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
  <Text style={styles.texto}>Deamasiado sol</Text>
  <Image source={require('./assets/sudor.png')} style={styles.imagen} />
</View>
</View>
);
const MainView = ({ navigation }) => {
  const [showFormButton, setShowFormButton] = useState(true);
  const [recommendations, setRecommendations] = useState([]);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleAnswerForm = () => {
    // Navegar a la vista del formulario
    navigation.navigate('Formulario');
  };

  useEffect(() => {
    const checkUserFormStatus = async () => {

      const userFormStatus = 1;

      if (userFormStatus === 1) {
        setShowFormButton(false);
       
        setRecommendations([]);
      } else {
        setShowFormButton(true);
      }
    };

    checkUserFormStatus();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Flower Shield</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        {showFormButton ? (
          <TouchableOpacity onPress={handleAnswerForm} style={styles.answerButton}>
            <Text style={styles.answerButtonText}>Contestar Formulario</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.recommendationsContainer}>
            <Text style={styles.recommendationsHeader}>Recomendaciones:</Text>
            <View style={styles.recommendations}>
            <Micomponent/>
            </View>
            <TouchableOpacity style={styles.checkRadiationButton}>
              <Text style={styles.checkRadiationButtonText}>Checar Radiación de Hoy</Text>
            </TouchableOpacity>
          </View>
  
        )}
      </View>
    </View>
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
  },
  answerButton: {
    backgroundColor: '#FF6347', // Rojo coral
    padding: 20,
    borderRadius: 10,
    elevation: 3,
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
  recommendation: {
    width: '45%', 
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommendationImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'cover',
  },
  recommendationText: {
    textAlign: 'center',
  },
  checkRadiationButton: {
    backgroundColor: '#FF6347', 
    padding: 15,
    borderRadius: 10,
  },
  checkRadiationButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: 'white', // Color de fondo del contenedor
    borderRadius: 10, // Ajusta según tu diseño
    marginHorizontal: 10, // Ajusta según tu diseño
    justifyContent: 'space-between', // Ajusta según tu diseño
    paddingHorizontal: 10, // Espaciado horizontal dentro del contenedor
    paddingVertical: 5, // Espaciado vertical dentro del contenedor
  },
  imagen:{
    width: 120, // 5 cm en puntos
  height: 120, // 5 cm en puntos
  resizeMode: 'cover',
  alignSelf: 'center',
  marginTop: 6,
  },
  texto: {
    fontSize: 16, // Ajusta según tu diseño
    fontWeight: 'bold', // Ajusta según tu diseño
    marginRight: 10, // Espaciado a la derecha del texto
  },
});

export default MainView;
