import React, { useState, useEffect } from "react";
import { Text, View, FlatList, TouchableNativeFeedback,Image } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { formatted } from "../utility";

let config=require("../ConfigCake");
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
      <View style={{flex:1, backgroundColor:'#fcfbd2'}}>
        <FlatList 
          data = {cakes}
          renderItem = { ({item}) => (
            <TouchableNativeFeedback
              onPress = { () => navigation.navigate('view', {
                cake: item,
                refresh: _query
              }) }
            >
              <View style={{padding:10, borderBottomWidth: 1}}>
              <Image 
              source={{ 
                uri: `${item.img}?${Date.now()}`, 
                cache: 'reload' 
              }}
              style={{ 
              width: 100, 
              height: 100,
              borderRadius: 4,
              marginRight: 16
            }}
/>
                <Text style={{fontSize:22, fontWeight:'bold'}}>{item.id}</Text>
                <Text style={{fontSize:22, fontWeight:'bold'}}>{item.name}</Text>
                <Text style={{fontSize:15}}>{item.price}</Text>
                
                
              </View>
            </TouchableNativeFeedback>
          )}
        />
        <FloatingAction 
          actions = {[
            {
              text: 'Add cake',
              icon: require('../image/add_icon.jpg'),
              name: 'add'
            }
          ]}
          onPressItem={()=>navigation.navigate('create', {
            refresh: _query
          })}
        />
      </View>
    )
}

export default App;