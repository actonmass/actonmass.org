import collections from './collections';

export default function onCreateNode({ node, createContentDigest, getNode, actions }) {
  const { createNode } = actions;

  if (node.internal.type !== `Mdx`) {
    return null;
  }

  const parent = getNode(node.parent);
  const [collectionPath, fileName] = parent.relativePath.split("/");

  if (collectionPath in collections) {
    const collection = collections[collectionPath];
    const fields = node.frontmatter;
    const baseName = fileName.replace(/\.md$/, "");
    const aom_id = fields.aom_id ?? baseName;
    const rawItem = {
      ...fields,
      id: aom_id,
      fileName: baseName,
      href: `/${collectionPath}/${aom_id}/`,
      parent: node.id,
      children: [],
      internal: {
        type: collection.name,
        contentDigest: createContentDigest(fields),
      },
    };

    createNode(collection.process(rawItem));
  }
}
