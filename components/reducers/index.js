import { ADD_USER, RECEIVED_DATA, REQUESTED_DATA, REQUESTED_DATA_CAPTAINS1, RECEIVED_DATA_CAPTAINS1, REQUESTED_DATA_CAPTAINS2, RECEIVED_DATA_CAPTAINS2, RESET_CAPTAIN1, RESET_CAPTAIN2 } from '../constants';
import { combineReducers } from 'redux';

const initialState = {
  characterData: '',
  isLoading: false,
  captain1: 1,
  captain2: 1
}

const initialUsers = {
  users: [
    { username: 'Eric', email: 'Eric@yahoo.com', password: 'Eric', confirm: 'Eric' },
    { username: 'Taylor', email: 'Taylor@yahoo.com', password: 'Taylor', confirm: 'Taylor' },
    { username: 'Patrick', email: 'Patrick@yahoo.com', password: 'Patrick', confirm: 'Patrick' }
  ],
}

const addUser = (state = initialUsers, newUser) => ({
  ...state,
  users: [...state.users, newUser]
})

const loginPage = (state = initialUsers, action) => {
  switch (action.type) {
    case ADD_USER:
      return addUser(state, action.newUser);
    default:
      return state;
  }
}

const characters = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVED_DATA:
      return { ...state, characterData: action.characterData };
    case REQUESTED_DATA:
      return { ...state, isLoading: true }
    case RECEIVED_DATA_CAPTAINS1:
      return { ...state, captain1: action.captain1 };
    case REQUESTED_DATA_CAPTAINS1:
      return { ...state, isLoading: true }
    case RECEIVED_DATA_CAPTAINS2:
      return { ...state, captain2: action.captain2 };
    case REQUESTED_DATA_CAPTAINS2:
      return { ...state, isLoading: true }
    case RESET_CAPTAIN1:
      return { ...state, captain1: 1 }
    case RESET_CAPTAIN2:
      return { ...state, captain2: 1 }
    default:
      return state;
  }
}

  export default combineReducers({
    loginPage: loginPage,
    characters: characters
  })