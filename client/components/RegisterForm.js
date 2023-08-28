import { useState } from "react";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function RegisterForm({ status }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [secPasswordError, setSecPasswordError] = useState(false);

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

        if (email.indexOf("@") === -1) {
            setEmailError("Please provide a valid email.");
            e = +1;
        }

        if (password !== confirmPassword) {
            setSecPasswordError("Passwords do not match.");
            e += 1;
        }

        if (e > 0) return;

        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                username,
            }),
        });
        if (!response.ok) {
            const error = await response.json();
            console.error(error);
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
                        Register
                    </Typography>
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
                            id="email"
                            label="Email Address"
                            name="new-email"
                            autoComplete="email"
                            value={email}
                            color="neutral"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <Typography color="error">{emailError}</Typography>}
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
                        <Button type="submit" fullWidth variant="contained" color="secondary" sx={{ mt: 3 }}>
                            Register
                        </Button>
                        <Box mt={2} sx={{ textAlign: "center" }}>
                            <Link href="/login" passHref>
                                <Typography color="default" variant="body2" underline="hover">
                                    Already have an account? Login here.
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

export default RegisterForm;
