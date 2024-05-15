import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  adminInfo: localStorage.getItem('adminInfo')
    ? JSON.parse(localStorage.getItem('adminInfo'))
    : null,
};
function reducer(state, action) {
  switch (action.type) {
    case 'ADMIN_SIGNIN':
      return { ...state, adminInfo: action.payload };
    case 'ADMIN_SIGNOUT':
      return {
        ...state,
        adminInfo: null,
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}
