import React, { useState, useEffect } from 'react';
import { FiStar } from 'react-icons/fi';
import Response from './Response';

const FeedbackDisplay = ({ feedback }) => {
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

    const handleReply = () => {
        if (wordCount >= 10) {
            const newReplies = [...replies, { content: reply, date: new Date() }];
            setReplies(newReplies);
            feedback.replies = newReplies;
            setResponseSuccess(true);
            setResponseMessage("Reply successfully submitted");
            setReply('');
        } else {
            setResponseSuccess(false);
            setResponseMessage("Minimum word count not reached");
        }
        setIsResponseVisible(true);
        setTimeout(() => setIsResponseVisible(false), 3000);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col space-y-4">
            {isResponseVisible && <Response success={responseSuccess} message={responseMessage} />}
            <h3 className="font-bold text-xl">Customer Feedback</h3>
            <div className="flex items-center">
                {Array.from({ length: 5 }, (_, index) => (
                    <FiStar
                        key={index}
                        className={`${feedback.rating > index ? 'text-yellow-400' : 'text-gray-400'}`}
                    />
                ))}
            </div>
            <p className="text-xs text-gray-500">{isClient ? feedback.date.toLocaleString() : ""}</p>
            <p className="text-gray-700">{feedback.comment}</p>
            {/* Display the list of previous replies */}
            {replies.map((response, index) => (
                <div key={index} className="bg-gray-100 p-2 rounded mt-2">
                    <p className="text-gray-600">{response.content}</p>
                    <p className="text-xs text-gray-500">{isClient ? response.date.toLocaleString() : ""}</p>
                </div>
            ))}
            {/* Reply textarea */}
            <textarea
                className="border border-gray-300 rounded-lg p-2 w-full"
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
