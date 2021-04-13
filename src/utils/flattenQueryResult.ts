type Result<T> = {
  allMarkdownRemark: {
    nodes: {
      frontmatter: T;
    }[];
  };
};

export default function flattenQueryResult<T>(result: Result<T>) {
  console.log({ result });
  return result.allMarkdownRemark.nodes.map(
    (issueNode) => issueNode.frontmatter
  );
}
