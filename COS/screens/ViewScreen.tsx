import React, {useState} from "react";
import {Text,View,Image} from "react-native";
import { InputWithLabel } from "../UI";
import { FloatingAction } from "react-native-floating-action";
import { formatted } from "../utility";


let config=require("../ConfigCake");
const actions = [
  {
    text: 'Edit cake',
    icon: require("../image/edit_icon.jpg"),
    name: 'edit'
  },
  {
    text: 'Delete cake',
    icon: require("../image/delete_icon.jpg"),
    name: 'delete'
  }
]

const App = ({route, navigation}) => {

  const {cake} = route.params;

  const [name, setName] = useState(cake.name);
  const [price, setPrice] = useState(cake.price);
  const [img, setImg] = useState(cake.img);

  
  const _delete = () => {
    let url=config.settings.serverPath +"/api/cakes/"+cake.id;
    fetch(url,{
      method:'DELETE',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        id:cake.id
      }),
    })   
    route.params.refresh();
    navigation.goBack();
  }

  const _getCake = () => {
    let url=config.settings.serverPath +"/api/cakes/"+cake.id;
    fetch(url).then(response=>{
      return response.json()
    }).then(currentCake=>{
      setName(currentCake.name);
      setPrice(currentCake.City);
      setImg(currentCake.img);
    })
    
  }

    return(
      <View style={{flex:1, backgroundColor:'#fcfbd2'}}>
        <Image source={{ uri: cake.img }} style={{ width: 200, height: 200, borderRadius: 4, marginTop: 10,marginBottom: 16 }} />
        
      <View style={{padding:10, borderTopWidth: 1, borderBottomWidth: 1}}>
        <InputWithLabel 
          label = "Name:"
          value = {name}
          editable = {false}
          orientation = "horizontal"
        />
      </View>
      <View style={{padding:10, borderBottomWidth: 1}}>
        <InputWithLabel
        label="Price:"
        value={String(price)}
        editable={false}
        orientation="horizontal"
      />
      </View>
        
        <FloatingAction 
          actions={actions}
          onPressItem={name=>{
            switch(name){
              case 'edit':
                navigation.navigate('edit', {
                  cake: cake,
                  homeRefresh: route.params.refresh,
                  viewRefresh: _getCake
                })
                break;
              case 'delete':
                _delete();
                break;
            }
          }}
        />
      </View>
    )
}

export default App;