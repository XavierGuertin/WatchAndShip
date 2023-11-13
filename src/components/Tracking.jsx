import styles, {layout} from "/src/styles/style";

const Tracking = () => (
    <section id="quote" className={layout.sectionReverse}>
        <div className={layout.sectionImgReverse}>
            <img src="/tracking.png" alt="billing" className="w-[100%] h-[100%] relative z-[5]"/>

            <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient"/>
            <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient"/>
        </div>

        <div className={layout.sectionInfo}>
            <h2 className={styles.heading2}>
                Track with Precision.<br/>Deliver with Passion.
            </h2>
            <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                Track every step with unmatched clarity.
                Your parcel's journey, transparent and timely.
            </p>

            <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
                <img src="/apple.svg" alt="apple"
                     className="w-[128.86px] h-[42.05px] object-contain mr-5 cursor-pointer"/>
                <img src="/google.svg" alt="google_play"
                     className="w-[144.17px] h-[43.08px] object-contain cursor-pointer"/>
            </div>
        </div>
    </section>
);

export default Tracking;
