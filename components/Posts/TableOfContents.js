import getAllHeadings from '../../lib/getAllHeadings';
import { useEffect, useState} from 'react';  

export default function TableOfContents() {
	const [ headings, setHeadings] = useState([]);
	useEffect(() => {
		setHeadings(getAllHeadings());
	}, []); 

	return (
		<div className="table-of-contents">
			<h1>Table of Contents</h1>
			<ol>
				{headings.map((item) => {
					console.log('**** ITEMS *** ', item);
					return (<li key={item.url}>
						<a href={item.url}>{item.title}</a>
					</li>);
				})}
			</ol>
		</div>
	);
}
