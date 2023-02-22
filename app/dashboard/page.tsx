import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import MyPosts from "./MyPosts";

const Dashboard = async () => {
    const session = await getServerSession( authOptions );
    if ( !session ) {
        redirect( "/api/auth/signin" );
    }
    return (
        <main className="text-2xl font-bold">
            Welcome Back ! {session.user?.name}
            <MyPosts />
        </main>
    );
}

export default Dashboard
