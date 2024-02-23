import {alpha, createTheme, getContrastRatio} from "@mui/material";

// const pinkBase = "#FF4081";
// const violetBase = "#7C4DFF";

const deviceSizes = {
    mobile: 500,
    tablet: 768,
    laptop: 1280,
    pc: 1440
};

const brand = {
    pink: "#FF4081",
    purple: "#7C4DFF",
    skyblue: "#03A9F4",
    blue: "#3F51B5"
}
const common = {
    darkBlue: "#11171a"
}

const device = {
    mobile: `screen and (max-width: ${deviceSizes.mobile}px)`,
    tablet: `screen and (max-width: ${deviceSizes.tablet}px)`,
    laptop: `screen and (max-width: ${deviceSizes.laptop}px)`,
    pc: `screen and (max-width: calc(${deviceSizes.pc}px + 2rem))`,
};

export const light = {
    name: "light",
    colors: {
        colorPrimary: "#FF4081",
        colorOnPrimary: "#FFFFFF",
        colorPrimaryContainer: "#ffd9df",
        colorOnPrimaryContainer: "#3f0018",
        colorSecondary: "#7C4DFF",
        colorOnSecondary: "#ffffff",
        colorSecondaryContainer: "#e8deff",
        colorOnSecondaryContainer: "#20005f",
        colorTertiary: "#03A9F4",
        colorOnTertiary: "#FFFFFF",
        colorTertiaryContainer: "#cae6ff",
        colorOnTertiaryContainer: "#001e30",
        colorError: "#ba1a1a",
        colorOnError: "#ffffff",
        colorErrorContainer: "#ffdad6",
        colorOnErrorContainer: "#410002",
        colorSurface: "#f0f0f0",
        colorOnSurface: "#202020",
        colorOutline: "#847375",
        colorSurfaceVariant: "#dddddd",
        colorOnSurfaceVariant: "#777777",
        colorRed: "#d44c47",
        brand, common
    },
    device
};

export const dark = {
    name: "dark",
    colors: {
        colorPrimary: "#ffb1c1",
        colorOnPrimary: "#66002a",
        colorPrimaryContainer: "#8f003f",
        colorOnPrimaryContainer: "#ffd9df",
        colorSecondary: "#cdbdff",
        colorOnSecondary: "#370096",
        colorSecondaryContainer: "#4f00d0",
        colorOnSecondaryContainer: "#e8deff",
        colorTertiary: "#8dcdff",
        colorOnTertiary: "#00344f",
        colorTertiaryContainer: "#004b70",
        colorOnTertiaryContainer: "#cae6ff",
        colorError: "#ffb4ab",
        colorOnError: "#690005",
        colorErrorContainer: "#93000a",
        colorOnErrorContainer: "#ffdad6",
        colorSurface: "#202020",
        colorOnSurface: "#e0e0e0",
        colorOutline: "#9e8c8f",
        colorSurfaceVariant: "#2a2a2a",
        colorOnSurfaceVariant: "#a0a0a0",
        colorRed: "#e05355",
        brand, common
    },
    device
}

// // @ts-ignore
// export const mTheme = createTheme({
//   components: {
//       MuiIcon: {
//           defaultProps: {
//               baseClassName: 'material-icons-round',
//           },
//       },
//   },
//   palette: {
//       primary: {
//           main: alpha(pinkBase, 0.7),
//           light: alpha(pinkBase, 0.5),
//           dark: alpha(pinkBase, 0.9),
//           contrastText: getContrastRatio(alpha(pinkBase, 0.7), '#fff') > 4.5 ? '#fff' : '#111',
//       },
//       secondary: {
//           main: alpha(violetBase, 0.7),
//           light: alpha(violetBase, 0.5),
//           dark: alpha(violetBase, 0.9),
//           contrastText: getContrastRatio(alpha(violetBase, 0.7), '#fff') > 4.5 ? '#fff' : '#111',
//       },
//       error: {
//           main: '#d32f2f',
//           light: '#ef5350',
//           dark: '#c62828',
//           contrastText: '#ffffff',
//       },
//       warning: {
//           main: '#ed6c02',
//           light: '#ff9800',
//           dark: '#e65100',
//           contrastText: '#ffffff',
//       },
//       info: {
//           main: '#0288d1',
//           light: '#03a9f4',
//           dark: '#01579b',
//           contrastText: '#ffffff',
//       },
//       success: {
//           main: '#2e7d32',
//           light: '#4caf50',
//           dark: '#1b5e20',
//           contrastText: '#ffffff',
//       },
//   },
//     colors: {
//
//     }
// })
