import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function LoginForm({ status }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });
        if (response.error) {
            setLoginError("Invalid username/password.");
        } else {
            window.location.href = "/";
        }
    };

    if (status === "unauthenticated") {
        return (
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    {loginError && <Typography color="error">{loginError}</Typography>}
                    <form onSubmit={handleSubmit} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            color="neutral"
                            onChange={(e) => setEmail(e.target.value)}
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
                            color="neutral"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" fullWidth variant="contained" color="secondary" sx={{ mt: 3 }}>
                            Login
                        </Button>
                        <Box mt={2} sx={{ textAlign: "center" }}>
                            <Link href="/register" passHref>
                                <Typography color="default" variant="body2" underline="hover">
                                    Need an account? Register here.
                                </Typography>
                            </Link>
                        </Box>
                    </form>
                    <Link href="/" passHref>
                        <Button color="neutral" startIcon={<ArrowBackIcon />} sx={{ marginTop: "2rem", alignSelf: "start", mb: 2 }}>
                            Back
                        </Button>
                    </Link>
                </Box>
            </Container>
        );
    }
}

export default LoginForm;
