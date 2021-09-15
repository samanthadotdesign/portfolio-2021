import React, { createContext, useReducer } from 'react';

export const GlobalContext = createContext(null);
const { Provider } = GlobalContext;

export const ACTIONS = {
	MESSY_MODE: 'Messy homepage mode',
	NEAT_MODE: 'Neat homepage mode',
	DARK_MODE: 'Dark theme',
	LIGHT_MODE: 'Light theme'
};

/******************************
************ LAYOUT ***********
*******************************/

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

/******************************
************ LAYOUT ***********
*******************************/

const initialColorState = {
	isDarkMode: true,
};

const colorReducer = (state,action) => {
	switch (action.type) {
	case ACTIONS.DARK_MODE:
		state.isDarkMode = true;
		return { ...state };
	case ACTIONS.LIGHT_MODE:
		state.isDarkMode = false;
		return { ...state };
	default:
		return state;
	}
};


// Final Provider
export const GlobalProvider = ({ children }) => {
	const [layoutStoreState, layoutDispatch] = useReducer(layoutReducer, initialLayoutState);
	const [colorStoreState, colorDispatch] = useReducer(colorReducer, initialColorState);

	return (
		<Provider value={
			{ layoutStoreState,
				layoutDispatch,
				colorStoreState,
				colorDispatch }
		}
		>
			{children}
		</Provider>
	);
};