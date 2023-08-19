import { SessionProvider } from "next-auth/react";
import { ColorModeContext, useMode } from "../styles/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { UserProvider } from "../utils/UserContext";
import "../styles/global.css";

function StockFeeler({ Component, pageProps }) {
    const [theme, colorMode] = useMode();

    return (
        <SessionProvider session={pageProps.session}>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <UserProvider>
                        <Component {...pageProps} />
                    </UserProvider>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </SessionProvider>
    );
}

export default StockFeeler;
