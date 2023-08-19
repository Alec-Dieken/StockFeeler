import RegisterForm from "../components/RegisterForm";
import authHandler from "../utils/auth/authHandler";

function Register({ status }) {
    
    return <RegisterForm status={status}/>;
}

export default authHandler(Register);
