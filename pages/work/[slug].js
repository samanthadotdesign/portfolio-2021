import React from 'react';
import { getPostData, getPostFiles } from '../../lib/posts-util';
import { MDXRemote } from 'next-mdx-remote';
import Sample from '../../components/sample';
import About from '../../components/Homepage/About';

// IMPORT EVERY SINGLE CUSTOM COMPONENT
const availableComponentsForMarkdown = {Sample, About };

// Search friendly URL
export default function Slug(props) {
	const serializedContent = props.post;

	return (
		< MDXRemote {
			...serializedContent
		}
		components = {
			availableComponentsForMarkdown
		}
		/>
	);
}

export const getStaticProps = async(context) => {
	const { params } = context;
	const { slug } = params;

	const postData = await getPostData(slug);
	return {
		props: {
			post: postData.mdxSource,
			frontMatter: postData.frontMatter,
			slug
		},
		// A single post is refreshed every 10 min when changes are made
		revalidate: 600,
	};
};

export const getStaticPaths = () => {
	//console.log('CHECKING GETTING STATIC PATHS');
	
	const postFileNames = getPostFiles();
	//console.log('**********POST FILE NAMES ********** ');

	//console.table(postFileNames);


	const slugs = postFileNames.map((fileName) => fileName.replace(/\.mdx$/, ''));
	//console.log('**********SLUGS ********** ');
	//console.table(slugs);

	return {
		paths: slugs.map((slug) => ({ params: { slug } })),
		fallback: false,
	};
};
