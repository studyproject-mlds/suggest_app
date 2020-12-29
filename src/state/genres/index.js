import {createActionsSelectors} from '@/redox';
// createActions, createSelectors,
import * as actions from './actions';
import {genres} from './slice';

// const createdActions = createActions({actions, slice: me});
// export {createdActions as actions};

// export const selectors = createSelectors(me);

const {actions: createdActions, selectors} = createActionsSelectors({
	actions,
	slice: genres,
});

export {createdActions as actions, selectors, genres};