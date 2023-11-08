import React, { useState } from 'react';
import { FiStar } from 'react-icons/fi';
import Response from './Response';

const FeedbackModal = () => {
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
    };

    const handleSendClick = () => {
        if (wordCount >= 10) {
            setResponseSuccess(true);
            setResponseMessage("Review successfully submitted");
            setIsResponseVisible(true);
            setTimeout(() => setIsResponseVisible(false), 3000); // Hide the response after 3 seconds
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
            {isResponseVisible && <Response success={responseSuccess} message={responseMessage} />}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4 w-1/2 h-2/3">
                        <button className="self-end" onClick={handleSendClick}>×</button>
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
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg" onClick={handleSendClick}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeedbackModal;
