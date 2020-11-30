import React from 'react';
import FbButton from '@/auth/facebook';
import {setUpApiFromAccessToken} from '@/auth/auth';
import {useNavigation} from '@react-navigation/native';

const Login = ({className, setLogged}) => {
  const navigation = useNavigation();
  const onClick = (ev) => {
    console.log(ev);
  };
  const callback = (backend) => async (accessToken) => {
    await setUpApiFromAccessToken(backend, accessToken);
    // navigation.navigate('Home');
    setLogged(true);
  };
  return <FbButton onClick={onClick} callback={callback('facebook')} />;
};

Login.displayName = 'Login';

export default Login;
