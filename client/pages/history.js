import { useState, useEffect } from "react";
import SFHeader from "../components/SFHeader";
import VotesApi from "../utils/apis/VotesApi";
import { Container, Typography } from "@mui/material";
import HistoryItem from "../components/HistoryItem";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import authHandler from "../utils/auth/authHandler";
import LoadingCircle from "../components/LoadingCircle";

function History({ data, status }) {
    const [votesData, setVotesData] = useState([]);
    const [loadingVotes, setLoadingVotes] = useState(true);
    const [alignment, setAlignment] = useState("all");

    useEffect(() => {
        async function getVotes() {
            setLoadingVotes(true);
            try {
                if (data) {
                    const votes = await VotesApi.getVotes(data.user.id, data.user.token);
                    setVotesData(votes);
                }
            } catch (error) {
                console.error("Failed to get votes:", error);
            } finally {
                setLoadingVotes(false);
            }
        }
        getVotes();
    }, [data?.user?.id, data?.user?.token]);

    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    if (status === "authenticated") {
        return (
            <>
                <SFHeader loggedIn={true} />
                <main>
                    <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "4rem", gap: "1rem 0" }}>
                        <Typography variant="h3">History</Typography>
                        <ToggleButtonGroup color="secondary" value={alignment} exclusive onChange={handleChange} aria-label="Platform">
                            <ToggleButton value="all">All</ToggleButton>
                            <ToggleButton value="inProgress">In Progress</ToggleButton>
                            <ToggleButton value="completed">Completed</ToggleButton>
                        </ToggleButtonGroup>
                        {loadingVotes ? (
                            <LoadingCircle />
                        ) : (
                            <Container sx={{ margin: "1rem 0", maxWidth: "750px" }}>
                                {votesData.length === 0 ? (
                                    <Typography>No predictions within the last 30 days.</Typography>
                                ) : (
                                    votesData.map((vote) => <HistoryItem key={vote._id} vote={vote} alignment={alignment} />)
                                )}
                            </Container>
                        )}
                    </Container>
                </main>
            </>
        );
    }

    return null;
}

export default authHandler(History);
