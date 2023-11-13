'use client';
import React, {useState} from "react";
import "/src/app/ordertracking/TrackingOrder.css";


const TrackingOrder = () => {
    const [orderStatus, setOrderStatus] = useState(1.4); // 0: Processed, 1: Shipped, 2: En Route, 3: Arrival

    // useEffect(() => {
    //     // Fetch order status from Firebase
    //     const fetchOrderStatus = async () => {
    //         const docRef = doc(db, 'orders', orderId);
    //         const docSnap = await getDoc(docRef);

    //         if (docSnap.exists()) {
    //             setOrderStatus(docSnap.data().status);
    //         } else {
    //             console.log('No such document!');
    //         }
    //     };

    //     fetchOrderStatus();
    // }, [orderId]);


    return (
        <div className="tracking-container">
            <h2>Order Number: {/*orderId*/}</h2>
            <div className="status-bar">
                <div className="status">
                    <img src="/checklist.jpeg" alt="Processed"/>
                    <span>Order Processed</span>
                </div>
                <div className="status">
                    <img src="/box.jpeg" alt="Shipped"/>
                    <span>Order Shipped</span>
                </div>
                <div className="status">
                    <img src="/shipping.jpeg" alt="En Route"/>
                    <span>Order En Route</span>
                </div>
                <div className="status">
                    <img src="/home.jpeg" alt="Arrival"/>
                    <span>Order Arrival</span>
                </div>
            </div>
            <div className="progress-bar">
                <progress value={orderStatus} max="3"></progress>
            </div>
        </div>
    );
};

export default TrackingOrder;
