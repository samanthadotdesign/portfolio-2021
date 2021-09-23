import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../store';

export default function TableOfContents(props) {
	const { headings, activeId } = props;
	const { windowStoreState } = useContext(GlobalContext);
	const { window } = windowStoreState;
	const [ isLargeDevice, setIsLargeDevice ] = useState(false); 
	
	useEffect(() => {
		if (window.width > 768) {
			setIsLargeDevice(true);
		}
	}, []);

	return (
		<>
			{ isLargeDevice && 
			<div className="table-of-contents d-inline-flex flex-column align-items-end">
				<p className="toc-title">Table of Contents</p>
				<ul>
					{headings.map((item) => {
						return (<li className='toc-bullets' key={item.id}>
							< a href = {
								`#${item.id}`
							}  > {
									item.title
								} < /a>
						</li>);
					})}
				</ul>
			</div>
			}
		</>);
}
