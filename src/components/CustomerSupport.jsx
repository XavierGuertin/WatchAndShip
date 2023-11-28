'use client';
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "src/firebase";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import Response from "./Response";
import "react-datepicker/dist/react-datepicker.css";

const CustomerSupport = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [formSubmitted, setformSubmitted] = useState(false);
    const [user] = useAuthState(auth);

    const router = useRouter();

    // Function Pay will handle payment: Add the the transaction to collection
    const updateDB = async (e) => {
        try {
            e.preventDefault();

            await addDoc(collection(db, "support"), {
                timeStamp: serverTimestamp(),
                title: title,
                description: description,
                status: "not-completed",
                userEmail: user.email
            });

            setformSubmitted(true);

        } catch (err) {
            console.error(err);
        }
    }

    // Send user back home after 3 seconds
    const sendBackHome = () => {
        document.getElementById("pay-button").disabled = true;
        const timer = setTimeout(() => {
            router.push('/')
        }, 3000);
    }

    return (
        <>
            <div className="payment-form-container w-full h-max font-poppins z-[20]">
                <form onSubmit={updateDB}>
                    <div className="bg-grey-lighter min-h-screen flex flex-col">
                        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                                <h1 className="mb-8 text-3xl text-center">Customer Support</h1>
                                <input
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    type="title"
                                    placeholder="Title (Request / Concern)"
                                    value={title}
                                    required={true}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <textarea className="block border border-black w-full p-3 rounded mb-4"
                                      rows="4"
                                      cols="10"
                                      placeholder="Description"
                                      onChange={(e) => setDescription(e.target.value)}
                                >
                                </textarea>
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
                {formSubmitted ? <Response success={true} message={"Request Recorded: Redirecting you Home"}
                    onLoad={sendBackHome()} /> : <></>}
            </div>
        </>
    )
}

export default CustomerSupport;