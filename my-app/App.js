import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import DestinoList from './components/DestinoList';
import DestinoDetails from './components/DestinoDetails';
import Settings from './components/Settings'; 
import { Ionicons } from '@expo/vector-icons'; 
import AddDestino from './components/AddDestino';
import { DestinoProvider } from './context/DestinoContext';
import EditDestino from './components/EditDestino';

// Lo que quedo sin implementar fue el sort de favoritos. Y tampoco se implemento ninguno de los opcionales.
// Probando durante el parcial, solo 1 vez me paso de con el delete terminado que se trancara y no borrara. Pero le di devuelta a
// borrar y se elimino con normalidad. Como despues siguio funcionando con normalidad, ni idea de que paso ahi. 

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const DestinoStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="DestinoList"
      component={DestinoList}
      options={{ title: 'Lista de Destinos' }}
    />
    <Stack.Screen
      name="DestinoDetails"
      component={DestinoDetails}
      options={{ title: 'Detalles del Destino' }}
    />
    <Stack.Screen
      name="EditDestino"
      component={EditDestino}
      options={{ title: 'Editar Destino' }}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <DestinoProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Destinos') {
                iconName = 'earth-sharp'; 
              } else if (route.name === 'Configuración') {
                iconName = 'settings'; 
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Destinos" component={DestinoStack} />
          <Tab.Screen name="Configuración" component={Settings} />
          <Tab.Screen
            name="Crear Destino"
            component={AddDestino}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="add-circle" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </DestinoProvider>
  );
}
