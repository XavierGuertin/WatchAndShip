import styles, {layout} from "../styles/style";
import {saveIcon, searchIcon, shippingIcon} from "../../public";

const Features = () => (
    <section id="features" className={layout.section}>
        <div className={layout.sectionInfo}>
            <h2 className={styles.heading2}>
                What We Offer
            </h2>
            <p className={`${styles.paragraph} max-w-[600px] mt-5`}>
                Experience seamless deliveries from A to B with our cross-browser compatible platform. <br/><br/>
                Unlock exclusive discounts through interactive ad-viewing, and enjoy real-time tracking for peace of
                mind.
                <br/><br/>Complete your journey with our integrated payment and feedback system, ensuring every delivery
                meets your satisfaction.
            </p>
        </div>
        <div className={`${layout.sectionImg} flex-col`}>
            <div className={`flex flex-row p-6 rounded-[20px] mb-6 features`}>
                <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
                    <img src={searchIcon} alt="star" className="w-[50%] h-[50%] object-contain"/>
                </div>
                <div className="flex-1 flex flex-col ml-3">
                    <h4 className="font-poppins font-semibold text-white text-[25px] leading-[23.4px] mb-1">
                        Request a Pickup & Ship
                    </h4>
                    <p className="font-poppins font-normal text-dimWhite text-[18px] leading-[24px]">
                        We pickup anything, anywhere, and at anytime.
                    </p>
                </div>
            </div>
            <div className={`flex flex-row p-6 rounded-[20px] mb-6 features`}>
                <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
                    <img src={shippingIcon} style={{filter: 'invert(1)'}} alt="star"
                         className="w-[50%] h-[50%] object-contain"/>
                </div>
                <div className="flex-1 flex flex-col ml-3">
                    <h4 className="font-poppins font-semibold text-white text-[25px] leading-[23.4px] mb-1">
                        Deliver Worldwide
                    </h4>
                    <p className="font-poppins font-normal text-dimWhite text-[18px] leading-[24px]">
                        We ship internationally at a competitive price.
                    </p>
                </div>
            </div>
            <div className={`flex flex-row p-6 rounded-[20px] mb-6 features`}>
                <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
                    <img src={saveIcon} alt="star" className="w-[50%] h-[50%] object-contain"/>
                </div>
                <div className="flex-1 flex flex-col ml-3">
                    <h4 className="font-poppins font-semibold text-white text-[25px] leading-[23.4px] mb-1">
                        Get Discounts on Delivery
                    </h4>
                    <p className="font-poppins font-normal text-dimWhite text-[18px] leading-[24px]">
                        You save money on delivery by watching ads.
                    </p>
                </div>
            </div>
        </div>
        <div className="absolute z-[0] opacity-45 w-[60%] h-[60%] -bottom-[140%] -left-[10%] rounded-full blue__gradient"/>
    </section>
);

export default Features;
