import styles from "/src/styles/style";
import Button from "./Button";

const GetAQuote = () => (
    <section
        className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient rounded-[20px] box-shadow`}>
        <div className="flex-1 flex flex-col">
            <h2 className={styles.heading2}>Don't wait. Create an account now.</h2>
            <p className={`${styles.paragraph} max-w-[550px] mt-5`}>
                Get set in under 3 minutes and watch the savings roll in!
            </p>
        </div>

        <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
            <Button/>
        </div>
    </section>
);

export default GetAQuote;
