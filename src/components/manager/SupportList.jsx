"use client"
import '../../app/managerPortal/manager.css';
import { useEffect, useState } from 'react';
import { db } from "/src/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const SupportList = () => {

    const [support, setSupport] = useState([]);

    useEffect(() => {
        // Get all orders
        getDocs(collection(db, 'support')).then((querySnapshot) => {
            const supportList = [];
            querySnapshot.forEach((doc) => {
                let support = {
                    supportID: doc.id,
                    supportData: doc.data()
                }
                supportList.push(support);

            });
            setSupport(supportList);
        });
    }, []);

    const formatDate = (date) => {
        const d = new Date(date);
        const day = ("0" + d.getDate()).slice(-2);
        const month = ("0" + (d.getMonth() + 1)).slice(-2);
        const year = d.getFullYear();

        return `${day}/${month}/${year}`;
    }

    async function handleOnClick(supportID, index) {
        const supportDocRef = doc(db, "support", supportID);
        await updateDoc(supportDocRef, {
            status: "completed"
        })
        document.getElementById(index).innerText = "completed";
    }

    return (
        <div className="h-full bg-primary">
            {support.map((support, index) => (
                <div key={index}>
                    {/* Add more fields as necessary */}
                    <div className="card max-w-xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5 group transition-all ease-in-out duration-200 transform group-hover:scale-105">
                        <div className="flex">
                            <div className="p-8 w-full">
                                <div className="flex justify-between">
                                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{support.supportID}</div>
                                    <p id={index} className="tracking-wide text-sm text-white font-semibold rounded-md p-1 bg-indigo-500">{support.supportData.status}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="block mt-1 text-lg leading-tight font-medium text-black">{support.supportData.title}</p>
                                    <p className="block mt-1 text-lg leading-tight font-medium text-black">{formatDate(support.supportData.timeStamp.seconds * 1000)}</p>
                                </div>
                                <div
                                    className="accordion opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <p className="mt-2 text-gray-500 text-justify"><b>User:</b> {support.supportData.userEmail}</p>
                                    <p className="mt-2 text-gray-500 text-justify"><b>Description:</b> {support.supportData.description}</p>
                                    <button
                                        type="Submit"
                                        className="w-full text-center py-3 rounded group-hover:opacity-100 bg-blue-gradient text-white focus:outline-none my-1"
                                        onClick={() => handleOnClick(support.supportID, index)}
                                    >Complete Request
                                    </button>
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