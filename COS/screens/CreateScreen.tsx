import React, { useState } from "react";
import { InputWithLabel, AppButton } from "../UI";
import { StyleSheet, View, Alert } from 'react-native';

let config = require("../ConfigCake");

const App = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);

  const _insert = async () => {
    if (loading) return;
    
    // Validation
    if (!name.trim() || !price.trim() || !img.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber)) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    try {
      new URL(img);
    } catch (e) {
      Alert.alert('Error', 'Please enter a valid image URL');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(config.settings.serverPath + "/api/newcakes", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          price: priceNumber,
          img: img.trim(),
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        Alert.alert('Success', 'Cake created successfully!');
        await route.params.refresh();
        navigation.goBack();
      } else {
        Alert.alert('Error', data.message || 'Failed to create cake');
      }
    } catch (error) {
      Alert.alert('Error', 'Network request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{padding:10, borderTopWidth: 1}}>
      <InputWithLabel 
        label="Name:"
        value={name}
        onChangeText={setName}
        orientation="horizontal"
        placeholder="Name"
        autoFocus
      />
      </View>
      <View style={{padding:10, borderTopWidth: 1, borderBottomWidth: 1}}>
      <InputWithLabel 
        label="Price:"
        value={price}
        onChangeText={input => setPrice(input.replace(/[^0-9.]/g, ''))}
        orientation="horizontal"
        placeholder="0.00"
        keyboardType="numeric"
      />
      </View>
      <View style={{padding:10, borderBottomWidth: 1}}>
      <InputWithLabel 
        label="Image URL:"
        value={img}
        onChangeText={setImg}
        orientation="horizontal"
        placeholder="https://example.com/image.jpg"
        autoCapitalize="none"
      />
      </View>
      <AppButton 
        title={loading ? "Creating..." : `Create ${name || "Cake"}`}
        onPress={_insert}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor:'#fcfbd2'
  },
});

export default App;