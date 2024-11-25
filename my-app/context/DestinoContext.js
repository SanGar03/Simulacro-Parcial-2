import React, { createContext, useState } from 'react';
import { fetchDestinos } from '../services/api';

export const DestinoContext = createContext();

export const DestinoProvider = ({ children }) => {
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(false); 

  const loadDestinos = async () => {
    try {
      setLoading(true); 
      const data = await fetchDestinos();
      setDestinos(data);
    } catch (error) {
      console.error('Error al cargar destinos:', error);
    } finally {
      setLoading(false);
    }
  };

  const addDestino = async (newDestino) => {
    try {
      setLoading(true); 
      setDestinos((prevDestinos) => [...prevDestinos, newDestino]);
      await loadDestinos(); 
    } catch (error) {
      console.error('Error al agregar destinos:', error);
    } finally {
      setLoading(false); 
    }
  };

  const updateDestino = (id, updatedData) => {
    setDestinos((prevDestinos) =>
      prevDestinos.map((destino) =>
        destino.id === id ? { ...destino, ...updatedData } : destino
      )
    );
  };
 

  return (
    <DestinoContext.Provider value={{ destinos, loading, setDestinos, addDestino, loadDestinos, updateDestino }}>
      {children}
    </DestinoContext.Provider>
  );
};
