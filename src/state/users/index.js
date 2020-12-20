import {createActions} from '@/redox';

import * as actions from './actions';

import {users} from './slice';

export default createActions({actions, slice: users});
