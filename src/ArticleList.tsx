import React from 'react';

import blogs from 'generated/blog-list.json';

const ArticleSummary = ({blog}) => {
  const url = `article/${blog.id}`;
  return <div><a href={url}>{blog.title}</a></div>;
};

const ArticleList = () => {
  return (
    <div>
      <h1>Article List</h1>
      <div>
        {
          blogs.map(blog => <ArticleSummary blog={blog}/>)
        }
      </div>
    </div>
  );
}

export default ArticleList
