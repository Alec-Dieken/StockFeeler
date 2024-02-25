"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import UsersApi from "../apis/UsersApi";
import { Box, Container, Typography } from "@mui/material";
import LoadingCircle from "../components/LoadingCircle";
import Image from "next/image";

export default function Leaderboard() {
    const { data: session, status } = useSession();
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);

    const trophyMapping = {
        0: "/trophies/gold.svg",
        1: "/trophies/silver.svg",
        2: "/trophies/bronze.svg",
    };

    useEffect(() => {
        async function getUsers() {
            setLoadingUsers(true);
            try {
                if (session?.user?.token) {
                    const usersResponse = await UsersApi.getUsersForLeaderboard(session.user.token);
                    setUsers(usersResponse);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingUsers(false);
            }
        }

        getUsers();
    }, [status]);

    if (status === "loading") return;

    if (status === "authenticated") {
        return (
            <main>
                <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "4rem", gap: "2rem 0" }}>
                    <Typography variant="h3" color="neutral.light">
                        Leaderboard
                    </Typography>

                    {loadingUsers ? (
                        <LoadingCircle />
                    ) : (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}>
                            {users.map((user, i) => (
                                <Box key={i} sx={{ display: "flex" }}>
                                    <Box>
                                        {trophyMapping.hasOwnProperty(i) && (
                                            <Box sx={{ position: "relative", left: "-15px", top: "2px" }}>
                                                <Image alt="trophy" src={trophyMapping[i]} width={20} height={20}></Image>
                                            </Box>
                                        )}
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "baseline",
                                            justifyContent: "space-between",
                                            width: "280px",
                                            position: "relative",
                                            left: i >= 3 ? "20px" : "0",
                                        }}
                                    >
                                        <Box sx={{ display: "flex", alignItems: "baseline", gap: "0 1rem" }}>
                                            <Typography variant="body1" color="neutral.main">
                                                {i + 1}.
                                            </Typography>
                                            <Typography variant="body1">{user.username}</Typography>
                                        </Box>
                                        <Typography variant="body2" color="neutral.main">
                                            {user.rankedScore.toFixed(2)}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Container>
            </main>
        );
    }
}
