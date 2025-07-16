import React from "react";
import {Text,View,Image,Button,TouchableWithoutFeedback,Platform,StyleSheet} from "react-native";
import { InputWithLabel } from "../UI";

let config=require("../ConfigCake");


const App = ({route, navigation}) => {

  const {cake} = route.params;

  const _delete = () => {
    let url=config.settings.serverPath +"/api/cakerecords/"+cake.id;
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

    return(
    <View style={styles.container}>
      <Image source={{ uri: cake.img }} style={{ width: 100, height: 100, borderRadius: 4, marginBottom: 16 }} />
      <InputWithLabel
        label="Name:"
        value={cake.name}
        editable={false}
        orientation="horizontal"
      />
      <InputWithLabel
        label="Price:"
        value={String(cake.price)}
        editable={false}
        orientation="horizontal"
      />

      <Text >Order Date: {new Date(parseInt(cake.date)).toLocaleDateString()}</Text>
    
      <View style={{ marginTop: 16 }}>
        <Button
        title="Complete Order"
        onPress={_delete
            
            }
        />
      </View>
    </View>
    )
    
}
const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor:'#d3f7d2',
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