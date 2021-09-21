import React, {useEffect, useState} from 'react';
import { getPostData, getPostFiles } from '../../lib/getPostData';
import { MDXRemote } from 'next-mdx-remote';
import Sample from '../../components/sample';
import TableOfContents from '../../components/PostDetail/TableOfContents';
import MarkdownImage from '../../components/PostDetail/MarkdownImage';
import LoopingVideo from '../../components/PostDetail/LoopingVideo';

import getAllHeadings from '../../lib/getAllHeadings';

// IMPORT EVERY SINGLE CUSTOM COMPONENT
const availableComponentsForMarkdown = {
	Sample,
	TableOfContents,
	MarkdownImage,
	LoopingVideo
};

// Search friendly URL
export default function Slug(props) {
	const [ activeId, setActiveId ] = useState('');
	const [ headings, setHeadings ] = useState([]);
	
	const { post, frontMatter } = props;
	const serializedContent = post;
	const { toc } = frontMatter;
	

	useEffect(() => {
		setHeadings(getAllHeadings());
		
		// Intersection Observer checks what intersects with the browser
		// entries is all the elements that fit in the intersection 
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			}, {
				// After it has intersected more than 20% of the screen, show the change
				rootMargin: '0% 0% -80% 0%'
			}
		);

		// Observer event is only listening for the headings
		headings.forEach((heading) => {
			const itemToObserve = document.getElementById(heading.id);
			observer.observe(itemToObserve);
		});

		return () => {
			// Stop listening when the page is not available
			headings.forEach((heading) => {
				observer.unobserve(document.getElementById(heading.id));
			});
		};
		
	}, [activeId]);

	// Generates the final markdown article 
	return (
		<>
			{toc && 
				<TableOfContents headings={headings} activeId={activeId}/>
			}	
			<h1 className="fixed">{activeId}</h1>
			<article id="article-body">

				< MDXRemote {
					...serializedContent
				}
				components = {
					availableComponentsForMarkdown
				}
				/>
			</article>
		</>
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
	const postFileNames = getPostFiles();
	const slugs = postFileNames.map((fileName) => fileName.replace(/\.mdx$/, ''));
	return {
		paths: slugs.map((slug) => ({ params: { slug } })),
		fallback: false,
	};
};
