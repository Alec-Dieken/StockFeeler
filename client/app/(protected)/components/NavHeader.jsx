"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { Menu, MenuItem, Divider } from "@mui/material";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import UsersApi from "../apis/UsersApi";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

function NavLink({ to, pathname, innerText }) {
    return (
        <Link href={to}>
            <Button color={pathname === to ? "primary" : "neutral"} sx={{ textDecoration: pathname === to ? "underline" : "none" }}>
                {innerText}
            </Button>
        </Link>
    );
}

export default function NavHeader() {
    const pathname = usePathname();
    const { data: session, status } = useSession();

    const [avatar, setAvatar] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    useEffect(() => {
        async function getAvatar() {
            const avatarResponse = await UsersApi.getAvatar(session.user.id, session.user.token);

            setAvatar("/avatars/" + avatarResponse.avatar + ".svg");
        }

        if (session?.user?.id) {
            getAvatar();
        }
    }, [session?.user?.id]);

    const handleSignOut = async () => {
        await signOut();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <Box sx={{ margin: "2rem auto 0 auto", textAlign: "center" }}>
            <header>
                <Typography variant="h1">StockFeeler</Typography>

                <nav>
                    <Box sx={{ display: "flex", gap: "0 2rem", justifyContent: "center", margin: "1rem 0 0 0" }}>
                        <NavLink to="/predict" pathname={pathname} innerText="Predict" />
                        <NavLink to="/history" pathname={pathname} innerText="History" />
                        <NavLink to="/leaderboard" pathname={pathname} innerText="Leaderboard" />
                        <IconButton
                            sx={{ padding: "0" }}
                            id="basic-button"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                        >
                            <Avatar src={avatar ? avatar : undefined}></Avatar>
                        </IconButton>

                        <Menu
                            id="account-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                            sx={{}}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: "visible",
                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                    background: "#282b33",
                                    mt: 1.5,
                                    transform: "translateX(-90px)",
                                    "& .MuiAvatar-root": {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    // "&:before": {
                                    //     content: '""',
                                    //     display: "block",
                                    //     position: "absolute",
                                    //     top: 0,
                                    //     right: 16,
                                    //     width: 10,
                                    //     height: 10,
                                    //     bgcolor: "#282b33",
                                    //     transform: "translateY(-50%) rotate(45deg)",
                                    //     zIndex: 0,
                                    // },
                                },
                            }}
                        >
                            <MenuItem>
                                <Link href="/account" style={{width: "100%"}}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: "0 1rem", color: "#cbd2dd" }}>
                                        <AccountCircleOutlinedIcon />
                                        Account
                                    </Box>
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link href="/faq" style={{width: "100%"}}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: "0 1rem", color: "#cbd2dd" }}>
                                        <QuestionMarkOutlinedIcon />
                                        FAQ
                                    </Box>
                                </Link>
                            </MenuItem>
                            <Divider></Divider>
                            <MenuItem onClick={handleSignOut}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: "0 1rem", color: "#cbd2dd" }}>
                                    <LogoutOutlinedIcon />
                                    Logout
                                </Box>
                            </MenuItem>
                        </Menu>
                    </Box>
                </nav>
            </header>
        </Box>
    );
}
