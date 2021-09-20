export default function getAllHeadings () {

	let allHeadings = [];

	if(document)  allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

	allHeadings = Array.from(allHeadings);
	console.log('allHeadings', allHeadings);

	let cleanedData;
	if (document){

		 cleanedData = allHeadings.reduce((accumulator, current)=>{
			const {id, innerText}=current;
			console.log('CHECKING THE CURRENT HEADING', current, );
			return [...accumulator, {title:innerText,url:`#${id}`}];
		},[]);
	}

	console.log('CHECK THE CLEANED DATA', cleanedData);
	return cleanedData;
}

