"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Button, Link, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export default function RegisterForm() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [secPasswordError, setSecPasswordError] = useState(false);
    const [registerError, setRegisterError] = useState(false);

    const serverBaseUrl = "https://stockfeeler.online:443";

    const handleSubmit = async (event) => {
        event.preventDefault();

        let e = 0;
        if (username.length < 3) {
            setUsernameError("Username should be at least 3 characters long.");
            e += 1;
        }

        if (password.length < 8) {
            setPasswordError("Password should be at least 8 characters long.");
            e += 1;
        }

        if (password !== confirmPassword) {
            setSecPasswordError("Passwords do not match.");
            e += 1;
        }

        if (e > 0) return;

        try {
            const response = await axios.post(`${serverBaseUrl}/auth/register`, {username, password})
            if (response.error) {
                setRegisterError(response.error);
            } else if (response.status === 200) {
                router.push("/");
            }
        } catch (error) {
            setRegisterError(error.response.data.msg);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem 0",
                height: "100vh",
                padding: "0 2rem",
                maxWidth: "500px",
                margin: "0 auto",
            }}
        >
            <Typography variant="h2">Register</Typography>

            {registerError && (
                <Typography variant="body1" color="error">
                    {registerError}
                </Typography>
            )}

            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="new-username"
                    autoComplete="username"
                    value={username}
                    color="neutral"
                    onChange={(e) => setUsername(e.target.value)}
                    autoFocus
                />
                {usernameError && <Typography color="error">{usernameError}</Typography>}

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="new-password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    color="neutral"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <Typography color="error">{passwordError}</Typography>}
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="confirm-password"
                    label="Confirm Password"
                    type="password"
                    id="confirm-password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    color="neutral"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {secPasswordError && <Typography color="error">{secPasswordError}</Typography>}
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                    Register
                </Button>
                <Box mt={3} sx={{ textAlign: "center" }}>
                    <Link
                        href="/login"
                        sx={{
                            textDecorationColor: (theme) => theme.palette.secondary.dark,
                            "&:hover": {
                                textDecorationColor: (theme) => theme.palette.secondary.main,
                            },
                        }}
                    >
                        <Typography variant="body2" color="secondary">
                            Already have an account? Login here.
                        </Typography>
                    </Link>
                </Box>
            </form>

            <Link href="/">
                <Button color="neutral" startIcon={<ArrowBackIcon />} sx={{ marginTop: "1.5rem", alignSelf: "start" }}>
                    Back
                </Button>
            </Link>
        </Box>
    );
}
