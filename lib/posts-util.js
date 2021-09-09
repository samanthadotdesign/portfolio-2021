import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

// Gets all file names with extensions included
export const getPostFiles = () => fs.readdirSync(postsDirectory);

export const getPostData = (postIdentifer) => {
  const postSlug = postIdentifer.replace(/\.md$/, '');
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
};

export const getAllPosts = () => {
  // Read content from the directory
  const postFiles = getPostFiles();

  // Map our array of postFiles into an array of PostData objects
  const allPosts = postFiles.map((postFile) => getPostData(postFile));

  return allPosts;
};

export const getFeaturedPosts = () => {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((post) => post.isFeatured);
  return featuredPosts;
};
