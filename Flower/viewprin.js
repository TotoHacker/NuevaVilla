import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { UserContext } from './UserContext'; // Importa el contexto de usuario
import Micomponent from './recomendaciones';
const { userId } = useContext(UserContext); // Obtener el ID del usuario del contexto

const MainView = ({ navigation }) => {
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleAnswerForm = () => {
    navigation.navigate('Formulario');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Flower Shield</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <TouchableOpacity onPress={handleAnswerForm} style={styles.answerButton}>
          <Text style={styles.answerButtonText}>Contestar Formulario</Text>
        </TouchableOpacity>
        <View style={styles.recommendationsContainer}>
          <Text style={styles.recommendationsHeader}>Recomendaciones:</Text>
          <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={true}>
            <Micomponent />
            
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.checkRadiationButton}>
            <Text style={styles.checkRadiationButtonText}>Checar Radiación de Hoy</Text>
          </TouchableOpacity>
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
    position:'relative',
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
    height:100000,
  },
  answerButton: {
    backgroundColor: '#FF6347',
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
    maxHeight:600,
    alignItems: 'center',
    marginTop: 20,
  },
  recommendationsHeader: {
    padding:50,

    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollViewContent: {
    height:900,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  imagen: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginTop: 6,
  },
  texto: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  checkRadiationButton: {

    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  checkRadiationButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default MainView;
