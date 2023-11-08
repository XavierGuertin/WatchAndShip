import Navbar from "./Navbar";
import Tracking from "./Tracking.jsx";
import Features from "./Features.jsx";
import GetAQuote from "./GetAQuote.jsx";
import Numbers from "./Numbers.jsx";
import Footer from "./Footer";
import MainSection from "./MainSection.jsx";
import SignIn from "./auth/SignIn.jsx";
import SignUp from "./auth/SignUp.jsx";
import AuthDetails from "./auth/AuthDetails";
import FeedbackDisplay from "./FeedbackDisplay";
import PaymentForm from "./payment/PaymentForm"

import dynamic from 'next/dynamic';

// Import FeedbackModal with SSR disabled
const FeedbackModal = dynamic(() => import('./FeedbackModal'), {
    ssr: false,
  });

export {
    Navbar,
    MainSection,
    Features,
    Tracking,
    Numbers,
    GetAQuote,
    Footer,
    SignIn,
    SignUp,
    AuthDetails,
    FeedbackModal,
    FeedbackDisplay,
    PaymentForm
};
