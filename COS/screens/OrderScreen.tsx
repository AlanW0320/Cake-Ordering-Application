import React from "react";
import {Text,View,Image,Button,TouchableWithoutFeedback,Platform,StyleSheet} from "react-native";
import { InputWithLabel } from "../UI";
import { formatted } from "../utility";


let config = require("../ConfigCake");


const App = ({route, navigation}) => {

  const {cake} = route.params;

    return(
    <View style={styles.container}>
      <Image source={{ uri: cake.img }} style={{ width: 200, height: 200, borderRadius: 4, marginTop: 10,marginBottom: 16 }} />
      
      <View style={{padding:10, borderTopWidth: 1, borderBottomWidth: 1}}>
      <InputWithLabel
        label="Name:"
        value={cake.name}
        editable={false}
        orientation="horizontal"
      />
      </View>

      <View style={{padding:10, borderBottomWidth: 1}}>
      <InputWithLabel
        label="Price:"
        value={String(cake.price)}
        editable={false}
        orientation="horizontal"
      />
      </View>
      
      <View style={{ marginTop: 16 }}>
        <Button
        title="Order"
        onPress={() => navigation.navigate("payment", { 
            cake:cake
       })}
        />
      </View>
    </View>
    )
    
}
const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor:'#fcfbd2'
  },
});

export default App;