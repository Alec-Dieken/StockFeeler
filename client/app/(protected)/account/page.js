"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Box,
    IconButton,
    Avatar,
    Button,
    ImageList,
    ImageListItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import Image from "next/image";
import UsersApi from "../apis/UsersApi";
import LoadingCircle from "../components/LoadingCircle";
import { signOut } from "next-auth/react";

const generateAvatars = (numAvatars) => {
    return Array.from({ length: numAvatars }, (_, i) => `avatar${i + 1}`);
};

export default function Account() {
    const { data: session, status } = useSession();
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [loadingUserData, setLoadingUserData] = useState(true);
    const [userData, setUserData] = useState({});

    async function getCurrentUserInfo() {
        setLoadingUserData(true);
        try {
            if (session) {
                const userDataResponse = await UsersApi.getUserAccountInfo(session.user.id, session.user.token);
                setUserData(userDataResponse);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingUserData(false);
        }
    }

    useEffect(() => {
        if (session?.user?.id) getCurrentUserInfo();
    }, [session?.user?.id]);

    const changeAvatar = async (item) => {
        const newAvatar = await UsersApi.updateAvatar(session.user.id, session.user.token, item);
        window.location.href = "/account";
    };

    const deleteAccount = async () => {
        await UsersApi.deleteAccount(session.user.id, session.user.token);
        await signOut();
    };

    if (status === "loading") return;

    if (status === "authenticated") {
        const avatars = generateAvatars(30);

        return (
            <main>
                <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "4rem", gap: "1rem 0" }}>
                    <Typography variant="h3" color="neutral.light">
                        Account
                    </Typography>
                    <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "1rem" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem 0", alignItems: "center" }}>
                            {loadingUserData ? (
                                <LoadingCircle />
                            ) : (
                                <IconButton
                                    sx={{ padding: "0" }}
                                    id="basic-button"
                                    aria-controls={open ? "basic-menu" : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                    onClick={() => setOpen(true)}
                                >
                                    <Avatar
                                        sx={{ width: 72, height: 72, fontSize: "32px" }}
                                        src={userData.avatar ? `/avatars/${userData.avatar}.svg` : undefined}
                                    >
                                    </Avatar>
                                </IconButton>
                            )}
                            <Typography variant="h4" color="neutral.main">{session.user.username}</Typography>
                            <Typography variant="h5" color="neutral.main">Prediction Score: {userData?.rankedScore?.toFixed(2)}</Typography>
                            <Button variant="outlined" color="error" onClick={() => setDeleteOpen(true)}>
                                Delete Account
                            </Button>
                        </Box>

                        <Dialog open={open} onClose={() => setOpen(false)}>
                            <DialogTitle sx={{ textAlign: "center", fontSize: "20px" }}>Choose Avatar:</DialogTitle>
                            <DialogContent>
                                <ImageList sx={{ width: 280, height: 500, justifyItems: "center" }} cols={4} rowHeight={50}>
                                    {avatars.map((item) => (
                                        <ImageListItem key={item}>
                                            <Button onClick={() => changeAvatar(item)}>
                                                <Image alt="avatar" src={`/avatars/${item}.svg`} width={32} height={32}></Image>
                                            </Button>
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpen(false)}>Cancel</Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
                            <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                            <DialogContent>
                                <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                                    <Button variant="contained" onClick={() => setDeleteOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="contained" color="error" onClick={deleteAccount}>
                                        Delete
                                    </Button>
                                </Box>
                            </DialogContent>
                        </Dialog>
                    </Container>
                </Container>
            </main>
        );
    }
}
