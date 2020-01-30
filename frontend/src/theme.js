import { createMuiTheme } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';

export default (darkMode) => {
    return createMuiTheme({
        palette: {
            primary: {
                light: '#48a999',
                main: '#00796b',
                dark: '#004c40',
                contrastText: '#fff',
            },
            secondary: {
                light: '#ff77a9',
                main: '#ec407a',
                dark: '#b4004e',
                contrastText: '#000',
            },
            type: darkMode ? 'dark' : 'light',
        },
    })
};