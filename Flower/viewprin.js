import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';

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
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleAnswerForm = () => {
    navigation.navigate('Formulario');
  };

  const handlepronostico = () => {
    navigation.navigate('pronostico');
  };

  return (
    <ScrollView >
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
      <Micomponent />
    </View>
    <TouchableOpacity style={styles.checkRadiationButton}>
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
    backgroundColor: '#FFFDD0', // Amarillo claro
    backgroundColor: '#FFFFFF', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFA07A', // Salmón claro
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
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
    justifyContent: 'center', // Añadimos esta línea para centrar el contenido verticalmente
    alignItems: 'center', // Añadimos esta línea para centrar el contenido horizontalmente
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
    backgroundColor: '#6495ED',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center', // Añadimos esta línea para centrar el contenido verticalmente
    alignItems: 'center', // Añadimos esta línea para centrar el contenido horizontalmente
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

