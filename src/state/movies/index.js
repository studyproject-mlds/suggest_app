import {createActionsSelectors} from '@/redox';
// createActions, createSelectors,
import * as actions from './actions';
import {movies} from './slice';

// const createdActions = createActions({actions, slice: me});
// export {createdActions as actions};

// export const selectors = createSelectors(me);

const {actions: createdActions, selectors, getters} = createActionsSelectors({
	actions,
	slice: movies,
});

export {createdActions as actions, selectors, movies, getters};
