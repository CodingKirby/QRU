// 네비게이션 아이템
export type SubItem = {
  title: string;
  link: string;
};

export type Navigation = {
  title: string;
  link: string;
  subItems?: SubItem[];
};
