import loginRequest from './tokenClient';
//Import the file if you are generating token
import getLoginClient, {
	setAccessToken,
	setRefreshToken,
	setBackend,
	getBackend,
} from './loggedInClient';
//Import the file if you are logged in
// import guestRequest from '../apiAuth/guestClient';
//Import the file if you are using no token required API

export {
	loginRequest,
	getLoginClient,
	setAccessToken,
	setRefreshToken,
	setBackend,
	getBackend,
};
