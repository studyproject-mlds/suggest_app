import React from 'react';
// import FacebookLogin from 'react-facebook-login';
// import {config} from '@/config/facebook';
import {LoginButton, AccessToken} from 'react-native-fbsdk';

/*<LoginButton
    appId={config.appID}
    autoLoad={autoLoad}
    fields="name,email,picture"
    onClick={onClick}
    callback={callback}
  />
*/

export default ({errorCB = () => {}, callback = () => {}}) => {
  return (
    <LoginButton
      onLoginFinished={(error, result) => {
        if (error) {
          console.log('login has error: ' + result.error);
          errorCB('login has error: ' + result.error);
        } else if (result.isCancelled) {
          console.log('login is cancelled.');
          errorCB('login is cancelled.');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            console.log(data.accessToken.toString());
            callback(data.accessToken.toString());
          });
        }
      }}
      onLogoutFinished={() => console.log('logout.')}
    />
  );
};
