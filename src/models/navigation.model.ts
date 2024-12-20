// 네비게이션 아이템
export interface Navigation {
  title: string;
  link: string;
  subItems?: {
    title: string;
    link: string;
  }[];
}
