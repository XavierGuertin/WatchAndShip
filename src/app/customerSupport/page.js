'use client';
import styles from "src/styles/style";
import { CustomerSupport, Navbar } from "src/components";

const Page = () => {
    return (
        <div className="App bg-primary">
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth} z-[20]`}>
                    <Navbar />
                </div>
            </div>
            {/* gradient start */}
            <div
                className="absolute z-[0] opacity-45 w-[60%] h-[60%] -bottom-[140%] top-0 -left-[10%] rounded-full blue__gradient" />


            {/* gradient end */}
            <div className="flex justify-between px-16">
                <CustomerSupport />
            </div>
        </div>
    )
}

export default Page;