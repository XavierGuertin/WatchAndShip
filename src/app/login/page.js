import { SignIn, SignUp, AuthDetails } from "/src/components";
import './auth.css';
const Page = () => (
    <div className="App">
        <SignIn />
        <h1>====================================</h1>
        <SignUp />
        <AuthDetails />
    </div>
);

export default Page;