import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material";

// color design tokens
export const tokens = (mode) => ({
    ...(mode === "dark"
        ? {
              grey: {
                  100: "#e7eaec",
                  200: "#cfd5d9",
                  300: "#b6c0c5",
                  400: "#9eabb2",
                  500: "#86969f",
                  600: "#6b787f",
                  700: "#505a5f",
                  800: "#363c40",
                  900: "#1b1e20",
              },
              primary: {
                  100: "#d0d0d2",
                  200: "#a0a1a6",
                  300: "#717379",
                  400: "#181d2b",
                  500: "#121520",
                  600: "#0e111a",
                  700: "#0b0d13",
                  800: "#07080d",
                  900: "#040406",
              },
              greenAccent: {
                  100: "#d3ebe4",
                  200: "#a6d6c8",
                  300: "#7ac2ad",
                  400: "#4dad91",
                  500: "#219976",
                  600: "#1a7a5e",
                  700: "#145c47",
                  800: "#0d3d2f",
                  900: "#071f18",
              },
              redAccent: {
                  100: "#f1d4d8",
                  200: "#e4a8b1",
                  300: "#d67d89",
                  400: "#c95162",
                  500: "#bb263b",
                  600: "#961e2f",
                  700: "#701723",
                  800: "#4b0f18",
                  900: "#25080c",
              },
              purpleAccent: {
                  100: "#f2d8f7",
                  200: "#e5b1ef",
                  300: "#d98ae6",
                  400: "#cc63de",
                  500: "#bf3cd6",
                  600: "#9930ab",
                  700: "#732480",
                  800: "#4c1856",
                  900: "#260c2b",
              },
          }
        : {
              grey: {
                  100: "#1b1e20",
                  200: "#363c40",
                  300: "#505a5f",
                  400: "#6b787f",
                  500: "#86969f",
                  600: "#9eabb2",
                  700: "#b6c0c5",
                  800: "#cfd5d9",
                  900: "#e7eaec",
              },
              primary: {
                  100: "#040406",
                  200: "#07080d",
                  300: "#0b0d13",
                  400: "#0e111a",
                  500: "#121520",
                  600: "#41444d",
                  700: "#717379",
                  800: "#a0a1a6",
                  900: "#d0d0d2",
              },
              greenAccent: {
                  100: "#071f18",
                  200: "#0d3d2f",
                  300: "#145c47",
                  400: "#1a7a5e",
                  500: "#219976",
                  600: "#4dad91",
                  700: "#7ac2ad",
                  800: "#a6d6c8",
                  900: "#d3ebe4",
              },
              redAccent: {
                  100: "#25080c",
                  200: "#4b0f18",
                  300: "#701723",
                  400: "#961e2f",
                  500: "#bb263b",
                  600: "#c95162",
                  700: "#d67d89",
                  800: "#e4a8b1",
                  900: "#f1d4d8",
              },
              purpleAccent: {
                  100: "#260c2b",
                  200: "#4c1856",
                  300: "#732480",
                  400: "#9930ab",
                  500: "#bf3cd6",
                  600: "#cc63de",
                  700: "#d98ae6",
                  800: "#e5b1ef",
                  900: "#f2d8f7",
              },
          }),
});

// mui theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                      primary: {
                          main: colors.primary[500],
                      },
                      secondary: {
                          main: colors.greenAccent[500],
                      },
                      neutral: {
                          dark: colors.grey[700],
                          main: colors.grey[400],
                          light: colors.grey[100],
                      },
                      background: {
                          default: colors.primary[500],
                      },
                  }
                : {
                      primary: {
                          main: colors.primary[100],
                      },
                      secondary: {
                          main: colors.greenAccent[500],
                      },
                      neutral: {
                          dark: colors.grey[700],
                          main: colors.grey[500],
                          light: colors.grey[100],
                      },
                      background: {
                          default: "#fcfcfc",
                      },
                  }),
        },
        typography: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};

// context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => {},
});

export const useMode = () => {
    const [mode, setMode] = useState("dark");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [theme, colorMode];
};
