export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const SORT_ITEMS = 'SORT_ITEMS';

export interface Item {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
}

interface AddItemAction {
  type: typeof ADD_ITEM;
  payload: Item;
}

interface UpdateItemAction {
  type: typeof UPDATE_ITEM;
  payload: Item;
}

interface DeleteItemAction {
  type: typeof DELETE_ITEM;
  payload: number; // item id
}

export type ActionTypes = AddItemAction | UpdateItemAction | DeleteItemAction;

export const addItem = (item: Item): ActionTypes => ({
  type: ADD_ITEM,
  payload: item,
});

export const updateItem = (item: Item): ActionTypes => ({
  type: UPDATE_ITEM,
  payload: item,
});

export const deleteItem = (itemId: number): ActionTypes => ({
  type: DELETE_ITEM,
  payload: itemId,
});

export const sortItems = (sortBy: string): ActionTypes => {
  return {
    type: SORT_ITEMS,
    payload: sortBy,
  };
};
