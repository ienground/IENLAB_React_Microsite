import {useTheme} from "@heroui/use-theme";
import {MoonIcon, SunIcon} from "@phosphor-icons/react";
import {Button} from "@heroui/react";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Button isIconOnly aria-label="dark-mode" variant="light" onPress={() => setTheme(theme === "light" ? "dark" : "light")} radius="full">
      {
        theme === "light" ?
        <SunIcon size={24} weight="fill" />
          : <MoonIcon size={24} weight="fill" />
      }

    </Button>
    // <div>
    //   The current theme is: {theme}
    //   <button onClick={() => setTheme('light')}>Light Mode</button>
    //   <button onClick={() => setTheme('dark')}>Dark Mode</button>
    // </div>
  )
};