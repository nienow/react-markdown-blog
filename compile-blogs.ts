import * as fs from 'fs';
import * as path from 'path';

const showdown = require('showdown');

const rootPath = path.resolve(__dirname);
const converter = new showdown.Converter();

export const compileBlogs = () => {
  const blogNames: string[] = fs.readdirSync('./blogs');
  const blobMeta = [];
  blogNames.forEach(mdFileName => {
    const mdFilePath = path.join(rootPath, 'blogs', mdFileName);
    const blogId = mdFileName.substring(0, mdFileName.length - 3);
    const htmlFileName = blogId + '.html';
    const htmlFilePath = path.join(rootPath, 'public/blogs', htmlFileName);

    const mdStat = fs.statSync(mdFilePath);
    const md = fs.readFileSync(mdFilePath, {encoding: 'utf8'});
    const html = converter.makeHtml(md);
    fs.writeFileSync(htmlFilePath, html, {encoding: 'utf8'});

    blobMeta.push({
      id: blogId,
      title: md.substring(md.indexOf('#') + 2, md.indexOf('\r\n')),
      created: mdStat.ctime,
      size: mdStat.size
    });
  });

  fs.writeFileSync('src/generated/blog-list.json', JSON.stringify(blobMeta), {encoding: 'utf8'});
};

compileBlogs();
