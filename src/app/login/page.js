import {SignIn, SignUp, AuthDetails} from "/src/components";
import './auth.css';
const Page = () => (
    <div className="App">
        <SignIn/>
        <SignUp/>
        <AuthDetails/>
    </div>
);

export default Page;