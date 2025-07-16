import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

let config=require("../ConfigUser");

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [loading, setLoading] = useState(false);

    // Reset input fields when navigating to login screen
    useEffect(() => {
        setEmail('');
        setPass('');
    }, []);

    const handleLogin = async () => {
        if (loading) return;

        if (!email.trim() || !pass.trim()) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${config.settings.serverPath}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.trim().toLowerCase(),
                    pass: pass,
                }),
            });

            const data = await response.json();
            await AsyncStorage.setItem("user", JSON.stringify(data));

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }
    
            // Debug log to check server response
            console.log('Login response:', data);
    
            // Determine the appropriate tab navigator based on role
            const targetRoute = data.user.role === 'admin' 
                ? 'Admin' 
                : 'User';
    
            navigation.reset({
                index: 0,
                routes: [{ name: targetRoute }],
            });
    
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Login Failed', error.message || 'Cannot connect to server');
        } finally {
            setLoading(false);
        }
    };


            /*if (response.ok) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: data.user.position ? 'BottomTabAdmin' : 'BottomTabUser' }],
                });
            } else {
                Alert.alert('Error', data.error || 'Invalid email or password');
            }
        } catch (error) {
            Alert.alert('Error', 'Cannot connect to server');
        } finally {
            setLoading(false);
        }
    };*/

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={pass}
                onChangeText={setPass}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={{ color: '#007BFF', marginTop: 16 }}>Don't have an account? Register</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginScreen;