'use client'
import styles from "/src/styles/style";
import {Features, Footer, GetAQuote, MainSection, Navbar, Numbers, Tracking, FeedbackModal, FeedbackDisplay} from "../components";

const ratingTest = {
    rating: 4,
    comment: 'The service was great! But the delivery was a bit late.'
}

const Page = () => (
    <div className="bg-primary w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
                <Navbar/>
            </div>
        </div>

        <div className={`bg-primary ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
                <MainSection/>
            </div>
        </div>

        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
                <Features/>
                <FeedbackDisplay feedback={ratingTest} />
                <FeedbackModal/>
                <Tracking/>
                <GetAQuote/>
                <Numbers/>
                <Footer/>
            </div>
        </div>
    </div>
);

export default Page;