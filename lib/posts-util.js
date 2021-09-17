import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const postsDirectory = path.join(process.cwd(), 'posts');

// Gets all file names with extensions included
export const getPostFiles = () => {
	return fs.readdirSync(postsDirectory);
};

export const getPostData = async (postIdentifer) => {
	const postSlug = postIdentifer.replace(/\.mdx$/, '');
	const filePath = path.join(postsDirectory, `${postSlug}.mdx`);

	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const { data, content } = matter(fileContent);

	const mdxSource = await serialize(content, { scope: data });
	console.log('****** MDX SOURCE *****');
	console.log(mdxSource);
  
	return { mdxSource, frontMatter: data};
};

export const getAllPosts = async () => {
	// Read content from the directory
	const postFiles = getPostFiles();

	// Map our array of postFiles into an array of PostData objects
	//const allPosts = postFiles.map((postFile) => getPostData(postFile));

	const allPosts = await postFiles.reduce(async(accumulator,current) => {
		return [...accumulator, await getPostData(current)];
	},[]);
	return allPosts;
};

export const getFeaturedPosts = async () => {
	const allPosts = await getAllPosts();
	const featuredPosts = allPosts.filter((post) => post.frontMatter.isFeatured);
	return featuredPosts;
};
