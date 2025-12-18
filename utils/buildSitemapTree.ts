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
      nodes = node.children; // حرکت به سطح بعد
    });
  });

  return root;
}

// export function buildSitemapTree(
//   items: { url: string; title: string | null }[]
// ): TreeNodeType[] {
//   const rootMap = new Map<string, TreeNodeType>();

//   const getOrCreate = (
//     map: Map<string, TreeNodeType>,
//     key: string,
//     title: string,
//     url?: string
//   ): TreeNodeType => {
//     if (!map.has(key)) {
//       map.set(key, { id: key, title, url, children: [] });
//     }
//     return map.get(key)!;
//   };

//   items.forEach((item, index) => {
//     const urlObj = new URL(item.url);
//     const parts = urlObj.pathname.split("/").filter(Boolean);

//     let currentMap = rootMap;
//     let currentNode: TreeNodeType | null = null;

//     parts.forEach((part, level) => {
//       const isLeaf = level === parts.length - 1;

//       const nodeTitle =
//         isLeaf && item.title
//           ? item.title
//           : decodeURIComponent(part).replace(/-/g, " ");

//       const nodeUrl = isLeaf ? item.url : undefined;

//       const node = getOrCreate(
//         currentMap,
//         `${level}-${part}`,
//         nodeTitle,
//         nodeUrl
//       );

//       currentNode = node;

//       // آماده برای سطح بعد
//       currentMap = new Map(node.children.map((child) => [child.id, child]));
//       node.children = Array.from(currentMap.values());
//     });
//   });

//   return Array.from(rootMap.values());
// }
