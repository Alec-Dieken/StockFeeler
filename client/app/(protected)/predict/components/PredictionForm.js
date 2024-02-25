import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material"

export default function PredictionForm({ submitPrediction }) {
    const [dollars, setDollars] = useState("");
    const [cents, setCents] = useState("");
    const [formError, setFormError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (dollars.length === 0 || cents.length === 0) {
            setFormError("Please fill out both fields");
        } else {
            const dollarsValue = Number(dollars);
            const centsValue = cents ? Number(cents) / 100 : 0;
            const prediction = dollarsValue + centsValue;
            submitPrediction(prediction);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "0 0.5rem", padding: "1rem" }}>
                    <Typography variant="body1">$</Typography>

                    <TextField
                        label="Dollars"
                        type="text"
                        id="dollars"
                        value={dollars}
                        inputMode="numeric"
                        InputProps={{
                            autoComplete: "off",
                        }}
                        onKeyDown={(e) => {
                            if (e.key === ".") {
                                e.preventDefault();

                                const focusableElements = Array.from(
                                    document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
                                );
                                const currentFocusIndex = focusableElements.findIndex((el) => el === document.activeElement);

                                let nextFocusIndex = currentFocusIndex + 1;
                                if (nextFocusIndex >= focusableElements.length) {
                                    nextFocusIndex = 0;
                                }

                                focusableElements[nextFocusIndex].focus();

                                if (dollars.length === 0) {
                                    setDollars("0");
                                }
                            }
                        }}
                        onChange={(e) => {
                            const charcode = e.nativeEvent.data && e.nativeEvent.data.charCodeAt(0);

                            if (dollars.length < 4 && charcode >= 48 && charcode <= 57) {
                                setDollars(e.target.value);
                            } else if (dollars.length === 4 && charcode >= 48 && charcode <= 57) {
                                if (e.target.value.length <= 4) {
                                    setDollars(e.target.value);
                                }
                            } else if (e.nativeEvent.inputType === "deleteContentBackward" || e.nativeEvent.inputType === "deleteContentForward") {
                                setDollars(e.target.value);
                            }
                        }}
                        color="neutral"
                        sx={{
                            width: "75px",
                            "& input": { textAlign: "right", padding: "14px 14px" },
                            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                WebkitAppearance: "none",
                                margin: 0,
                            },
                            "& input[type='number']": {
                                MozAppearance: "textfield",
                            },
                        }}
                    />
                    <Typography variant="body1">.</Typography>

                    <TextField
                        label="Cents"
                        type="text"
                        id="cents"
                        value={cents}
                        inputMode="numeric"
                        InputProps={{
                            autoComplete: "off",
                        }}
                        onKeyDown={(e) => {
                            if (e.key === ".") {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => {
                            const charcode = e.nativeEvent.data && e.nativeEvent.data.charCodeAt(0);

                            if (cents.length < 2 && charcode >= 48 && charcode <= 57) {
                                setCents(e.target.value);
                            } else if (cents.length === 2 && charcode >= 48 && charcode <= 57) {
                                if (e.target.value.length <= 2) {
                                    setCents(e.target.value);
                                }
                            } else if (e.nativeEvent.inputType === "deleteContentBackward" || e.nativeEvent.inputType === "deleteContentForward") {
                                setCents(e.target.value);
                            }
                        }}
                        color="neutral"
                        sx={{
                            width: "60px",
                            "& input": { padding: "14px 14px" },
                            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                WebkitAppearance: "none",
                                margin: 0,
                            },
                            "& input[type='number']": {
                                MozAppearance: "textfield",
                            },
                        }}
                    />

                    <Button variant="contained" type="submit" sx={{ padding: "0.5rem 1rem", marginLeft: "1rem" }} color="primary">
                        Submit
                    </Button>
                </Box>
            </form>
            {formError && (
                <Typography variant="h6" sx={{ color: "crimson" }}>
                    {formError}
                </Typography>
            )}
        </>
    );
}
