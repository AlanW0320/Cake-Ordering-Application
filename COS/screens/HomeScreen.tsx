import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import openMap from "react-native-open-maps";
import { AppButton } from '../UI';

const HomeScreen = () => {
  const featuredCakes = [
    {
      id: 1,
      name: 'Chocolate Cake',
      description: 'Rich and moist chocolate cake with fudge frosting',
      image: require('../image/1.jpg'),
    },
    {
      id: 6,
      name: 'Strawberry Vanilla Cake',
      description: 'Light sponge cake with fresh strawberries and vanilla frosting',
      image: require('../image/2.jpg'),
    },
    {
      id: 10,
      name: 'Fruit Cake',
      description: 'Soft and fluffy cake topped with seasonal fruits',
      image: require('../image/3.jpg'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to SweetRecipe</Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.sectionTitle}>We are located at:</Text>
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <AppButton
                    title = "Our Location"
                    onPress = { () => openMap({
                        latitude: 3.0402,
                        longitude: 101.7944
                    })}
                    />
                </View>
      </View>

      <View style={styles.introSection}>
        <Text style={styles.sectionTitle}>About Us</Text>
        <Text style={styles.introText}>
          SweetRecipe is your one-stop destination for delicious, freshly baked cakes.
          We specialize in creating custom cakes for all occasions, using only the
          finest ingredients to ensure the best quality and taste.
        </Text>
      </View>

      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Our Featured Cakes</Text>
        {featuredCakes.map((cake) => (
          <View key={cake.id} style={styles.cakeCard}>
            <Image source={cake.image} style={styles.cakeImage} />
            <View style={styles.cakeInfo}>
              <Text style={styles.cakeName}>{cake.name}</Text>
              <Text style={styles.cakeDescription}>{cake.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffebf0',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#f2027e', 
    fontFamily: 'Arial', 
    marginBottom: 10,
  },
  contact: {
    fontSize: 16,
    color: '#555', 
    fontFamily: 'Arial',
  },
  introSection: {
    padding: 20,
    backgroundColor: '#fff5f8', 
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff6f61',
    fontFamily: 'Arial',
    marginBottom: 15,
  },
  introText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444', 
    fontFamily: 'Arial',
  },
  featuredSection: {
    padding: 20,
    backgroundColor: '#e6f7ff',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cakeCard: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cakeImage: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cakeInfo: {
    padding: 15,
  },
  cakeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Arial',
    marginBottom: 5,
  },
  cakeDescription: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Arial',
  },
});

export default HomeScreen;