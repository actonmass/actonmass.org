type Result<T> = {
  allMarkdownRemark: {
    nodes: {
      frontmatter: T;
    }[];
  };
};

export default function flattenQueryResult<T>(result: Result<T>) {
  return result.allMarkdownRemark.nodes.map(
    (issueNode) => issueNode.frontmatter
  );
}
