import {
    createSelector
} from 'reselect';

//input selector takes the whole state and get a slice of it which is cart
const selectUser = state => state.user;

//output selector
//memoized
export const selectCurrentUser = createSelector(
    //collection of input selectors
    [selectUser],
    //return what we want as output
    user => user.currentUser
);