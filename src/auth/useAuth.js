import {useContext} from 'react';
import Auth0Context from './auth0-context';

const useAuth = () => useContext(Auth0Context);

export default useAuth;
