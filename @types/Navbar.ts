import { Folder, FrontMatter } from 'nextra';
import { PageTheme } from 'nextra/normalize-pages';

export type NavBarProps = {
  flatDirectories: Item[];
  items: (PageItem | MenuItem)[];
};

type Display = 'children' | 'normal' | 'hidden';

type Item = (MdxFile | FolderWithoutChildren) & {
  title: string;
  type: string;
  children?: Item[];
  display?: Display;
  withIndexPage?: boolean;
  theme?: PageTheme;
  isUnderCurrentDocsTree?: boolean;
};

type FolderWithoutChildren = Omit<Folder, 'children'>;

type PageItem = (MdxFile | FolderWithoutChildren) & {
  title: string;
  type: string;
  href?: string;
  newWindow?: boolean;
  children?: PageItem[];
  firstChildRoute?: string;
  display?: Display;
  withIndexPage?: boolean;
  isUnderCurrentDocsTree?: boolean;
};

type MenuItem = (MdxFile | FolderWithoutChildren) & {
  children?: PageItem[];
};

type MdxFile<FrontMatterType = FrontMatter> = {
  kind: 'MdxPage';
  name: string;
  route: string;
  locale?: string;
  frontMatter?: FrontMatterType;
};
