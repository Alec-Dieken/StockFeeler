import Link from "next/link";
import Button from "@mui/material/Button";
import { signOut } from "next-auth/react";
import { Avatar, Box, IconButton, Menu, MenuItem, useTheme, Container, Divider } from "@mui/material";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useUserContext } from "../utils/UserContext";

const HeaderLink = ({ pathname, innerText }) => {
    const router = useRouter();

    return (
        <Link href={pathname} passHref>
            <Button
                color={router.pathname === pathname ? "secondary" : "neutral"}
                sx={{
                    textDecoration: router.pathname === pathname ? "underline" : "none",
                    fontWeight: router.pathname === pathname ? "bold" : "normal",
                    minWidth: "0",
                }}
            >
                {innerText}
            </Button>
        </Link>
    );
};

export default function SFHeader({ loggedIn }) {
    const { userData, loadingAccountData } = useUserContext();
    const theme = useTheme();
    const router = useRouter();
    const scrollable = window.visualViewport.width < window.innerWidth || document.body.style.paddingRight.length > 0;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await signOut();
    };

    if (loggedIn) {
        return (
            <header>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "2rem 0 1rem 0",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                            transform: "translateX(36.563px)",
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={
                                theme.palette.mode === "dark"
                                    ? { textShadow: "0 0 10px rgba(100, 220, 220, 0.5)" }
                                    : { textShadow: "0 0 8px rgba(100, 220, 255, 0.1)" }
                            }
                        >
                            StockFeeler
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            marginRight: "2rem",
                            display: "flex",
                            gap: "0 1rem",
                            alignItems: "center",
                        }}
                    >
                        {!loadingAccountData && (
                            <IconButton
                                sx={{ padding: "0" }}
                                id="basic-button"
                                aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleClick}
                            >
                                <Avatar src={userData.avatar ? `/avatars/${userData.avatar}.svg` : undefined}>
                                    {userData.avatar === null && userData.username[0]}
                                </Avatar>
                            </IconButton>
                        )}

                        <Menu
                            id="account-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                            sx={scrollable ? { transform: "translateX(-25px)", overflow: "visible" } : { transform: "translateX(-15px)" }}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: "visible",
                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                    background: "#333333",
                                    mt: 1.5,
                                    "& .MuiAvatar-root": {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    "&:before": {
                                        content: '""',
                                        display: "block",
                                        position: "absolute",
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: "#333333",
                                        transform: "translateY(-50%) rotate(45deg)",
                                        zIndex: 0,
                                    },
                                },
                            }}
                        >
                            <MenuItem onClick={() => router.push("/account")}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: "0 1rem" }}>
                                    <AccountCircleOutlinedIcon />
                                    Account
                                </Box>
                            </MenuItem>
                            <MenuItem onClick={() => router.push("/faq")}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: "0 1rem" }}>
                                    <QuestionMarkOutlinedIcon />
                                    FAQ
                                </Box>
                            </MenuItem>
                            <Divider></Divider>
                            <MenuItem onClick={handleLogout}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: "0 1rem" }}>
                                    <LogoutOutlinedIcon />
                                    Logout
                                </Box>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "0 1rem",
                    }}
                >
                    <HeaderLink pathname="/" innerText="Vote" />
                    <HeaderLink pathname="/history" innerText="History" />
                    <HeaderLink pathname="/leaderboard" innerText="Leaderboard" />
                </Box>
            </header>
        );
    } else {
        return (
            <Container component="main" maxWidth="md" sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <header>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "2rem 0 1rem 0",
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={
                                theme.palette.mode === "dark"
                                    ? { textShadow: "0 0 10px rgba(100, 220, 220, 0.5)" }
                                    : { textShadow: "0 0 8px rgba(100, 220, 255, 0.1)" }
                            }
                        >
                            StockFeeler
                        </Typography>
                    </Box>
                    <Typography variant="h6" align="center" color="textSecondary" paragraph>
                        Discover and analyze the best stocks. Join our community now.
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "2rem",
                            marginTop: "2rem",
                        }}
                    >
                        <Link href="/login" passHref>
                            <Button color="secondary" variant="contained">
                                Login
                            </Button>
                        </Link>
                        <Link href="/register" passHref>
                            <Button color="neutral" variant="outlined">
                                Sign Up
                            </Button>
                        </Link>
                    </Box>
                </header>
            </Container>
        );
    }
}
