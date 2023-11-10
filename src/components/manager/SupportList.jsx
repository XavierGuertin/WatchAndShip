"use client"
import '../../app/managerPortal/manager.css';
import { useEffect, useState } from 'react';
import { db } from "/src/firebase";
import { collection, getDocs } from "firebase/firestore";

const SupportList = () => {

    const [support, setSupport] = useState([]);

    useEffect(() => {
        // Get all orders
        getDocs(collection(db, 'support')).then((querySnapshot) => {
            const supportList = [];
            querySnapshot.forEach((doc) => {
                supportList.push(doc.data());
            });
            setSupport(supportList);
        });
    }, []);

    return (
        <div className="h-full bg-primary">
            {support.map((support, index) => (
                <div key={index}>
                    {/* Add more fields as necessary */}
                    <div className="card max-w-xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5 group transition-all ease-in-out duration-200 transform group-hover:scale-105">
                        <div className="flex">
                            <div className="p-8 w-full">
                                <div className="flex justify-between">
                                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{support.status}</div>
                                    <p className="tracking-wide text-sm text-white font-semibold rounded-md p-1 bg-indigo-500">{support.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default SupportList;