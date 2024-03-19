import collections from "./collections";

export default function onCreateNode({ node, createContentDigest, getNode, actions }) {
  const { createNode } = actions;

  if (node.internal.type !== `Mdx`) {
    return null;
  }

  const parent = getNode(node.parent);
  const [collectionPath, fileName] = parent.relativePath.split("/");

  if (collectionPath in collections) {
    const collection = collections[collectionPath];
    const contentFilePath = node.internal.contentFilePath;
    const fields = node.frontmatter;
    const baseName = fileName.replace(/\.md$/, "");
    const rawItem = {
      ...fields,
      id: fields.aom_id ?? baseName,
      fileName: baseName,
      href: `/${collectionPath}/${baseName}/`,
      parent: node.id,
      children: [],
      path: contentFilePath,
      internal: {
        type: collection.name,
        contentDigest: createContentDigest(fields),
      },
    };

    createNode(collection.process(rawItem));
  }
}
