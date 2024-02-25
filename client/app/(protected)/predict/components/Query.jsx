import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import QueryApi from "../../apis/QueryApi";
import VotesApi from "../../apis/VotesApi";
import CandlestickChart from "../../components/CandlestickChart";
import { Container, Box, Button, Typography } from "@mui/material";
import LoadingCircle from "../../components/LoadingCircle";
import PredictionForm from "./PredictionForm";

import News from "./News";

export default function Query() {
    const { data: session, status } = useSession();
    const [queryData, setQueryData] = useState({});
    const [loadingQueryData, setLoadingQueryData] = useState(true);
    const [error, setError] = useState(false);
    const [isPostSubmitState, setIsPostSubmitState] = useState(false);
    const [voteData, setVoteData] = useState({});

    async function getQuery() {
        try {
            const query = await QueryApi.selectNextQuery(session.user.id, session.user.token);

            if (query?.ticker) {
                setQueryData(query);
            }

            setLoadingQueryData(false);
        } catch (error) {
            setError("There was a problem loading the chart. Please try again later.");
            setLoadingQueryData(false);
        }
    }

    useEffect(() => {
        if (session?.user?.id) getQuery();
    }, [session?.user?.id]);

    const submitPrediction = async (prediction) => {
        try {
            const vote = await VotesApi.addVote(session.user.id, queryData._id, prediction, session.user.token);
            setVoteData(vote);
            setIsPostSubmitState(true);
        } catch (error) {
            // HANDLE ERROR
            console.log(error);
        }
    };

    const handleGetNextQuery = async () => {
        try {
            setLoadingQueryData(true);
            setIsPostSubmitState(false);
            await getQuery();
        } catch (error) {
            // HANDLE ERROR
            console.log(error);
        }
    };

    if (status === "loading") return;

    if (loadingQueryData) {
        return (
            <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "4rem", gap: "1rem 0" }}>
                <LoadingCircle />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ textAlign: "center", marginTop: "4rem" }}>
                <Typography variant="h5" color="neutral.main">{error}</Typography>
            </Container>
        );
    }

    if (queryData?.ticker) {
        return (
            <main>
                <Container
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        marginTop: "4rem",
                        gap: "1rem 0",
                    }}
                >
                    <Typography variant="h3" color="neutral.light">
                        Predict the closing price of {queryData.ticker} {queryData.duration} trading day(s) from now:
                    </Typography>

                    <Box sx={{ maxWidth: "800px", width: "100%" }}>
                        <CandlestickChart data={queryData.chartData} width={600} height={300} />
                    </Box>

                    {isPostSubmitState ? (
                        <>
                            <Typography variant="body1" color="primary">Successfully submitted</Typography>
                            <Typography variant="body1">Your prediction: ${Number(voteData.prediction).toFixed(2)}</Typography>
                            <Typography variant="body1">Average user prediction: ${Number(voteData.average).toFixed(2)}</Typography>
                            <Button onClick={handleGetNextQuery} variant="contained" color="primary">
                                Next
                            </Button>
                        </>
                    ) : (
                        <PredictionForm submitPrediction={submitPrediction} />
                    )}

                    <News ticker={queryData.ticker} token={session?.user?.token} />
                </Container>
            </main>
        );
    } else {
        return (
            <Container sx={{ textAlign: "center", marginTop: "4rem" }}>
                <Typography variant="body1">No new queries. Please check back later.</Typography>
            </Container>
        );
    }
}
