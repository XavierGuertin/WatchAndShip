import React, { useState } from 'react';
import { FiStar } from 'react-icons/fi';
import Response from './Response'; // Make sure to import the Response component

const FeedbackDisplay = ({ feedback }) => {
    const [reply, setReply] = useState('');
    const [isResponseVisible, setIsResponseVisible] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [responseSuccess, setResponseSuccess] = useState(false);
    const wordCount = reply.trim().split(/\s+/).filter(Boolean).length;

    const handleReply = () => {
        if (wordCount >= 10) {
            console.log('Reply:', reply);
            // Here you would normally handle the submission of the reply
            setResponseSuccess(true);
            setResponseMessage("Reply successfully submitted");
            setReply(''); // Reset reply textarea after sending
        } else {
            setResponseSuccess(false);
            setResponseMessage("Minimum word count not reached");
        }
        setIsResponseVisible(true);
        setTimeout(() => setIsResponseVisible(false), 3000); // Hide the response after 3 seconds
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
            <p className="text-gray-700">{feedback.comment}</p>
            <textarea
                className="border border-gray-300 rounded-lg p-2 w-full"
                placeholder="Your reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
            ></textarea>
            <div className="w-full flex justify-between text-gray-600">
                <p className="text-xs">{wordCount}</p>
                <p className="text-xs">*min 10 words</p>
            </div>
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
