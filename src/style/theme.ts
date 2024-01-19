import {alpha, createTheme, getContrastRatio} from "@mui/material";

const pinkBase = '#FF4081';
const violetBase = '#7C4DFF';

const theme = createTheme({
    components: {
        MuiIcon: {
            defaultProps: {
                baseClassName: 'material-icons-round',
            },
        },
    },
    palette: {
        primary: {
            main: alpha(pinkBase, 0.7),
            light: alpha(pinkBase, 0.5),
            dark: alpha(pinkBase, 0.9),
            contrastText: getContrastRatio(alpha(pinkBase, 0.7), '#fff') > 4.5 ? '#fff' : '#111',
        },
        secondary: {
            main: alpha(violetBase, 0.7),
            light: alpha(violetBase, 0.5),
            dark: alpha(violetBase, 0.9),
            contrastText: getContrastRatio(alpha(violetBase, 0.7), '#fff') > 4.5 ? '#fff' : '#111',
        },
        error: {
            main: '#d32f2f',
            light: '#ef5350',
            dark: '#c62828',
            contrastText: '#ffffff',
        },
        warning: {
            main: '#ed6c02',
            light: '#ff9800',
            dark: '#e65100',
            contrastText: '#ffffff',
        },
        info: {
            main: '#0288d1',
            light: '#03a9f4',
            dark: '#01579b',
            contrastText: '#ffffff',
        },
        success: {
            main: '#2e7d32',
            light: '#4caf50',
            dark: '#1b5e20',
            contrastText: '#ffffff',
        },
    }
})

export default theme;
