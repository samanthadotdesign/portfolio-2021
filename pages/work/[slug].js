import React from 'react';
import { getPostData, getPostFiles } from '../../lib/posts-util';
import { MDXRemote } from 'next-mdx-remote';
import Sample from '../../components/sample';
import About from '../../components/Homepage/About';

// IMPORT EVERY SINGLE CUSTOM COMPONENT
const availableComponentsForMarkdown = {Sample, About };

// Search friendly URL
export default function Slug(props) {
	return (
		<>

			<p>HIHIHIHI</p>
			< MDXRemote {
				...props
			}
			components = {
				availableComponentsForMarkdown
			}
			/>

		</>
	);
}

export const getStaticProps = (context) => {
	const { params } = context;
	const { slug } = params;

	const postData = getPostData(slug);
	return {
		props: {
			post: postData.mdxSource,
			frontMatter: postData.frontMatter
		},
		// A single post is refreshed every 10 min when changes are made
		revalidate: 600,
	};
};

export const getStaticPaths = () => {
	const postFileNames = getPostFiles();
  
	const slugs = postFileNames.map((fileName) => fileName.replace(/\.mdx$/, ''));

	return {
		paths: slugs.map((slug) => ({ params: { slug } })),
		fallback: false,
	};
};
