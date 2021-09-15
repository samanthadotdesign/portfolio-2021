import React, { createContext, useReducer } from 'react';

export const GlobalContext = createContext(null);
const { Provider } = GlobalContext;

export const ACTIONS = {
	MESSY_MODE: 'Messy homepage mode',
	NEAT_MODE: 'Neat homepage mode'
};

// Set to messy layout by default
const initialLayoutState = { 
	isMessy: true,
};

// Homepage layout
const layoutReducer = (state, action) => {
	switch (action.type) {
	case ACTIONS.MESSY_MODE:
		state.isMessy = true;
		return { ...state };
	case ACTIONS.NEAT_MODE:
		state.isMessy = false;
		return { ...state };
	default:
		return state;
	}
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