import {useState} from "react";
import {AnimatePresence, motion} from "motion/react";
import {MotionButton} from "@/ui/components/MotionComponent.tsx";
import {useTranslation} from "react-i18next";

interface SubItem {
  label: string;
  onClick: () => void;
}

interface NavItemProps {
  label: string;
  items?: SubItem[];
}

export function NavItem(props: NavItemProps) {
  const [open, setOpen] = useState(false);

  const buttonProps = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/*Trigger*/}
      <MotionButton
        size="lg"
        variant="ghost"
        variants={buttonProps}
        whileHover="hover"
        whileTap="tap"
      >{props.label}</MotionButton>
      {/*Dropdown*/}
      <AnimatePresence>
        {open && props.items && (
          <motion.div
            className="absolute"
          >
            <ul>
              {props.items.map(item => (
                <li>
                  {item.label}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

