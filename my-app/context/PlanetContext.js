import React, { createContext, useState } from 'react';
import { fetchPlanets } from '../services/api';

export const PlanetContext = createContext();

export const PlanetProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false); 

  const loadPlanets = async () => {
    try {
      setLoading(true); 
      const data = await fetchPlanets();
      setPlanets(data);
    } catch (error) {
      console.error('Error al cargar planetas:', error);
    } finally {
      setLoading(false);
    }
  };

  const addPlanet = async (newPlanet) => {
    try {
      setLoading(true); 
      setPlanets((prevPlanets) => [...prevPlanets, newPlanet]);
      await loadPlanets(); 
    } catch (error) {
      console.error('Error al agregar planeta:', error);
    } finally {
      setLoading(false); 
    }
  };

  const updatePlanet = (id, updatedData) => {
    setPlanets((prevPlanets) =>
      prevPlanets.map((planet) =>
        planet.id === id ? { ...planet, ...updatedData } : planet
      )
    );
  };

  return (
    <PlanetContext.Provider value={{ planets, loading, setPlanets, addPlanet, loadPlanets,updatePlanet }}>
      {children}
    </PlanetContext.Provider>
  );
};
