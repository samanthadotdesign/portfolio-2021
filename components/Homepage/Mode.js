import { LayoutModeToggle } from './styles';
import React, { useContext }  from 'react';
import { GlobalContext, ACTIONS } from '../../store';

export default function Mode() {
	const { layoutStoreState, layoutDispatch } = useContext(GlobalContext); 
	const { isMessy } = layoutStoreState;

	const toggleMessy = () => {
		// If layout is messy, the user wants to change it to neat
		if (isMessy) {
			layoutDispatch({type: ACTIONS.NEAT_MODE});
		}
		else {
			layoutDispatch({type: ACTIONS.MESSY_MODE});
		}
	};

	return (
		<LayoutModeToggle onClick={toggleMessy}>
			{isMessy ? 'Back to Chaos' : 'Back to Neat'}
		</LayoutModeToggle>
	);
}