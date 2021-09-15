import React, { createContext, useReducer } from 'react';

export const GlobalContext = createContext(null);
const { Provider } = GlobalContext;

const ACTIONS = {
	MESSY_MODE: 'Messy homepage mode',
	NEAT_MODE: 'Neat homepage mode'
};

// Homepage layout
const layoutReducer = (state, action) => {
	switch (action.type) {
	case ACTIONS.MESSY_MODE:
		return state;
	default:
		return state;
	}
};
 
const initialLayoutState = { 
	isMessy: false,
};

// Final Provider
export const GlobalProvider = ({ children }) => {
	const [layoutStoreState, layoutDispatch] = useReducer(layoutReducer, initialLayoutState);

	return (
		<Provider value={
			{layoutStoreState,
				layoutDispatch}
		}
		>
			{children}
		</Provider>
	);
};