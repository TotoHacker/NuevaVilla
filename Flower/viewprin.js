import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
            <Text style={styles.recommendationsHeader}>Recomendaciones</Text>
            <View style={styles.recommendations}>
            </View>
            <TouchableOpacity style={styles.checkRadiationButton}>
              <Text style={styles.checkRadiationButtonText}>Checar Radiación del Día de Hoy</Text>
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
    backgroundColor: '#FFFDD0', // Amarillo claro
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFA07A', // Salmón claro
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
    fontSize: 18,
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
    backgroundColor: '#6495ED', // Azul acero
    padding: 15,
    borderRadius: 10,
  },
  checkRadiationButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default MainView;
