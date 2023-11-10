"use client"
import './manager.css';
import styles from "/src/styles/style";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/router';
import { Navbar } from "@/components";
import { useState } from 'react';
import { auth } from "/src/firebase";
import OrderList from "@/components/manager/OrderList";
import SupportList from "@/components/manager/SupportList";

const Page = () => {
    const [authUser, loading] = useAuthState(auth);
    const [view, setView] = useState('OrderList');

    const handleClick = (viewName) => {
        setView(viewName);
    }

    return (
        <div className="h-screen bg-primary overflow-y-scroll">
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth} z-[20]`}>
                    <Navbar />
                </div>
            </div>
            <div className="text-center ">
                <button onClick={() => handleClick('OrderList')} className={`mx-auto rounded-l-xl text-${view == "OrderList" ? 'white' : 'black'} shadow-md m-5 p-2 bg-${view == "OrderList" ? 'indigo-500' : 'white'}`}>Order lists</button>
                <button onClick={() => handleClick('SupportList')} className={`mx-auto rounded-r-xl shadow-md m-5 p-2 text-${view == "SupportList" ? 'white' : 'black'}  bg-${view == "SupportList" ? 'indigo-500' : 'white'}`}>Support</button>

            </div>
            {view === 'OrderList' && <OrderList />}
            {view === 'SupportList' && <SupportList />}
        </div>
    );
};
export default Page;
