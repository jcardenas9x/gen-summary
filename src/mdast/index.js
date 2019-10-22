import unified from 'unified';
import markdown from 'remark-parse';

const returnMDAST = (file) => {
  return unified()
    .use(markdown, { commonmark: true })
    .parse(file)
};

export default returnMDAST;
