'use client';
import { addDoc, serverTimestamp, collection, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "@/firebase";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter, useSearchParams } from "next/navigation";
import Response from '../Response';

const PaymentForm = () => {
    const [paymentComplete, setPaymentComplete] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [expDate, setExpDate] = useState("");
    const [cvc, setCvc] = useState("");
    const [user] = useAuthState(auth);

    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderID');

    const router = useRouter();

    // Function to change status of order once the user paid
    const changeStatus = async () => {
        const orderDocRef = doc(db, "orders", orderId);
        await updateDoc(orderDocRef, {
            status: "paid"
        })
    }

    // Function Pay will handle payment: Add the the transaction to collection
    const Pay = async (e) => {
        try {
            e.preventDefault();

            changeStatus();

            const orderDocRef = doc(db, "orders", orderId);
            const userDocRef = doc(db, "users", user.uid);

            await addDoc(collection(db, "transactions"), {
                timeStamp: serverTimestamp(),
                cardNumber: cardNumber,
                ExpirationDate: expDate,
                cvc: cvc,
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
        const timer = setTimeout(() => {
            router.push('/')
        }, 3000);
    }

    return (
        <>
            <div className="payment-form-container w-full h-max font-poppins z-[20]">
                <form onSubmit={Pay}>
                    <div className="bg-grey-lighter min-h-screen flex flex-col">
                        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                                <h1 className="mb-8 text-3xl text-center">Payment Portal</h1>
                                <input
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    type="cardNumber"
                                    placeholder="16 Digit Card Number"
                                    pattern="[0-9]{16}"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                />
                                <input
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    type="expDate"
                                    placeholder="MM/YY"
                                    value={expDate}
                                    onChange={(e) => setExpDate(e.target.value)}
                                />
                                <input
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    type="cvc"
                                    placeholder="CVC"
                                    pattern="[0-9]{3}"
                                    value={cvc}
                                    onChange={(e) => setCvc(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="w-full text-center py-3 rounded bg-blue-gradient text-white focus:outline-none my-1"
                                >Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
                {paymentComplete ? <Response success={true} message={"Transaction Completed: Redirecting you Home"} onLoad={sendBackHome()} /> : <></>}
            </div >
        </>
    )
}

export default PaymentForm;