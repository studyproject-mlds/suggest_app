import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import Home from '@/screens/Home';

import Login from '@/screens/Login';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeStack = ({setLogged}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home">
        {(props) => <Home {...props} setLogged={setLogged} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const LoginStack = ({setLogged}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login">
        {(props) => <Login {...props} setLogged={setLogged} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default function Navigation() {
  const [logged, setLogged] = React.useState(false);
  return (
    <NavigationContainer>
      {logged && <HomeStack setLogged={setLogged} />}
      {!logged && <LoginStack setLogged={setLogged} />}
    </NavigationContainer>
  );
}
