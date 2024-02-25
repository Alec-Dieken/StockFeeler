"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box, Typography, Button, Link, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function LoginForm() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signIn("credentials", {
                redirect: false,
                username,
                password,
            });
            if (response.error) {
                setLoginError("Invalid username/password.");
            } else if (response.ok) {
                
                router.push("/predict");
            }
        } catch (error) {
            setLoginError(error.message);
        }
    };

    return (
        <Box
            sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem 0", height: "100vh", padding: "0 2rem", maxWidth: "500px", margin: "0 auto" }}
        >
            <Typography variant="h2">Login</Typography>

            {loginError && <Typography variant="body1" color="error">{loginError}</Typography>}

            <form onSubmit={handleSubmit} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    color="primary"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                    Login
                </Button>

                <Box mt={3} sx={{ textAlign: "center" }}>
                    <Link href="/register" sx={{
                                textDecorationColor: (theme) => theme.palette.secondary.dark,
                                "&:hover": {
                                    textDecorationColor: (theme) => theme.palette.secondary.main,
                                },
                            }}>
                        <Typography variant="body2" color="secondary">
                            Need an account? Register here.
                        </Typography>
                    </Link>
                </Box>
            </form>

            <Link href="/">
                <Button color="neutral" startIcon={<ArrowBackIcon />} sx={{ marginTop: "1.5rem", alignSelf: "start"}}>
                    Back
                </Button>
            </Link>
        </Box>
    );
}
