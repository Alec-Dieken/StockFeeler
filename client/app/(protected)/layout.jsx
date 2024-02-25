import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Container from "@mui/material/Container";
import NavHeader from "./components/NavHeader";

export default async function ({ children }) {
    const session = await getServerSession(authOptions);

    if (!session) redirect("/");

    return (
        <Container>
            <NavHeader></NavHeader>
            {children}
        </Container>
    );
}
