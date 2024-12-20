import { Navigation } from "../models/navigation.model";

export const NAVIGATION: Navigation[] = [
  {
    title: "서비스 소개",
    link: "/about",
    subItems: [
      {
        title: "어떤 서비스인가요?",
        link: "/about",
      },
      {
        title: "어떻게 사용하나요?",
        link: "/about",
      },
    ],
  },
  { title: "명함 찾기", link: "/cards/shuffle" },
];
