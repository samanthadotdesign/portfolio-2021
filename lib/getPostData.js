import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkToc from 'remark-toc';
import remarkPrism from 'remark-prism';
import remarkHtml from 'remark-html';
import remarkSlug from 'remark-slug';

const postsDirectory = path.join(process.cwd(), 'posts');

/**
 * @returns All file names with extensions included
 */
export const getPostFiles = () => {
	return fs.readdirSync(postsDirectory);
};

/**
 * @param postIdentifer Name of the .mdx file in posts folder
 * @returns Markdown data for a single post 
 */
export const getPostData = async (postIdentifer) => {
	const postSlug = postIdentifer.replace(/\.mdx$/, '');
	const filePath = path.join(postsDirectory, `${postSlug}.mdx`);
	const mediaPath = path.join(`public/images/work/${postSlug}/`);
	
	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const { data, content } = matter(fileContent);
	const mdxSource = await serialize(content, {
		scope: data,
		mdxOptions: {
			remarkPlugins: [
				remarkSlug
				// [remarkToc, {}],
				// [remarkPrism,{ showSpotlight: true }],
				// [remarkHtml,{}]
			],
		},
	});

	return { mdxSource, frontMatter: data, slug:postSlug};
};

/**
 * @returns Data from all posts
 */
export const getAllPosts = async () => {
	
	// Read content from the directory
	const postFiles = getPostFiles();

	// Map our array of postFiles into an array of PostData objects
	// await all Promises to be resolved (map always returns an array of promises)
	const allPosts = Promise.all(postFiles.map(async(current) => {
		const itemToAdd = await getPostData(current);
		return itemToAdd;
	}));
	console.log('*** GET ALL POSTS ***');
	console.log(allPosts);
	return allPosts;
};

/**
 * @returns Data from all featured posts
 */
export const getFeaturedPosts = async () => {
	const allPosts = await getAllPosts();
	const featuredPosts = allPosts.filter((post) => post.frontMatter.isFeatured);
	return featuredPosts;
};
