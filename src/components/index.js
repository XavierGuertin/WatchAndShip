import Navbar from "./Navbar";
import Tracking from "./Tracking.jsx";
import Features from "./Features.jsx";
import GetAQuote from "./GetAQuote.jsx";
import Numbers from "./Numbers.jsx";
import Footer from "./Footer";
import MainSection from "./MainSection.jsx";
import SignIn from "./auth/SignIn.jsx";
import SignUp from "./auth/SignUp.jsx";
import FeedbackDisplay from "./FeedbackDisplay";
import PaymentForm from "./payment/PaymentForm";
import DeliveryForm from "./DeliveryForm";
import TrackingOrder from "./TrackingOrder";
import UpdateOrderStatus from "./UpdateOrderStatus";
import Ads from "@/components/Ads"
import dynamic from 'next/dynamic';
import CustomerSupport from "./CustomerSupport";

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
    FeedbackModal,
    FeedbackDisplay,
    PaymentForm,
    DeliveryForm,
    TrackingOrder,
    UpdateOrderStatus,
    Ads,
    CustomerSupport
};
