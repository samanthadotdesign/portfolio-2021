import Nav from './Nav';
import { HomepageDiv } from './styles';
import React from 'react';

export default function Layout(props) {
	return (
		<>
			<Nav />
			<HomepageDiv>{props.children}</HomepageDiv>
		</>
	);
}
