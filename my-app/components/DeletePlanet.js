import React, { useContext, useState } from 'react';
import { Alert, Button } from 'react-native';
import { deletePlanet } from '../services/api';
import { PlanetContext } from '../context/PlanetContext';

const DeletePlanet = ({ planetId, planetName, onDeleteSuccess, onDeleteError }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const {loadPlanets} = useContext(PlanetContext);

  const handleDelete = () => {
    Alert.alert(
      'Confirmar eliminación',
      `¿Estás seguro de que deseas eliminar el planeta ${planetName}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            setIsDeleting(true);
            try {
              await deletePlanet(planetId);
              await loadPlanets();
              onDeleteSuccess(); 
            } catch (error) {
              console.error('Error al eliminar el planeta:', error);
              onDeleteError(error); 
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
  };

  return (
    <Button
      title={isDeleting ? 'Eliminando...' : 'Eliminar'}
      onPress={handleDelete}
      color="red"
      disabled={isDeleting}
    />
  );
};

export default DeletePlanet;