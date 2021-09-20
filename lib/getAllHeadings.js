export default function getAllHeadings () {

	let allHeadings = [];

	const articleBody = document.getElementById('article-body');

	if (document && articleBody) allHeadings = articleBody.querySelectorAll('h1, h2, h3, h4, h5, h6');

	allHeadings = Array.from(allHeadings);

	let cleanedData;
	if (document){

		 cleanedData = allHeadings.reduce((accumulator, current)=>{
			const {id, innerText}=current;
			return [...accumulator, {title:innerText,id}];
		},[]);
	}

	return cleanedData;
}

