import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const ProfileScreen = ({ navigation }) => {

  const [user, setUser] = useState(null);
    

  const handleLogout = async () => {
      try {
        
        await AsyncStorage.removeItem("user");
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }], 
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
    };
    
    
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const userData = await AsyncStorage.getItem('user');
          if (userData) {
            const parsedUser = JSON.parse(userData);
            console.log('User loaded from AsyncStorage:', parsedUser);  
            setUser(parsedUser);
          } else {
            console.log("No user data found in AsyncStorage.");
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
    
      fetchUser();
    }, []);

if (!user) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading...</Text>
    </View>
  );
}


  return (  
      <View style={styles.container}>
        <View style={styles.HeaderProfile}>
        <MaterialCommunityIcons style ={styles.icon} name="account-circle" />
        <Text style={styles.title}>My Profile</Text>
      </View>
        
        <View style={styles.ProfileBox}>
          <Text style={styles.profile}>Name: {user.user.name}</Text>
          <Text style={styles.profile}>Email: {user.user.email}</Text>
          <Text style={styles.profile}>Role: {user.user.role ? 'Admin' : 'User'}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Feedback')}>
          <Text style={styles.buttonText}>Feedback</Text>
        </TouchableOpacity>
  
        <Button title="Logout" onPress={handleLogout} />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor:'lightblue',
    },
    HeaderProfile:{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    icon:{
      fontSize: 100,
      marginRight: 16,
      color: 'black'
    },
    title: {
      fontSize: 28,
      marginBottom: 24,
      fontWeight: 'bold',
      color: 'black',
    },
    ProfileBox: {
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    profile: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
    },
    button: {
      padding: 16,
      backgroundColor: 'red',
      borderRadius: 8,
      marginBottom: 16,
    },
    buttonText: {
      fontSize: 18,
      color: 'white',
      textAlign: 'center',
    },
  });
  

export default ProfileScreen;
