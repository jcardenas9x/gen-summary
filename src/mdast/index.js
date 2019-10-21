import unified from 'unified';
import markdown from 'remark-parse';

const returnMDAST = (file) => {
  return unified()
    .use(markdown)
    .parse(file)
};

export default returnMDAST;
