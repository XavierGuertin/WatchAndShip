// TrackingOrder.js
'use client';
import React from 'react';
import "/src/app/userPortal/TrackingOrder.css";

const TrackingOrder = ({ order }) => {
    const statusToValue = {
        "paid": 0.38,
        "courier-assigned": 1.1285,
        "package-picked-up": 1.88,
        "package-delivered": 3
    };

    const statusValue = statusToValue[order.orderData.status] || 0;

    const statusLabels = [
        { label: "Order Processed", imgSrc: "/checklist.jpeg", minStatus: 0 },
        { label: "Courier Assigned", imgSrc: "/box.jpeg", minStatus: 0.8 },
        { label: "Package Picked Up", imgSrc: "/shipping.jpeg", minStatus: 1.5 },
        { label: "Package Delivered", imgSrc: "/home.jpeg", minStatus: 2.1 }
    ];

    return (
        <div className="tracking-container">
            <div className="status-bar">
                {statusLabels.map((status, index) => (
                    <div className={`status ${statusValue >= status.minStatus ? 'active' : ''}`} key={index}>
                        <img src={status.imgSrc} alt={status.label} />
                        <div className="status-label">
                            <span>{status.label}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="progress-bar">
                <progress value={statusValue} max="3"></progress>
            </div>
        </div>
    );
};

export default TrackingOrder;
