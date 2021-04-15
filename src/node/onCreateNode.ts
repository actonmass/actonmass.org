const COLLECTIONS = ["legislators", "districts"];

export default function onCreateNode({
  node,
  createContentDigest,
  getNode,
  actions,
}) {
  const { createNode } = actions;

  if (node.internal.type !== `MarkdownRemark`) {
    return null;
  }

  const parent = getNode(node.parent);
  const [collection, fileName] = parent.relativePath.split("/");

  if (COLLECTIONS.includes(collection)) {
    const fields = node.frontmatter;
    const baseName = fileName.replace(/\.md$/, "");
    createNode({
      ...fields,
      id: fields.aom_id,
      fileName: baseName,
      href: `/${collection}/${baseName}/`, // TODO: use type-level resolver ?
      parent: null,
      children: [],
      internal: {
        type: collection,
        contentDigest: createContentDigest(fields),
      },
    });
  }
}
