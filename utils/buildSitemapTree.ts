import { TreeNodeType } from "@/types/common";
export function buildSitemapTree(
  items: { url: string; title: string | null }[]
): TreeNodeType[] {
  const root: TreeNodeType[] = [];

  const findOrCreate = (
    nodes: TreeNodeType[],
    id: string,
    title: string,
    url?: string
  ): TreeNodeType => {
    let node = nodes.find((n) => n.id === id);
    if (!node) {
      node = { id, title, url, children: [] };
      nodes.push(node);
    }
    return node;
  };

  items.forEach((item) => {
    const parts = new URL(item.url).pathname.split("/").filter(Boolean);
    let nodes = root;

    parts.forEach((part, level) => {
      const isLeaf = level === parts.length - 1;
      const id = `${level}-${part}`;
      const title =
        isLeaf && item.title
          ? item.title
          : decodeURIComponent(part).replace(/-/g, " ");
      const url = isLeaf ? item.url : undefined;

      const node = findOrCreate(nodes, id, title, url);
      nodes = node.children; 
    });
  });

  return root;
}

