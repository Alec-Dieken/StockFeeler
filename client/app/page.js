"use client";

// import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Container, Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
    const router = useRouter();
    const { data: session, status } = useSession();

    if (status === "loading") {
        return;
    }

    if (session) {
        router.push("/predict");
    } else {
        return (
            <Container sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap:"0.5rem 0", height: "100vh", padding: "0 2rem"}}>
                
                    <Typography variant="h1">StockFeeler</Typography>
                    <Typography variant="body1" sx={{textAlign: "center"}}>Enhance your stock trading decision making. Join our community now.</Typography>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0 2rem",
                            marginTop: "2.5rem",
                        }}
                    >
                        <Link href="/login" passHref>
                            <Button variant="contained">Login</Button>
                        </Link>
                        <Link href="/register" passHref>
                            <Button variant="outlined">Sign Up</Button>
                        </Link>
                    </Box>

            </Container>
        );
    }
}
