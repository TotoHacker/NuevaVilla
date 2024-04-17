import React, { createContext, useContext } from 'react';

// Creamos el contexto del usuario
export const UserContext = createContext();

// Creamos un componente de proveedor para envolver nuestra aplicación
export const UserProvider = ({ children }) => {
  // Aquí podríamos tener lógica para obtener y almacenar la información del usuario, como el ID
  const userId = null; // Inicialmente no hay ningún usuario autenticado

  // Proporcionamos el valor del contexto a los componentes secundarios
  return <UserContext.Provider value={userId}>{children}</UserContext.Provider>;
};

// Creamos un hook personalizado para acceder al contexto del usuario
export const useUser = () => {
  return useContext(UserContext);
};
