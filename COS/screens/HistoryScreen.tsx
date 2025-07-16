import React, { useState, useCallback } from "react";
import { Text, View, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useFocusEffect } from '@react-navigation/native';

let config = require("../ConfigCake");
const App = ({ navigation }) => {
    const [cakes, setCakes] = useState([]);

    

    const fetchOrders = async () => {
        let url =config.settings.serverPath + "/api/cakerecords";
        try {
          const response = await fetch(url);
          const data = await response.json();
          setCakes(data);
        } catch (error) {
          console.error('Failed to fetch cakerecords:', error);
        }
      };
    
      useFocusEffect(
        useCallback(() => {
          fetchOrders();
        }, [])
      );

  return (
    <View style={styles.container}>
      <FlatList
        data={cakes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.itemContainer}
            onPress={() => navigation.navigate('HistoryDetail', { 
                cake: item,
                refresh: fetchOrders
            })}
          >
            <Image 
              source={{ uri: item.img }} 
              style={styles.image} 
            />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <Text style={styles.date}>Order Date: {new Date(parseInt(item.date)).toLocaleDateString()}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#d3f7d2',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10 ,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
  date: {
    fontSize: 14,
    color: '#aaa',
  },
});

export default App;