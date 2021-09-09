import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import PostHeader from './PostHeader';

export default function PostContent(props) {
  const {
    slug, image, title, content,
  } = props.post;

  const imagePath = `/images/work/${slug}/${image}`;

  // Create custom renderers to optimize images with next/image instead of standard markdown
  const customRenderers = {
    // All markdown (not titles) translated to HTML is treated as paragraph
    // Mitigates how image is rendered as paragraph
    p(paragraph) {
      const { node } = paragraph;
      if (node.children[0].tagName === 'img') {
        const img = node.children[0];

        return (
          <div>
            <Image
              src={`/images/work/${slug}/${img.properties.src}`}
              alt={img.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }
      return <p>{paragraph.children}</p>;
    },
    code(code) {
      const { className, children } = code;
      // className is something like language-js => We need the "js" part here
      const language = className.split('-')[1];

      return (
        <SyntaxHighlighter
          style={atomDark}
          language={language}
          children={children}
        />
      );
    },
  };

  return (
    <article>
      <PostHeader
        title={title}
        image={imagePath}
      />
      <ReactMarkdown
        components={customRenderers}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
