"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import HistoryItem from "./components/HistoryItem";
import VotesApi from "../apis/VotesApi";
import { Container, Box, Typography, ToggleButtonGroup, ToggleButton, Button } from "@mui/material";
import LoadingCircle from "../components/LoadingCircle";

export default function History() {
    const { data: session, status } = useSession();
    const [votesData, setVotesData] = useState([]);
    const [loadingVotes, setLoadingVotes] = useState(true);
    const [alignment, setAlignment] = useState("all");
    const [page, setPage] = useState(1);

    const loadVotes = async () => {
        setLoadingVotes(true);
        try {
            const votes = await VotesApi.getVotes(session.user.id, session.user.token, page, 8);
            setVotesData((prevVotes) => [...prevVotes, ...votes]);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error("Failed to get votes:", error);
        } finally {
            setLoadingVotes(false);
        }
    };

    useEffect(() => {
        if (session?.user?.id) loadVotes();
    }, [status]);

    const handleLoadMore = () => {
        loadVotes();
    };

    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    if (status === "loading") return;

    if (status === "authenticated") {
        return (
            <main>
                <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "4rem", gap: "1rem 0" }}>
                    <Typography variant="h3" color="neutral.light">
                        History
                    </Typography>
                    <ToggleButtonGroup value={alignment} color="primary" exclusive onChange={handleChange} aria-label="Platform">
                        <ToggleButton value="all">All</ToggleButton>
                        <ToggleButton value="inProgress">In Progress</ToggleButton>
                        <ToggleButton value="completed">Completed</ToggleButton>
                    </ToggleButtonGroup>

                    <Box sx={{ margin: "1rem 0", width: "100%", display: "flex", flexDirection: "column" }}>
                        {votesData.length === 0 && !loadingVotes ? (
                            <Typography variantl="body1">No predictions within the last 30 days.</Typography>
                        ) : (
                            <>

                                {votesData.map((vote) => (
                                    <HistoryItem key={vote._id} vote={vote} alignment={alignment} />
                                ))}

                                {loadingVotes && <LoadingCircle />}

                                <Button sx={{ maxWidth: "40rem", margin: "1rem auto" }} variant="outlined" disabled={loadingVotes} onClick={handleLoadMore}>
                                    {loadingVotes ? "Loading..." : "Load More"}
                                </Button>
                            </>
                        )}
                    </Box>
                </Container>
            </main>
        );
    }
}
