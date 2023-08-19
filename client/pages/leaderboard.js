import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SFHeader from "../components/SFHeader";
import UsersApi from "../utils/apis/UsersApi";
import { Box, Container, Typography } from "@mui/material";
import authHandler from "../utils/auth/authHandler";
import LoadingCircle from "../components/LoadingCircle";
import Image from "next/image";

function Leaderboard() {
    const { data, status } = useSession();
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);

    const trophyMapping = {
        0: "/trophies/gold.svg",
        1: "/trophies/silver.svg",
        2: "/trophies/bronze.svg",
    };

    useEffect(() => {
        async function getUsers() {
            setLoadingUsers(true);
            try {
                if (data) {
                    const usersResponse = await UsersApi.getUsersForLeaderboard(data.user.token);
                    setUsers(usersResponse);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingUsers(false);
            }
        }

        getUsers();
    }, [data]);

    if (status === "authenticated") {
        return (
            <>
                <SFHeader loggedIn={true} />
                <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "4rem", gap: "2rem 0" }}>
                    <Typography variant="h3">Leaderboard</Typography>
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
                                            width: "200px",
                                            position: "relative",
                                            left: i >= 3 ? "20px" : "0",
                                        }}
                                    >
                                        <Box sx={{ display: "flex", alignItems: "baseline", gap: "0 1rem" }}>
                                            <Typography variant="h6" color="neutral.main">
                                                {i + 1}
                                            </Typography>
                                            <Typography variant="h5">{user.username}</Typography>
                                        </Box>
                                        <Typography variant="h6" color="neutral.main">
                                            {user.rankedScore}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Container>
            </>
        );
    }

    return null;
}

export default authHandler(Leaderboard);
