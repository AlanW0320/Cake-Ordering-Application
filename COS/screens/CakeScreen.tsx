import React, { useState, useEffect } from "react";
import { Text, View, FlatList, TouchableNativeFeedback,Image } from "react-native";



let config = require("../ConfigCake");
const App = ({navigation}) => {

  const [cakes, setCakes] = useState([]);

  const _query = () => {
    
    let url =config.settings.serverPath + "/api/cakes";
    fetch(url).then( response=>{
      return response.json()
    }).then(cakes=>{
      setCakes(cakes)
    })
    
  }

  useEffect(()=>{
    _query();
  }, []);

    return(
      <View style={{flex:1}}>
        <FlatList 
          data = {cakes}
          renderItem = { ({item}) => (
            <TouchableNativeFeedback
              onPress = { () => navigation.navigate('order', {
                cake: item,
                refresh: _query
              }) }
            >
              <View style={{padding:10, borderBottomWidth: 1, backgroundColor:'#fcfbd2'}}>
                <Image source={{uri: item.img}} style={{width: 100, height: 100,borderRadius: 4, marginRight:16}} />
                <Text style={{fontSize:22, fontWeight:'bold'}}>{item.id}</Text>
                <Text style={{fontSize:22, fontWeight:'bold'}}>{item.name}</Text>
                <Text style={{fontSize:15}}>{item.price}</Text>
                
              </View>
            </TouchableNativeFeedback>
          )}
        />
        
      </View>
    )
}

export default App;