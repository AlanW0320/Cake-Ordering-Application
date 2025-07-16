import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MainScreen from './screens/MainScreen';
import CakeScreen from './screens/CakeScreen';
import HistoryScreen from './screens/HistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderScreen from './screens/OrderScreen';  
import PaymentScreen from './screens/PaymentScreen';
import HistoryDetail from './screens/HistoryDetail';
import HomeScreen from './screens/HomeScreen';
import EditScreen from './screens/EditScreen';
import ViewScreen from './screens/ViewScreen';
import CreateScreen from './screens/CreateScreen';
import AdminProfileScreen from './screens/AdminProfileScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import LogoutScreen from './screens/LogoutScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import ViewFeedbackScreen from './screens/ViewFeedbackScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="home-circle"
              size={focused ? 30 : 20}
              color={focused ? 'green' : 'black'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cake"
        component={CakeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="cake-variant"
              size={focused ? 30 : 20}
              color={focused ? 'green' : 'black'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="history"
              size={focused ? 30 : 20}
              color={focused ? 'green' : 'black'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account-circle"
              size={focused ? 30 : 20}
              color={focused ? 'green' : 'black'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AdminBottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="home-circle"
              size={focused ? 30 : 20}
              color={focused ? 'green' : 'black'}
            />
          ),
        }}
      />
      
      <Tab.Screen
        name="AdminProfile"
        component={AdminProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account-circle"
              size={focused ? 30 : 20}
              color={focused ? 'green' : 'black'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Main app with tabs */}

        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          //options={{ headerShown: false }} 
        />
        
      
        <Stack.Screen 
          name="order" 
          component={OrderScreen} 
          
        />

        <Stack.Screen 
          name="payment" 
          component={PaymentScreen} 
          
        />

        <Stack.Screen 
          name="HistoryDetail"
          component={HistoryDetail} 
        />


        <Stack.Screen 
          name="User" 
          component={BottomTabNavigator} 
          //options={{ headerShown: false }} 
          options={{
            headerStyle: {
              backgroundColor: '#404040',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
            },
            headerTitleAlign: 'center',
          }} 
        />

        <Stack.Screen 
          name="Admin" 
          component={AdminBottomTabNavigator} 
          //options={{ headerShown: false }} 
          options={{
            headerStyle: {
              backgroundColor: '#404040',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
            },
            headerTitleAlign: 'center',
          }} 
        />



        <Stack.Screen 
          name = "main"
          component={MainScreen}
        />
        <Stack.Screen 
          name = "view"
          component={ViewScreen}
        />
        <Stack.Screen 
          name = "edit"
          component={EditScreen}
        />
        <Stack.Screen 
          name = "create"
          component={CreateScreen}
        />

        <Stack.Screen 
          name="Feedback" 
          component={FeedbackScreen}
        />
        
        <Stack.Screen 
          name="Logout"
          component={LogoutScreen}
        />

        <Stack.Screen 
          name="Profile"
          component={ProfileScreen} 
        />

        <Stack.Screen 
          name="ViewFeedback" 
          component={ViewFeedbackScreen}
        />


        
        {/* Add other stack screens here if needed */}
        {/* Example: <Stack.Screen name="DetailScreen" component={DetailScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;