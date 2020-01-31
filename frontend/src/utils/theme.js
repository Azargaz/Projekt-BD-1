import { createMuiTheme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme();

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
        styles: {
            header: {
                margin: defaultTheme.spacing(2)
            },
            form: {
                marginTop: defaultTheme.spacing(1)
            },
            button: {
                marginRight: defaultTheme.spacing(2),
                marginTop: defaultTheme.spacing(3)
            },
            title: {
                flexGrow: 1,
            }
        },
        overrides: {
            MuiTooltip: {
                tooltip: {
                    fontSize: "1em",
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.9)"
                }
            }
        }
    })
};