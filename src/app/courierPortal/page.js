'use client';
import styles from "/src/styles/style";
import {Footer, Navbar} from "@/components";
import {redirect} from "next/navigation";
import React, {useEffect} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/firebase";

const Page = () => {

    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (!loading && !user || !loading && window.localStorage.getItem('role') !== 'Courier' && window.localStorage.getItem('role') !== null) {
            console.log('test' + window.localStorage.getItem('role'));
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

            <div className="flex justify-between px-16">
                {/*<OrdersDataGrid/>*/}
            </div>

            <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Footer/>
                </div>
            </div>
        </div>
    );
};
export default Page;