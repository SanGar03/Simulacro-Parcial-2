import React, { useState,useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image,Dimensions,FlatList } from 'react-native';
import DeleteDestino from './DeleteDestino';

const { width } = Dimensions.get('window');

const DestinoDetails = ({ route, navigation }) => {
  const { destino:initialDestino } = route.params; 
  const [destino, setDestino] = useState(initialDestino); 

  useEffect(() => {
    setDestino(initialDestino);
    colorDificultad(destino);
  }, [initialDestino]);

  if (!destino) {
    return <Text>Destino no encontrado.</Text>;
  }
  const handleDeleteSuccess = () => {
    navigation.goBack();
  };

  const handleDeleteError = (error) => {
    Alert.alert('Error', 'No se pudo eliminar el destino. Intenta nuevamente.');
  };

  const colorDificultad = (destino) => {
      if(destino.difficulty === 'easy'){
        return styles.dificultadBaja
      } else if (destino.difficulty === 'medium'){
        return styles.dificultadMedia
      } else {
        return styles.dificultadAlta
      }
  }

  const esFavorito = (destino) => {
    if(destino.favourite){
      return "Destino Favorito"
    } else{
      return "No es un destino favorito"
    }

  }

  return (
    <View style={styles.container}>
    
      <Text style={styles.destinoName}>{destino.name}</Text>
      <Text style={styles.destinoDescription}> Descripción: {destino.description}</Text>
      <Text style={[styles.dificultad,colorDificultad(destino)]}> Dificultad: {destino.difficulty}</Text>
      <Text style={styles.favorito}>{esFavorito(destino)}</Text>

      <Button
        title="Editar"
        onPress={() => navigation.navigate('EditDestino', { destino })}
      />
      <DeleteDestino
        destinoId={destino.id}
        destinoName={destino.name}
        onDeleteSuccess={handleDeleteSuccess}
        onDeleteError={handleDeleteError}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: width*0.075,
    paddingLeft: width*0.075
  },
  destinoName: {
    fontSize: width*0.1,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  destinoDescription: {
    fontSize: width*0.07,
    textAlign: 'center',
  },
  dificultad:{
    fontSize: width*0.07,
    textAlign: 'center',
  },
  dificultadBaja:{
    color: 'green'
  },
  dificultadMedia:{
    color: 'yellow',
    backgroundColor: 'black'
  },
  dificultadAlta:{
    color: 'purple'
  },
  favorito: {
    fontSize: width*0.07,
    textAlign: 'center',
  }
});

export default DestinoDetails;