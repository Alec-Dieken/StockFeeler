import { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";

function LoadingCircle() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true);
        }, 750);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return <Box sx={{ display: "flex", justifyContent: "space-around" }}>{loading && <CircularProgress color="primary" />}</Box>;
}

export default LoadingCircle;
