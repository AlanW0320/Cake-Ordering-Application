import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';

const FeedbackScreen = ({ navigation }) => {
  const [feedback, setFeedback] = useState('');

  const handleSendFeedback = () => {
    console.log('User Feedback:', feedback);

        if(feedback.trim() === '') {
            Alert.alert(
            'Error!',
            'Please enter your feedback.',
            [{ 
                text: 'OK' 
            }],
            { cancelable: false }
        )}
        else{
            Alert.alert(
            'Sent Successfully',
            'Thank you for your feedback!',
            [{
                text: 'OK',
                onPress: () => navigation.navigate('Profile'),
            }],
            { cancelable: false }   
    )};
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>We welcome and value your feedback!</Text>
      
      <TextInput
        style={styles.inputBox}
        multiline
        numberOfLines={4}
        placeholder="Type your feedback here..."
        value={feedback}
        onChangeText={setFeedback}
      />

      <Button title="Submit" onPress={handleSendFeedback} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'lightblue',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  inputBox: {
    height: 120,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top', 
    marginBottom: 20,
  },
});

export default FeedbackScreen;