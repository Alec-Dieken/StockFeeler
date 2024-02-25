"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CandlestickChart from "../../components/CandlestickChart";

function HistoryItemDetails({ title, value }) {
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <Typography variant="body1">{title}</Typography>
            <Typography variant="body2">{value}</Typography>
        </Box>
    );
}

export default function HistoryItem({ vote, alignment }) {
    if (vote.query === null || vote.query.chartData === null) return null;
    if ((alignment === "inProgress" && vote.query.result !== null) || (alignment === "completed" && vote.query.result === null)) return null;

    const bgColor = "#0b0e18";
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 900);

    useEffect(() => {
        function handleResize() {
            setIsWideScreen(window.innerWidth >= 900);
        }

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isWideScreen ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: "0 1rem", margin: "1rem 0", padding: "1rem", backgroundColor: bgColor, borderRadius: "8px" }}>
            <Box sx={{ width: "68%" }}>
                <CandlestickChart data={vote?.query?.chartData} width={400} height={200} />
            </Box>

            <Box sx={{ width: "32%", display: "flex", flexDirection: "column", gap: "0.5rem 0" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <Typography variant="h4" color="neutral.light">
                        {vote.query.ticker}
                    </Typography>
                    {vote?.query?.result ? (
                        <Box sx={{ display: "flex", gap: "0 0.5rem", alignItems: "center" }}>
                            <Typography variant="h6" color={vote.score === 0 ? "neutral.main" : "primary"}>
                                +{vote.score.toFixed(2)}
                            </Typography>
                            <Chip
                                sx={{ display: "flex", alignItems: "center", width: "24px", "& .MuiChip-icon": { marginLeft: "11px" } }}
                                size="small"
                                color="primary"
                                icon={<DoneIcon />}
                            />
                        </Box>
                    ) : (
                        <Chip color="neutral" size="small" label="In Progress" />
                    )}
                </Box>

                {vote.query.result && <HistoryItemDetails title="Result:" value={`$${vote.query.result}`} />}
                <HistoryItemDetails title="Prediction Amount:" value={`$${vote.prediction.toFixed(2)}`} />
                <HistoryItemDetails
                    title="Prediction Date:"
                    value={new Date(vote.createdAt).toLocaleString("en-US", { year: "numeric", month: "numeric", day: "numeric" })}
                />

                {!vote.query.result && <HistoryItemDetails title="Trading Days Remaining:" value={vote.query.duration} />}
                <HistoryItemDetails title="Average Prediction:" value={`$${vote.query.average.toFixed(2)}`} />
            </Box>
        </Box>
    ) : (
        <Box sx={{ display: "flex", flexDirection: "column-reverse",alignItems: "center", gap: "1rem 0rem", margin: "1rem 0", padding: "1rem", backgroundColor: bgColor, borderRadius: "8px" }}>
            <Box sx={{ width: "100%" }}>
                <CandlestickChart data={vote?.query?.chartData} width={400} height={200} />
            </Box>

            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.5rem 0" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <Typography variant="h4" color="neutral.light">
                        {vote.query.ticker}
                    </Typography>
                    {vote?.query?.result ? (
                        <Box sx={{ display: "flex", gap: "0 0.5rem", alignItems: "center" }}>
                            <Typography variant="h6" color={vote.score === 0 ? "neutral.main" : "primary"}>
                                +{vote.score.toFixed(2)}
                            </Typography>
                            <Chip
                                sx={{ display: "flex", alignItems: "center", width: "24px", "& .MuiChip-icon": { marginLeft: "11px" } }}
                                size="small"
                                color="primary"
                                icon={<DoneIcon />}
                            />
                        </Box>
                    ) : (
                        <Chip color="neutral" size="small" label="In Progress" />
                    )}
                </Box>

                {vote.query.result && <HistoryItemDetails title="Result:" value={`$${vote.query.result}`} />}
                <HistoryItemDetails title="Prediction Amount:" value={`$${vote.prediction.toFixed(2)}`} />
                <HistoryItemDetails
                    title="Prediction Date:"
                    value={new Date(vote.createdAt).toLocaleString("en-US", { year: "numeric", month: "numeric", day: "numeric" })}
                />

                {!vote.query.result && <HistoryItemDetails title="Trading Days Remaining:" value={vote.query.duration} />}
                <HistoryItemDetails title="Average Prediction:" value={`$${vote.query.average.toFixed(2)}`} />
            </Box>
        </Box>
    );
}
