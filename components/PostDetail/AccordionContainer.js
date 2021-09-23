import React from 'react';
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

export default function AccordionContainer(props) {
	const { title, children } = props;
	return (
		<Accordion 
			allowZeroExpanded 
			className="margin-top-36 padding-bottom-24">
			<AccordionItem>
				<AccordionItemHeading>
					<AccordionItemButton>
						{title}					
					</AccordionItemButton>
				</AccordionItemHeading>
				<AccordionItemPanel>
					{children}
				</AccordionItemPanel>
			</AccordionItem>
		</Accordion>
	);
}
