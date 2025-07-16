import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { InputWithLabel } from '../UI';


let config = require('../ConfigUser');

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Input validation
    if (!name || !email || !password) {
      Alert.alert('Validation Error', 'Please fill out all fields.');
      return;
    }

  const emailRegex = /^[^\s@]+@gmail\.com$/;
    if (!emailRegex.test(email.trim().toLowerCase())) {
      Alert.alert('Invalid Email', 'Email must be in format xxx@gmail.com');
      return;
    }

        // Prevent registration with admin email
      if (email.trim().toLowerCase() === 'admin123@gmail.com') {
        Alert.alert('Registration Failed', 'This email is reserved for admin use.');
        return;
    }

    const userData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      pass: password,
      position: false
    };

    fetch(`${config.settings.serverPath}/api/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(res => res.json().then(data => ({ status: res.status, body: data })))
    .then(({ status, body }) => {
      if (status === 201) {
        Alert.alert('Success', 'Registration successful!');
        navigation.goBack(); 
      } else {
        Alert.alert('Registration Failed', body.error || 'Please try again.');
      }
    })
    .catch(error => {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <InputWithLabel
        label="Name:"
        value={name}
        onChangeText={setName}
      />
      <InputWithLabel
        label="Email:"
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
      />
      <InputWithLabel
        label="Password:"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center'
  },

  button: {
    backgroundColor: '#009688',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  }
});
