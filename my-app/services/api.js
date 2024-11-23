const IP = "192.168.1.28";

export const fetchPlanets = async () => {
    try {
      const response = await fetch(`http://${IP}:8000/planets`);
      if (!response.ok) throw new Error('Error al obtener los planetas');
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  export const postPlanets = async (name, description, moons, moon_names, image) => {
    try {
      const response = await fetch(`http://${IP}:8000/planets`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ 
          name, 
          description, 
          moons, 
          moon_names, 
          image 
        }), 
      });
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al realizar el POST:', error);
      throw error;
    }
  };

  export const updatePlanet = async (id, updatedData) => {
    try {
      const response = await fetch(`http://${IP}:8000/planets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) throw new Error('Error al actualizar el planeta');
      return await response.json();
    } catch (error) {
      console.error('Error al actualizar el planeta:', error);
      throw error;
    }
  };
  
  export const deletePlanet = async (id) => {
    try {
      const response = await fetch(`http://${IP}:8000/planets/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Error al eliminar el planeta');
      }
    } catch (error) {
      console.error('Error al eliminar el planeta:', error);
      throw error;
    }
  };