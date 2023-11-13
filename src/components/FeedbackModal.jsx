import React, {useState} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {FiStar} from 'react-icons/fi';
import Response from './Response';
import {auth, db} from "/src/firebase";
import {doc, updateDoc} from "firebase/firestore";

const FeedbackModal = ({orderProp, onClose}) => {
    const [authUser] = useAuthState(auth);
    const [order, setOrder] = useState(orderProp);
    const [isOpen, setIsOpen] = useState(true);
    const [isResponseVisible, setIsResponseVisible] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [responseSuccess, setResponseSuccess] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(undefined);
    const [comment, setComment] = useState('');
    const wordCount = comment.trim().split(/\s+/).filter(Boolean).length;

    const onStarClick = (index) => {
        setRating(index);
    };

    const onStarHover = (index) => {
        setHoverRating(index);
    };

    const handleCloseClick = () => {
        setIsOpen(false);
        if (onClose) {
            onClose(); // Call the callback function passed as a prop
        }
    };

    const updateDB = async () => {
        if (authUser) {
            const orderDocRef = doc(db, 'orders', order.orderID);

            const newRating = {
                rating: rating,
                comment: comment,
                date: new Date(),
                replies: []
            }

            try {
                await updateDoc(orderDocRef, {
                    rating: newRating
                });
                console.log("Order updated with new rating");
                setResponseSuccess(true);
                setResponseMessage("Review successfully submitted");
                setIsResponseVisible(true);
                setTimeout(() => setIsResponseVisible(false), 3000);
                window.location.reload();
            } catch (error) {
                console.error("Error updating order: ", error);
                setResponseSuccess(false);
                setResponseMessage("Error: " + {error});
                setIsResponseVisible(true);
                setTimeout(() => setIsResponseVisible(false), 3000);
            }
        }
    }

    const handleSendClick = () => {
        if (wordCount >= 10) {
            updateDB();
            handleCloseClick();
        } else {
            setResponseSuccess(false);
            setResponseMessage("Minimum word count not reached");
            setIsResponseVisible(true);
            setTimeout(() => setIsResponseVisible(false), 3000);
        }
    };

    return (
        <div className="w-full h-full">
            {isResponseVisible && <Response success={responseSuccess} message={responseMessage}/>}
            {isOpen && (
                <div style={{zIndex: 1000}}
                     className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4 w-1/2 h-2/3">
                        <button className="self-end" onClick={handleCloseClick}>×</button>
                        <h2 className="font-bold text-xl">How would you rate our service?</h2>
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((index) => (
                                <FiStar
                                    key={index}
                                    className={`cursor-pointer transition-colors ${(hoverRating || rating) >= index ? 'text-yellow-400' : 'text-gray-400'
                                    }`}
                                    onMouseEnter={() => onStarHover(index)}
                                    onMouseLeave={() => setHoverRating(undefined)}
                                    onClick={() => onStarClick(index)}
                                />
                            ))}
                        </div>
                        <textarea
                            className="border border-gray-300 rounded-lg p-2 w-full h-full"
                            placeholder="Would you like to share any other comments?"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <div className="w-full flex justify-between text-gray-600">
                            <p className="text-xs">{wordCount}</p>
                            <p className="text-xs">*min 10 words</p>
                        </div>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg" onClick={handleSendClick}>Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeedbackModal;
