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
		<div className="d-flex justify-content-end px-0">
			<button className="layout-toggle-btn px-0" onClick={toggleMessy}>
				{isMessy ? 'SNAP TO GRID' : 'LAUNCH CHAOS'}
			</button>
		</div>
	);
}