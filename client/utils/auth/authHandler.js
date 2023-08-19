// utils/auth/withAuth.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function authHandler(WrappedComponent) {
    const AuthComponent = (props) => {
        const { data, status } = useSession();
        const router = useRouter();

        useEffect(() => {
            if (
                (status === "unauthenticated" && !(router.pathname === "/login" || router.pathname === "/register")) ||
                (status === "authenticated" && (router.pathname === "/login" || router.pathname === "/register"))
            ) {
                router.push("/");
            }
        }, [data, status, router]);

        return <WrappedComponent {...props} status={status} data={data}/>;
    };

    return AuthComponent;
}

export default authHandler;
