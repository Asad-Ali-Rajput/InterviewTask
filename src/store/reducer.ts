import { ActionTypes, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, SORT_ITEMS } from './action';

export interface Item {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    avatar: string;
}

export interface State {
  items: Item[];
}

const initialState: State = {
  items: [],
};

const rootReducer = (state = initialState, action: ActionTypes): State => {
  switch (action.type) {

  case ADD_ITEM:
  console.log("Before ADD_ITEM - items:", state.items);
  const updatedItems = action.payload;
  const newState = {
    ...state,
    items: updatedItems,
  };
  console.log("After ADD_ITEM - items:", newState.items);
  return newState;
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
      case DELETE_ITEM:
        const indexToDelete = state.items.findIndex(item => item.id === action.payload);
        if (indexToDelete !== -1) {
          const updatedItems = [...state.items];
          updatedItems.splice(indexToDelete, 1);
          return {
            ...state,
            items: updatedItems,
          };
        };
        console.log(state)
        return state;
      case SORT_ITEMS:
          const sortedItems = [...state.items];
          switch (action.payload) {
            case 'id':
              console.log("id")
              sortedItems.sort((a, b) => a.id - b.id);
              break;
            case 'name':
              console.log("name")
              sortedItems.sort((a, b) => a.firstname.localeCompare(b.firstname));
              break;
            case 'email':
              console.log("email")
              sortedItems.sort((a, b) => a.email.localeCompare(b.email));
              break;
            default:
              break;
          }
          return {
            ...state,
            items: sortedItems,
          };
    default:
      return state;
  }
};

export default rootReducer;
