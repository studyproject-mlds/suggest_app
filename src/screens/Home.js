import * as React from 'react';
// import {SafeAreaView} from 'react-native-safe-area-context';
import Box from '@/components/Box';
import Text from '@/components/Text';
import Button from '@/components/Button';
import {getApi, logout} from '@/auth/auth';

export default function Home({setLogged}) {
  const [me, setMe] = React.useState({});
  React.useEffect(() => {
    (async () => {
      const me = await (await getApi()).get('/me/');
      if (me.data.length > 0) {
        setMe(me.data[0]);
      }
    })();
  }, []);

  return (
    <Box alignItems="center" justifyContent="center" height="100%">
      <Text>Open up App.js to start working on your app!</Text>
      {me && me.first_name && <Text>HELLO {me.first_name}</Text>}
      <Button
        onPress={() => {
          logout();
          setLogged(false);
        }}>
        <Text>Logout</Text>
      </Button>
    </Box>
  );
}
