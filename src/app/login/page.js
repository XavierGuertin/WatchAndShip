'use client';
import {Footer, SignIn, SignUp} from "/src/components";
import './auth.css';
import styles from "/src/styles/style";
import {Navbar} from "@/components";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/firebase";
import React from "react";
import {redirect} from "next/navigation";

const Page = () => {
    const [authUser] = useAuthState(auth);

    return (
        <div className="App bg-primary">
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth} z-[20]`}>
                    <Navbar/>
                </div>
            </div>
            {/* gradient start */}
            <div
                className="absolute z-[0] opacity-45 w-[60%] h-[60%] -bottom-[140%] top-0 -left-[10%] rounded-full blue__gradient"/>

            {authUser ?
                redirect('/')
                :
                <div className="flex justify-between px-16">
                    <SignIn/>
                    <div className="flex flex-col  justify-center items-center">
                        <div className="h-[250px] border-gray-800 border-l w-0"></div>
                        <h1 className="text-white py-4 font-poppins">or</h1>
                        <div className="h-[250px] border-gray-800 border-l w-0"></div>
                    </div>
                    <SignUp/>
                </div>
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