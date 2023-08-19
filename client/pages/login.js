import LoginForm from "../components/LoginForm";
import authHandler from "../utils/auth/authHandler";

function Login({ status }) {
    
    return <LoginForm status={status}/>;
}

export default authHandler(Login);
