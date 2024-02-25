"use client";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#00915d",
        },
        secondary: {
            main: "#1783cf",
            dark: "#3ba6f173",
        },
        neutral: {
            light: "white",
            main: "#b3bac7",
            dark: "#7f8899",
            contrastText: "#0b0e18"
        },
        error: {
            main: "#cd4c4c",
        },
    },
    typography: {
        h1: {
            fontSize: "4rem",
            fontWeight: "400",
            color: "white",
            textShadow: "0px 0px 15px #d1eaff3d",
            "@media (max-width:500px)": {
                fontSize: "3rem",
            },
        },
        h2: {
            color: "white",
            fontSize: "2rem",
        },
        h3: {
            fontSize: "2rem",
        },
        h4: {
            fontSize: "1.5rem",
        },
        body1: {
          color: "#7f8899",
        },
        body2: {
            color: "#dbe0e7",
            fontSize: "1.1rem"
          }
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    input: {
                        color: "#a1aab9", // Input text color
                    },
                    label: {
                        color: "#a1aab9", // Label color
                        // When the input is focused, change label color
                        "&.Mui-focused": {
                            color: "#a1aab9",
                        },
                    },
                    button: {
                        backgroundColor: "#00915d",
                    },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "white", // Border color
                        },
                        "&:hover fieldset": {
                            borderColor: "white", // Hover border color
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "white", // Focused border color
                        },
                    },
                    "& input:-webkit-autofill": {
                        WebkitBoxShadow: "0 0 0 100px #121520 inset",
                        WebkitTextFillColor: "#a1aab9",
                    },
                    "& input:-webkit-autofill:focus": {
                        WebkitBoxShadow: "0 0 0 100px #121520 inset",
                        WebkitTextFillColor: "#a1aab9",
                    },
                    "& input:-moz-autofill": {
                        // Styles for Firefox autofill
                    },
                    "& input:-moz-autofill:focus": {
                        // Styles for Firefox autofill focus
                    },
                },
                MuiButton: {
                    styleOverrides: {
                        // Additional button styles if needed
                    },
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
              root: {  
                color: "#7f8899",
                borderColor: "#7f889938",
                '&.Mui-selected': {
                },
                '&:hover': {
                    backgroundColor: "rgb(69 73 83 / 12%)",
                }
              },
            },
          },
    },
});
