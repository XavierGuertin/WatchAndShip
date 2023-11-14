import React, {useEffect, useState} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {FiStar} from 'react-icons/fi';
import Response from './Response';
import {auth, db} from "/src/firebase";
import {arrayUnion, doc, updateDoc} from "firebase/firestore";

const FeedbackDisplay = ({feedback, orderID}) => {
    const [authUser] = useAuthState(auth);
    const [replies, setReplies] = useState(feedback.replies || []);
    const [reply, setReply] = useState('');
    const [isResponseVisible, setIsResponseVisible] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [responseSuccess, setResponseSuccess] = useState(false);
    const wordCount = reply.trim().split(/\s+/).filter(Boolean).length;
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleReply = async () => {
        if (wordCount >= 10 && authUser) {
            const newReply = {content: reply, date: new Date(), userUID: authUser.uid, username: sessionStorage.getItem("userRole") == "Manager" ? authUser.displayName + " (Customer Support)" : authUser.displayName};
            const orderDocRef = doc(db, 'orders', orderID);

            try {
                await updateDoc(orderDocRef, {
                    'rating.replies': arrayUnion(newReply)
                });

                setReplies([...replies, newReply]);
                setResponseSuccess(true);
                setResponseMessage("Reply successfully submitted");
                setReply('');
            } catch (error) {
                console.error("Error updating order: ", error);
                setResponseSuccess(false);
                setResponseMessage("Error submitting reply");
            }
        } else {
            setResponseSuccess(false);
            setResponseMessage("Minimum word count not reached");
        }
        setIsResponseVisible(true);
        setTimeout(() => setIsResponseVisible(false), 3000);
    };


    const formatDate = (date) => {
        const d = new Date(date);
        const day = ("0" + d.getDate()).slice(-2);
        const month = ("0" + (d.getMonth() + 1)).slice(-2);
        const year = d.getFullYear();

        return `${day}/${month}/${year}`;
    }

    return (
        <div
            className="bg-white p-6 mt-4 rounded-lg shadow-xl flex flex-col space-y-4 max-h-48 overflow-y-auto border border-gray-300">
            {isResponseVisible && <Response success={responseSuccess} message={responseMessage}/>}
            <h3 className="font-bold text-xl">Customer Feedback</h3>
            <div className="flex items-center">
                {Array.from({length: 5}, (_, index) => (
                    <FiStar
                        key={index}
                        className={`${feedback.rating > index ? 'text-yellow-400' : 'text-gray-400'}`}
                    />
                ))}
            </div>
            <p className="text-xs text-gray-500">
                {isClient ? (
                    feedback.date.seconds
                        ? formatDate(feedback.date.seconds * 1000)
                        : new Date(feedback.date).toLocaleDateString('en-GB', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        })
                ) : ""}
            </p>
            <p className="text-gray-700">{feedback.comment}</p>
            {/* Replies container with scroll */}
            <div className="flex-grow">
                {replies.map((response, index) => (
                    <div key={index} className="bg-gray-100 p-2 rounded mt-2">
                        <p className="text-xs text-gray-500">{response.username ? response.username : ""}</p>
                        <p className="text-gray-600">{response.content}</p>
                        <p className="text-xs text-gray-500">
                            {isClient ? (
                                response.date.seconds
                                    ? formatDate(response.date.seconds * 1000)
                                    : new Date(response.date).toLocaleDateString('en-GB', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    })
                            ) : ""}
                        </p>
                    </div>
                ))}
            </div>
            {/* Reply textarea */}
            <textarea
                className="border border-gray-300 rounded-lg p-2 w-full min-h-[10vh]"
                placeholder="Your reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
            ></textarea>
            {/* Word count and minimum word indication */}
            <div className="w-full flex justify-between text-gray-600">
                <p className="text-xs">{wordCount} words</p>
                <p className="text-xs">*min 10 words</p>
            </div>
            {/* Send reply button */}
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                onClick={handleReply}
            >
                Send Reply
            </button>
        </div>
    );
};

export default FeedbackDisplay;
