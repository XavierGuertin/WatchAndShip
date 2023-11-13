"use client"
import './manager.css';
import styles from "/src/styles/style";
import {useAuthState} from "react-firebase-hooks/auth";
import {Navbar} from "@/components";
import {useState, useEffect} from 'react';
import {auth} from "/src/firebase";
import OrderList from "@/components/manager/OrderList";
import SupportList from "@/components/manager/SupportList";
import {Footer} from '@/components';
import {redirect} from "next/navigation";

const Page = () => {
    const [user, loading] = useAuthState(auth);
    const [view, setView] = useState('OrderList');

    useEffect(() => {
        if (!loading && !user || !loading && window.localStorage.getItem('userRole') !== 'Manager' && window.localStorage.getItem('userRole') !== null) {
            redirect('/')
        }
    }, [user, loading]);


    const handleClick = (viewName) => {
        setView(viewName);
    }

    return (
        <>
            <div
                className="absolute z-[0] opacity-70 w-[60%] h-[80%] -bottom-[140%] top-0 content-center rounded-full blue__gradient"/>
            <div
                className="absolute z-[0] opacity-70 w-[60%] h-[80%] -bottom-[190%] top-80 right-10 rounded-full blue__gradient"/>
            <div className="h-screen bg-primary overflow-y-scroll">
                <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth} z-[20]`}>
                        <Navbar/>
                    </div>
                </div>
                <div className="text-center ">
                    <button onClick={() => handleClick('OrderList')}
                            className={`mx-auto rounded-l-xl text-${view === "OrderList" ? 'white' : 'black'} shadow-md m-5 p-2 bg-${view === "OrderList" ? 'indigo-500' : 'white'}`}>Order
                        lists
                    </button>
                    <button onClick={() => handleClick('SupportList')}
                            className={`mx-auto rounded-r-xl shadow-md m-5 p-2 text-${view === "SupportList" ? 'white' : 'black'}  bg-${view === "SupportList" ? 'indigo-500' : 'white'}`}>Support
                    </button>

                </div>
                {view === 'OrderList' && <OrderList/>}
                {view === 'SupportList' && <SupportList/>}
            </div>
            <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Footer/>
                </div>
            </div>
        </>
    );
};
export default Page;










