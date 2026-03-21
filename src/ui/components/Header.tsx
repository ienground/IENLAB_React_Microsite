// components/Header.tsx
import { NavItem2 } from "./NavItem2.tsx";

const NAV_ITEMS = [
  {
    label: "제품",
    items: [
      { label: "기능 소개", href: "/features" },
      { label: "가격 정책", href: "/pricing" },
      { label: "로드맵", href: "/roadmap" },
    ],
  },
  {
    label: "회사",
    items: [
      { label: "소개", href: "/about" },
      { label: "채용", href: "/careers" },
    ],
  },
  { label: "블로그", items: undefined },
];

export function Header() {
  return (
    <header className="flex items-center px-8 py-4 border-b bg-white">
      <span className="font-bold text-lg mr-8">Logo</span>
      <nav className="flex items-center gap-1">
        {NAV_ITEMS.map((item) => (
          <NavItem2 key={item.label} label={item.label} items={item.items} />
        ))}
      </nav>
    </header>
  );
}
