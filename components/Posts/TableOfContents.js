import getAllHeadings from '../../lib/getAllHeadings';


export default function TableOfContents(props) {
	const {headings, activeId}=props; 

	return (
		<div className="table-of-contents">
			<h1>Table of Contents</h1>
			<ol>
				{headings.map((item) => {
					
					return (<li key={item.id}>
						< a href = {
							`#${item.id}`
							
						}  > {
								item.title
							} < /a>
					</li>);
				})}
			</ol>
		</div>
	);
}
