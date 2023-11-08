'use client';
import { addDoc, serverTimestamp, collection } from "firebase/firestore";
import { db, auth } from "@/firebase";
import React, { useState, useEffect } from "react";

const PaymentForm = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [expDate, setExpDate] = useState("");
    const [cvv, setCvv] = useState("");

    const Pay = async (e) => {
        try {
            e.preventDefault();
            await addDoc(collection(db, "transactions"), {
                timeStamp: serverTimestamp(),
                cardNumber: cardNumber,
                ExpirationDate: expDate,
                cvv: cvv
            });
        } catch (err) {
            console.error(err);
        }
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
                                    maxLength={16}
                                    minLength={16}
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
                                    type="cvv"
                                    placeholder="CVV"
                                    maxLength={3}
                                    minLength={3}
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="w-full text-center py-3 rounded bg-blue-gradient text-white focus:outline-none my-1"
                                >Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </>
    )
}

export default PaymentForm;