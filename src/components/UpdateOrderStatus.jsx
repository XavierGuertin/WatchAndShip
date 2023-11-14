import React, {useEffect, useState} from 'react';
import {collection, doc, getDocs, query, updateDoc} from 'firebase/firestore';
import {db} from "src/firebase";
import "/src/app/courierPortal/updateorderstatus.css";

const UpdateOrderStatus = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState('');
    const [newStatus, setNewStatus] = useState(0);

    useEffect(() => {
        const fetchOrders = async () => {
            const q = query(collection(db, "orders"));
            const querySnapshot = await getDocs(q);
            const ordersData = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            setOrders(ordersData);
        };

        fetchOrders();
    }, []);

    const updateStatus = async () => {
        if (selectedOrderId) {
            const docRef = doc(db, 'orders', selectedOrderId);
            await updateDoc(docRef, {status: parseInt(newStatus)});
            alert(`Order ${selectedOrderId} updated to status ${newStatus}`);
        } else {
            alert('Please select an order');
        }
    };

    return (
        <div className='update-order-status'>
            <select value={selectedOrderId} onChange={(e) => setSelectedOrderId(e.target.value)}>
                <option value="">Select an Order</option>
                {orders.map(order => (
                    <option key={order.id} value={order.id}>
                        {order.id} - {order.customerName} {/* Displaying order ID and customer name */}
                    </option>
                ))}
            </select>
            <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                <option value="0">Processed</option>
                <option value="1">Shipped</option>
                <option value="2">En Route</option>
                <option value="3">Arrived</option>
            </select>
            <button onClick={updateStatus}>Update Status</button>
        </div>
    );
};

export default UpdateOrderStatus;
