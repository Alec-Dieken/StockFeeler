import { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import AssetApi from "../../apis/AssetApi";
import BusinessIcon from "@mui/icons-material/Business";
import CategoryIcon from "@mui/icons-material/Category";
import DescriptionIcon from "@mui/icons-material/Description";
import WebIcon from "@mui/icons-material/Web";
import InsightsIcon from "@mui/icons-material/Insights";
import Link from "@mui/material/Link";
import LoadingCircle from "../../components/LoadingCircle";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function News({ ticker, token }) {
    const [asset, setAsset] = useState({});
    const [loadingAsset, setLoadingAsset] = useState(true);
    const [error, setError] = useState(false);
    const isTooSmForImg = useMediaQuery("(max-width:465px)");
    const bgColor = "#0b0e18";
    const bgColorHover = "#0f121c";

    useEffect(() => {
        getNews();
    }, [ticker]);

    async function getNews() {
        try {
            setLoadingAsset(true);
            const asset = await AssetApi.getInfo(ticker, token);
            setAsset(asset);
            setLoadingAsset(false);
        } catch (err) {
            setError(err.message);
            setLoadingAsset(false);
        }
    }

    return (
        <Box sx={{ width: "100%", maxWidth: "800px", display: "flex", flexDirection: "column", gap: "1rem 0", marginTop: "2rem", paddingBottom: "2rem" }}>
            {loadingAsset ? (
                <LoadingCircle />
            ) : asset?.name ? (
                <>
                    <Box
                        sx={{ width: "100%", display: "flex", alignItems: "center", gap: "0 1rem", padding: "1rem", borderRadius: "0.5rem", color: "#b3b3b3", backgroundColor: bgColor }}
                    >
                        <BusinessIcon></BusinessIcon>
                        <Typography variant="h4" color="neutral.light">
                            {asset.name} ({ticker})
                        </Typography>
                    </Box>
                    <Box sx={{ width: "100%", display: "flex", alignItems: "center", gap: "0 1rem", padding: "1rem", borderRadius: "0.5rem", color: "#b3b3b3", backgroundColor: bgColor }}>
                        <CategoryIcon />
                        <Typography variant="h6" color="neutral.main">
                            {asset.type}
                        </Typography>
                    </Box>
                    <Box sx={{ width: "100%", display: "flex", alignItems: "flex-start", gap: "0 1rem", padding: "1rem", borderRadius: "0.5rem", color: "#b3b3b3", backgroundColor: bgColor }}>
                        <DescriptionIcon />
                        <Typography variant="h5" color="neutral.main">
                            {asset.description}
                        </Typography>
                    </Box>
                    <Box sx={{ width: "100%", display: "flex", alignItems: "center", gap: "0 1rem", padding: "1rem", borderRadius: "0.5rem", color: "#b3b3b3", backgroundColor: bgColor }}>
                        <WebIcon />
                        <Link href={asset.website} target="_blank" underline="always" rel="noopener noreferrer" color="neutral.main">
                            <Typography variant="h6">{asset.website}</Typography>
                        </Link>
                    </Box>
                    <Box
                        sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "flex",
                            gap: "0 1rem",
                            backgroundColor: bgColor,
                            padding: "1rem",
                            borderRadius: "0.5rem",
                            color: "#b3b3b3",
                        }}
                    >
                        <InsightsIcon />
                        <Link
                            href={`https://finance.yahoo.com/quote/${ticker}`}
                            target="_blank"
                            underline="always"
                            rel="noopener noreferrer"
                            color="neutral.main"
                        >
                            <Typography noWrap variant="h6">{`https://finance.yahoo.com/quote/${ticker}`}</Typography>
                        </Link>
                    </Box>
                    <Box sx={{ padding: "0", display: "flex", flexDirection: "column", gap: "1rem 0" }}>
                        {asset.news.map((item, i) => {
                            return (
                                <Link
                                    key={i}
                                    href={item.articleUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    underline="none"
                                    sx={{
                                        "&:hover": {
                                            textDecoration: "none",
                                            backgroundColor: bgColorHover,
                                            cursor: "pointer",
                                        },
                                        backgroundColor: bgColor,
                                        borderRadius: "0.5rem",
                                        color: "#b3b3b3",
                                        display: "block",
                                        transition: "all 0.25s",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: "0 1rem",
                                            padding: "1rem",
                                        }}
                                    >
                                        <img src={item.imageUrl} width={isTooSmForImg ? 100 : 200} style={{ objectFit: "cover" }} />
                                        <Container
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Typography variant="h5" color="neutral.main" sx={{ padding: "8px 0", userSelect: "none" }}>
                                                {item.title}
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                color="neutral.dark"
                                                sx={{ padding: "8px 0", textTransform: "capitalize", userSelect: "none" }}
                                            >
                                                {new Date(item.publishDate).toLocaleString()}
                                            </Typography>
                                        </Container>
                                    </Box>
                                </Link>
                            );
                        })}
                    </Box>
                </>
            ) : (
                <Typography variant="h5" color="neutral.main">Company info not provided by API</Typography>
            )}
        </Box>
    );
}
