import * as fs from 'fs';
import * as path from 'path';
const showdown  = require('showdown');

const rootPath = path.resolve(__dirname);
const converter = new showdown.Converter();

export const compileBlogs = () => {
  const blogNames: string[] = fs.readdirSync('./blogs');
  blogNames.forEach(mdFileName => {
    const mdFilePath = path.join(rootPath, 'blogs', mdFileName);
    const htmlFileName = mdFileName.substring(0, mdFileName.length-3) + '.html';
    const htmlFilePath = path.join(rootPath, 'public/blogs', htmlFileName);

    const mdStat = fs.statSync(mdFilePath);
    mdStat.size // size to estimate time to read

    const htmlStat = fs.statSync(htmlFilePath);
    if (!htmlStat.isFile()) {
      // new file
    }

    const md = fs.readFileSync(mdFilePath, {encoding: 'utf8'});
    const html = converter.makeHtml(md);
    fs.writeFileSync(htmlFilePath, html, {encoding: 'utf8'});
  });
};

compileBlogs();
