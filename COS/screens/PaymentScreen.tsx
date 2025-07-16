import React, { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { InputWithLabel } from "../UI";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { formatted } from "../utility";

let config = require("../ConfigCake");

const App = ({ route, navigation }) => {
  const { cake } = route.params;

  const [date, setDate] = useState(new Date());
  const [openPicker, setOpenPicker] = useState(false);

  const openDatePicker = () => {
    setOpenPicker(true);
  };

  const onDateSelected = (event: DateTimePickerEvent, value: Date | undefined) => {
    if (value) {
      setDate(value);
    }
    setOpenPicker(false);
  };

  const handleOrder = async () => {
    const payload = {
      name: cake.name,
      price: cake.price,
      img: cake.img,
      date: date.valueOf(),
    };

    console.log("Sending order payload:", payload);

    try {
      const url = config.settings.serverPath + "/api/cakes";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert("Success", result.message || "Order placed successfully!");
        navigation.navigate("History");
      } else {
        Alert.alert("Error", result.error || "Failed to place order");
      }
    } catch (error) {
      console.error("Failed to place order:", error);
      Alert.alert("Error", "Network or server error occurred");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{padding:10, borderTopWidth: 1}}>
      <InputWithLabel
        label="Cake:"
        value={cake.name}
        editable={false}
        orientation="horizontal"
      />
      </View>
      <View style={{padding:10, borderTopWidth: 1, borderBottomWidth: 1}}>
      <InputWithLabel
        label="Price:"
        value={`$${cake.price}`}
        editable={false}
        orientation="horizontal"
      />
      </View>
      <View style={{padding:10, borderBottomWidth: 1}}>
      <TouchableWithoutFeedback onPress={openDatePicker}>
        <View>
          <InputWithLabel
            label="Pick-up Date:"
            value={formatted(new Date(date))}
            editable={false}
            orientation="horizontal"
          />
        </View>
      </TouchableWithoutFeedback>
      </View>

      {openPicker && (
        <DateTimePicker
          value={date}
          mode={"date"}
          display={Platform.OS === "ios" ? "spinner" : "calendar"}
          is24Hour={false}
          onChange={onDateSelected}
          style={styles.datePicker}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Pay" onPress={handleOrder} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor:'#fcfbd2',
  },
  buttonContainer: {
    marginTop: 20,
  },
  datePicker: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: 320,
    height: 260,
    display: "flex",
  },
});

export default App;
