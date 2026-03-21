import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SubItem {
  label: string;
  href: string;
}

interface NavItemProps {
  label: string;
  items?: SubItem[];
}

export function NavItem2({ label, items }: NavItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* 트리거 */}
      <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors">
        {label}
      </button>

      {/* 드롭다운 패널 */}
      <AnimatePresence>
        {open && items && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 top-full mt-1 w-48 rounded-xl border border-gray-100 bg-white shadow-lg z-50"
          >
            <ul className="py-2">
              {items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
