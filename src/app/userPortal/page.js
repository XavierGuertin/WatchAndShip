"use client"
import '../managerPortal/manager.css';
import styles from "/src/styles/style";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/router';
import { Navbar, FeedbackDisplay, FeedbackModal } from "@/components";
import { useEffect, useState } from 'react';
import { auth, db } from "/src/firebase";
import { collection, getDocs } from "firebase/firestore";

const Page = () => {
    const [authUser] = useAuthState(auth);
    console.log(authUser);
    const [orders, setOrders] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [promptReview, setPromptReview] = useState([]);
    const [paid, setPaidList] = useState([]);


    useEffect(() => {
        if (authUser) {
            //         // Create a query against the collection.
            //         const ordersRef = collection(db, 'orders');
            //         const q = query(ordersRef, where("userUID", "==", authUser.uid)); // Use authUser.uid

            //         // Use the query for getting documents
            //         getDocs(q).then((querySnapshot) => {
            getDocs(collection(db, 'orders')).then((querySnapshot) => {
                const ordersData = [];
                const reviewList = [];
                const promptList = [];
                const paidList = [];
                querySnapshot.forEach((doc) => {
                    let order = {
                        orderID: doc.id,
                        orderData: doc.data()
                    }
                    ordersData.push(order);
                    console.log(order)
                });
                setOrders(ordersData);
                ordersData.forEach(order => {
                    console.log(order.orderData.rating);
                    if ((order.orderData.rating == "" || order.orderData.rating == null))
                        reviewList.push(true);
                    else
                        reviewList.push(false);

                    if (order.orderData.status == "paid")
                        paidList.push(true);
                    else
                        paidList.push(false);
                    promptList.push(false);
                });
                setPaidList(paidList);
                setReviews(reviewList);
                setPromptReview(promptList);
            });
        }
    }, [authUser]);

    const handleReviewClick = (index) => {
        setPromptReview((currentPromptReview) =>
            currentPromptReview.map((item, i) => (i === index ? true : item))
        );
    };

    const handleModalClose = (index) => {
        setTimeout(() => setPromptReview((currentPromptReview) =>
            currentPromptReview.map((item, i) => (i === index ? false : item))
        ), 3000);
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const day = ("0" + d.getDate()).slice(-2);
        const month = ("0" + (d.getMonth() + 1)).slice(-2);
        const year = d.getFullYear();

        return `${day}/${month}/${year}`;
    }

    return (
        <div className="h-screen bg-primary overflow-y-scroll">
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth} z-[20]`}>
                    <Navbar />
                </div>
            </div>
            <div className="h-full bg-primary">
                {orders.map((order, index) => (
                    <div key={index}>
                        {/* Add more fields as necessary */}
                        {promptReview[index] && (
                            <FeedbackModal orderProp={order} onClose={() => handleModalClose(index)} />
                        )}
                        <div className="card max-w-xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5 group transition-all ease-in-out duration-200 transform group-hover:scale-105">
                            <div className="flex">
                                <div className="p-8 w-full">
                                    <div className="flex justify-between">
                                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{order.orderID}</div>
                                        <p className="tracking-wide text-sm text-white font-semibold rounded-md p-1 bg-indigo-500">{order.orderData.status}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="block mt-1 text-lg leading-tight font-medium text-black">{formatDate(order.orderData.date.seconds * 1000)}</p>{console.log()}
                                        <p className="block mt-1 text-lg leading-tight font-medium text-black">{order.orderData.price}$</p>
                                    </div>
                                    <div className="accordion opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <div className="flex justify-between border-b pb-2">
                                            <p className="mt-2 text-gray-500">Weight: {order.orderData.weigth} lbs</p>
                                            <p className="mt-2 text-gray-500">Discount: {order.orderData.discount}$</p>
                                        </div>

                                        <p className="mt-2 text-gray-500">From: {order.orderData.pointA}</p>
                                        <p className="mt-2 text-gray-500">To: {order.orderData.pointB}</p>
                                        <p className="mt-2 text-gray-500">Distance: {order.orderData.distance} km</p>

                                        {paid[index] && (reviews[index] ? (
                                            <button
                                                className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
                                                onClick={() => handleReviewClick(index)}
                                            >
                                                Review Service
                                            </button>
                                        ) : (
                                            <FeedbackDisplay feedback={order.orderData.rating} orderID={order.orderID} />
                                        ))}

                                        <p className="mt-2 text-gray-500 text-justify">{order.orderData.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};
export default Page;