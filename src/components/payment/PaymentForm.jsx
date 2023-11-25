'use client';
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "src/firebase";
import React, {useEffect, useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import Response from '../Response';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {Ads} from "@/components";

const PaymentForm = props => {
    const [paymentComplete, setPaymentComplete] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [expDate, setExpDate] = useState(null);
    const [cvc, setCvc] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState(null);
    const [user] = useAuthState(auth);
    const todayDate = new Date();

    const router = useRouter();

    useEffect(() => {
        const getPrice = async () => {
            const orderDocRef = doc(db, "orders", props.orderId);
            const docSnap = await getDoc(orderDocRef);
            setPrice(docSnap.get("price"));
            setDiscount(docSnap.get("discount"));
        }
        getPrice();
    }, [])

    // Function to change status of order once the user paid
    const changeStatus = async () => {
        const orderDocRef = doc(db, "orders", props.orderId);
        await updateDoc(orderDocRef, {
            status: "paid"
        })
    }

    // Function Pay will handle payment: Add the the transaction to collection
    const Pay = async (e) => {
        try {
            e.preventDefault();

            changeStatus();

            const orderDocRef = doc(db, "orders", props.orderId);
            const userDocRef = doc(db, "users", user.uid);

            await addDoc(collection(db, "transactions"), {
                timeStamp: serverTimestamp(),
                order: orderDocRef,
                user: userDocRef
            });

            setPaymentComplete(true);
        } catch (err) {
            console.error(err);
        }
    }

    // Send user back home after 3 seconds
    const sendBackHome = () => {
        document.getElementById("pay-button").disabled = true;
        setTimeout(() => {
            router.push('/')
        }, 3000);
    }

    const [showVideoPopup, setShowVideoPopup] = useState(false);

    return (
        <>
            <div className="payment-form-container w-full h-max font-poppins z-[20]">
                <form onSubmit={Pay}>
                    <div className="bg-grey-lighter min-h-screen flex flex-col">
                        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                                <h1 className="mb-8 text-3xl text-center">Payment Portal</h1>

                                <button type="button" onClick={(e) => {
                                    e.preventDefault();
                                    setShowVideoPopup(true);
                                }}>
                                    <p className="tracking-wide text-sm text-white font-semibold rounded-md p-1 bg-indigo-500">
                                        Save money - Watch Ads (2min = 2$)
                                    </p>
                                </button>

                                {showVideoPopup && (
                                    <Ads onWatchComplete={(count) => {
                                        console.log(`Watched ${count} videos`);
                                        setShowVideoPopup(false); // Hide the popup after completion
                                    }} />
                                )}

                                <div className="mt-4 mb-2 flex justify-between">
                                    <h1 className="text-2xl text-left">Total</h1>
                                    <h1 className="text-2xl text-right">{price} $</h1>
                                </div>
                                <div className="mb-8 flex justify-between">
                                    <h1 className="text-2xl text-left">Discount</h1>
                                    <h1 className="text-2xl text-right">{discount === null ? 0 : discount} $</h1>
                                </div>
                                <input
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    type="cardNumber"
                                    placeholder="16 Digit Card Number"
                                    pattern="[0-9]{16}"
                                    value={cardNumber}
                                    required={true}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                />
                                <DatePicker className="block border border-grey-light w-full p-3 rounded mb-4"
                                    minDate={todayDate}
                                    selected={expDate}
                                    placeholderText="MM/YY"
                                    dateFormat="MM/yy"
                                    showMonthYearPicker
                                    onChange={(date) => setExpDate(date)}
                                    required={true}
                                />
                                <input
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    type="cvc"
                                    placeholder="CVC"
                                    pattern="[0-9]{3}"
                                    value={cvc}
                                    required={true}
                                    onChange={(e) => setCvc(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    id="pay-button"
                                    className="w-full text-center py-3 rounded bg-blue-gradient text-white focus:outline-none my-1"
                                >Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                {paymentComplete ? <Response success={true} message={"Transaction Completed: Redirecting you Home"}
                    onLoad={sendBackHome()} /> : <></>}
            </div>
        </>
    )
}

export default PaymentForm;