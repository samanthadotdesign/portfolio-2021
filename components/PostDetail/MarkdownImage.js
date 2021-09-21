import Image from 'next/image';

export default function MarkdownImage(props) {
	return (
		<Image {...props} 
			layout='responsive'
			loading='lazy' />
	);
}
