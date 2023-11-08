'use client'
import styles from "/src/styles/style";
import {Features, Footer, GetAQuote, MainSection, Navbar, Numbers, Tracking} from "../components";

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
                <Tracking/>
                <GetAQuote/>
                <Numbers/>
                <Footer/>
            </div>
        </div>
    </div>
);

export default Page;