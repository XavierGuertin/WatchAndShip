'use client';
import styles from "/src/styles/style";
import {DeliveryForm, Footer, Navbar} from "@/components";
import {redirect} from "next/navigation";
import {auth} from "@/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import React, {useEffect} from "react";

const Page = () => {
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (!loading && !user) {
            redirect('/')
        }
    }, [user, loading]);

    return (
        <div className="App bg-primary">
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth} z-[20]`}>
                    <Navbar/>
                </div>
            </div>
            <div
                className="absolute z-[0] opacity-70 w-[60%] h-[80%] -bottom-[140%] top-0 content-center rounded-full blue__gradient"/>
            <div
                className="absolute z-[0] opacity-70 w-[60%] h-[80%] -bottom-[190%] top-80 right-10 rounded-full blue__gradient"/>

            {user ?
                <div className="flex justify-between px-16">
                    <DeliveryForm/>
                </div>
                :
                null
            }

            <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Footer/>
                </div>
            </div>
        </div>
    );
};
export default Page;