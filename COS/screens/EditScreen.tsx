import React, { useState } from "react";
import { InputWithLabel, AppButton } from "../UI";
import { formatted } from "../utility";
import {
  StyleSheet,
  View
} from 'react-native';

let config=require("../ConfigCake");

const App = ({route, navigation}) => {

  const {cake} = route.params;

    const [name, setName] = useState(cake.name);
    const [price, setPrice] = useState(cake.price);
    const [img, setImg] = useState(cake.img);

  
  const _edit = () => {
    let url=config.settings.serverPath +"/api/cakes/"+cake.id;
    fetch(url,{
      method:'PUT',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        id:cake.id,
        name:name,
        price:price,
        img:img
      }),
    })   
    route.params.homeRefresh();
    route.params.viewRefresh();
    navigation.goBack();
  }

    return(
      <View style={{flex:1, backgroundColor:'#fcfbd2'}}>
        <View style={{padding:10, borderTopWidth: 1}}>
        <InputWithLabel 
          label = "Name:"
          value = {name}
          onChangeText = { input => setName(input)}
          orientation = "horizontal"
          placeholder = "Name"
        />
        </View>
        <View style={{padding:10, borderTopWidth: 1, borderBottomWidth: 1}}>
        <InputWithLabel 
          label = "Price:"
          value = {String(price)}
          onChangeText = { input => setPrice(input)}
          orientation = "horizontal"
          placeholder = "Price"
        />
        </View>
        <View style={{padding:10, borderBottomWidth: 1}}>
        <InputWithLabel 
          label = "Cake URL:"
          value = {img}
          onChangeText = { input => setImg(input)}
          orientation = "horizontal"
          placeholder = "Cake URL"
        />
        </View>

        
        <AppButton 
          title = {`Edit ${name}`}
          onPress = {()=>_edit()}
        />
      </View>
    )
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 10,
  },
  input: {
    fontSize: 20,
    height: 48,
    color: 'black',
    borderBottomWidth: 2,
    borderBottomColor: 'red',
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
});

export default App;