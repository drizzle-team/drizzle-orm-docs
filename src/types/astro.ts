export interface IHeading {
  depth: number;
  slug: string;
  text: string;
}

export interface TreeNode {
  name: string;
  type: string;
  title: string;
  children: TreeNode[];
}
