import {createActionsSelectors} from '@/redox';
// createActions, createSelectors,
// import * as actions from './actions';
import {world} from './slice';

// const createdActions = createActions({actions, slice: me});
// export {createdActions as actions};

// export const selectors = createSelectors(me);

const {actions: createdActions, selectors, getters} = createActionsSelectors({
	slice: world,
});

export {createdActions as actions, selectors, world, getters};
