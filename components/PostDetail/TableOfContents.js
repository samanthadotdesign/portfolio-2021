import getAllHeadings from '../../lib/getAllHeadings';

export default function TableOfContents(props) {
	const {headings, activeId}=props; 

	return (
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
	);
}
