import React, { createContext, useReducer } from "react";
export const GlobalContext = createContext(null);
const { Provider } = GlobalContext;

export const ACTIONS = {
  MESSY_MODE: "Messy homepage mode",
  NEAT_MODE: "Neat homepage mode",
  DARK_MODE: "Dark theme",
  LIGHT_MODE: "Light theme",
  SET_NAV_HEIGHT: "Set navigation header height",
  SET_WINDOW_SIZE: "Set current browser window size",
};

/******************************
 ************ BROWSER **********
 *******************************/

const initialWindowState = {
  nav: {
    height: 0,
  },
  window: {
    width: 0,
    height: 0,
  },
  breakpoints: {
    lg: 1200,
    md: 996,
    sm: 768,
    xs: 480,
    xxs: 360,
  },
  cols: {
    lg: 12,
    md: 10,
    sm: 8,
    xs: 6,
    xxs: 4,
  },
};

const windowReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_NAV_HEIGHT:
      state.nav.height = action.payload;
      return { ...state };
    case ACTIONS.SET_WINDOW_SIZE:
      state.window.width = action.payload.width;
      state.window.height = action.payload.height;
      return { ...state };
  }
};

/******************************
 ************ LAYOUT ***********
 *******************************/

// Set to messy layout by default
const initialLayoutState = {
  isMessy: false,
  cursorText: "",
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
    case ACTIONS.SET_CURSOR_TEXT:
      return { ...state, cursorText: action.payload };
    default:
      return state;
  }
};

/******************************
 ************ THEME ************
 *******************************/

const initialColorState = {
  isDarkMode: false,
};

const colorReducer = (state, action) => {
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
  const [layoutStoreState, layoutDispatch] = useReducer(
    layoutReducer,
    initialLayoutState
  );
  const [colorStoreState, colorDispatch] = useReducer(
    colorReducer,
    initialColorState
  );
  const [windowStoreState, windowDispatch] = useReducer(
    windowReducer,
    initialWindowState
  );

  return (
    <Provider
      value={{
        layoutStoreState,
        layoutDispatch,
        colorStoreState,
        colorDispatch,
        windowStoreState,
        windowDispatch,
      }}
    >
      {children}
    </Provider>
  );
};
