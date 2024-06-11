import { sample } from 'lodash';

// ----------------------------------------------------------------------
/*const fetchNumberOfUsers = async () => {
  try {
    const response = await fetch(`http://localhost:8083/SERVICE-UTILISATEUR/Utilisateur-service/count`);
    if (!response.ok) {
      throw new Error('Failed to fetch user count');
    }
    const data = await response.json();
    return data.count; 
  } catch (error) {
    console.error('Error fetching user count:', error.message);
    return null;
  }
};

  const numberOfUsersFromBackend = await fetchNumberOfUsers();
  
    */
export const users = [...Array(24)].map((_, index) => ({
      id: Int32Array,
      nom: String,
      email: String,
      prenom: String,
      mot_de_passe: String,
      role: String,
    }));
