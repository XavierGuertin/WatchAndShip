import styles from "./style";
import {Tracking, GetAQuote, Footer, Navbar, Numbers, MainSection, Features} from "./components";

const App = () => (
    <div className="bg-primary w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
                <Navbar />
            </div>
        </div>

        <div className={`bg-primary ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
                <MainSection />
            </div>
        </div>

        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
                <Features />
                <Tracking />
                <GetAQuote />
                <Numbers />
                <Footer />
            </div>
        </div>
    </div>
);

export default App;