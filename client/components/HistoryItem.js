import { Box, Container, Typography, Chip } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CandlestickChart from "./CandlestickChart";

function HistoryItemDetails({ title, value }) {
    return (
        <Box sx={{ display: "flex", gap: "0 0.5rem" }}>
            <Typography variant="h6" color="neutral.main">
                {title}
            </Typography>
            <Typography variant="h5">{value}</Typography>
        </Box>
    );
}

export default function HistoryItem({ vote, alignment }) {
    if (vote.query === null || vote.query.chartData === null) return null;
    if ((alignment === "inProgress" && vote.query.result !== null) || (alignment === "completed" && vote.query.result === null)) return null;

    return (
        <Box className="testClass" sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0 1rem", margin: "1rem 0" }}>
            <Container
                sx={{
                    backgroundColor: "#0e111a",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "0 1rem",
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    overflow: "hidden",
                }}
            >
                <Box sx={{ width: "68%" }}>
                    <CandlestickChart data={vote.query.chartData} width={400} height={200} />
                </Box>

                <Box sx={{ width: "28%", display: "flex", flexDirection: "column", gap: "0.5rem 0" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h3">{vote.query.ticker}</Typography>
                        {vote.query.result ? (
                            <Box sx={{ display: "flex", gap: "0 0.5rem", alignItems: "center" }}>
                                <Typography variant="h6" color={vote.score === 0 ? "neutral.main" : "default"}>
                                    +{vote.score.toFixed(2)}
                                </Typography>
                                <Chip
                                    sx={{ display: "flex", alignItems: "center", width: "24px", "& .MuiChip-icon": { marginLeft: "11px" } }}
                                    color="secondary"
                                    size="small"
                                    icon={<DoneIcon />}
                                />
                            </Box>
                        ) : (
                            <Chip color="default" size="small" label="In Progress" />
                        )}
                    </Box>

                    {vote.query.result && <Typography variant="h6">Result: {vote.query.result}</Typography>}
                    <HistoryItemDetails title="Prediction Amount:" value={`$${vote.prediction.toFixed(2)}`} />
                    <HistoryItemDetails title="Prediction Date:" value={new Date(vote.createdAt).toLocaleString()} />

                    {!vote.query.result && <HistoryItemDetails title="Trading Days Remaining:" value={vote.query.duration} />}
                    <HistoryItemDetails title="Average Prediction:" value={`$${vote.query.average.toFixed(2)}`} />
                </Box>
            </Container>
        </Box>
    );
}
