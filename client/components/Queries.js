import { useState, useEffect } from "react";
import QueryApi from "../utils/apis/QueryApi";
import VotesApi from "../utils/apis/VotesApi";
import CandlestickChart from "./CandlestickChart";
import Button from "@mui/material/Button";
import { Container, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import PredictionForm from "./PredictionForm";
import News from "./News";
import LoadingCircle from "./LoadingCircle";

export default function Queries({ data }) {
    const [queryData, setQueryData] = useState({});
    const [loadingQueryData, setLoadingQueryData] = useState(true);
    const [error, setError] = useState(false);
    const [isPostSubmitState, setIsPostSubmitState] = useState(false);
    const [voteData, setVoteData] = useState({});

    useEffect(() => {
        getQuery();
    }, []);

    async function getQuery() {
        try {
            const query = await QueryApi.selectNextQuery(data.user.id, data.user.token);

            if (query.ticker) {
                setQueryData(query);
            }

            setLoadingQueryData(false);
        } catch (err) {
            setError("There was a problem loading the chart. Please try again later.");
            setLoadingQueryData(false);
        }
    }

    const submitPrediction = async (prediction) => {
        try {
            const vote = await VotesApi.addVote(data.user.id, queryData._id, prediction, data.user.token);
            console.log("Vote successfully added: ");
            console.log(vote);
            setVoteData(vote);
            setIsPostSubmitState(true);
        } catch (err) {
            console.log(err);
        }
    };

    const handleGetNextQuery = async () => {
        try {
            setLoadingQueryData(true);
            setIsPostSubmitState(false);
            await getQuery();
        } catch (err) {
            console.log(err);
        }
    };

    if (loadingQueryData) {
        return (
            <main>
                <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "4rem", gap: "1rem 0" }}>
                    <LoadingCircle />
                </Container>
            </main>
        );
    } else if (error) {
        return (
            <Container sx={{ textAlign: "center", marginTop: "4rem" }}>
                <Typography variant="h5">{error}</Typography>
            </Container>
        );
    } else {
        if (queryData) {
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
                        <Typography variant="h4">
                            Predict the closing price of {queryData.ticker} {queryData.duration} trading day(s) from now:
                        </Typography>
                        <Box sx={{ maxWidth: "800px", width: "100%" }}>
                            <CandlestickChart data={queryData.chartData} width={600} height={300} />
                        </Box>

                        {isPostSubmitState ? (
                            <>
                                <Typography variant="h5">Successfully submitted</Typography>
                                <Typography variant="h5">Your prediction: ${Number(voteData.prediction).toFixed(2)}</Typography>
                                <Typography variant="h5">Average user prediction: ${Number(voteData.average).toFixed(2)}</Typography>
                                <Button onClick={handleGetNextQuery} variant="contained" color="secondary">
                                    Next
                                </Button>
                            </>
                        ) : (
                            <PredictionForm submitPrediction={submitPrediction} />
                        )}

                        <News ticker={queryData.ticker} token={data.user.token} />
                    </Container>
                </main>
            );
        } else {
            return (
                <Container sx={{ textAlign: "center", marginTop: "4rem" }}>
                    <Typography variant="h5">No new queries. Please check back later.</Typography>
                </Container>
            );
        }
    }
}
