import { useSession } from "next-auth/react";
import SFHeader from "../components/SFHeader";
import Queries from "../components/Queries";


function Dashboard() {
    const { data, status } = useSession();

    if (status === "loading") {
        return null;
    }

    if (status === "authenticated") {
        return (
            <>
                <SFHeader loggedIn={status === "authenticated"} />
                <Queries data={data} />
            </>
        );
    }

    return <SFHeader loggedIn={status === "authenticated"} />;
}

export default Dashboard;
