import React, { useContext, useEffect } from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,ActivityIndicator,Dimensions,} from 'react-native';
import { DestinoContext } from '../context/DestinoContext';

const { width } = Dimensions.get('window');

const DestinoList = ({ navigation }) => {
  const { destinos, loadDestinos, loading } = useContext(DestinoContext);

  useEffect(() => {
    loadDestinos();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
  }

  if (!destinos.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No hay destinos disponibles</Text>
      </View>
    );
  }

  const colorDificultad = (destino) => {
    if(destino.difficulty === 'easy'){
      return styles.dificultadBaja
    } else if (destino.difficulty === 'medium'){
      return styles.dificultadMedia
    } else {
      return styles.dificultadAlta
    }
}

  const renderDestino = ({ item }) => (
    <TouchableOpacity
      style={styles.destinoContainer}
      onPress={() => navigation.navigate('DestinoDetails', { destino: item })}
    >
      <Text style={styles.destinoName}>{item.name}</Text>
      <Text style={[styles.dificultad, colorDificultad(item)]}>{item.difficulty}</Text>
      
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={destinos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderDestino}
      contentContainerStyle={styles.container}
    />
  );
};

export default DestinoList;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  destinoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 10,
    padding: width * 0.075,
  },
  destinoImage: {
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: 25,
  },
  destinoName: {
    fontSize: width*0.1,
    marginTop: width*0.02,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dificultad: {
    fontSize: width*0.07,
    marginTop: width*0.02,
    fontWeight: 'bold'
  },
  dificultadBaja:{
    color:'green'
  },
  dificultadMedia:{
    color:'yellow',
    backgroundColor: 'black'
  },
  dificultadAlta:{
    color:'purple'
  },
});
