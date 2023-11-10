"use client"
import '../../app/managerPortal/manager.css';
import { useEffect, useState } from 'react';
import { db } from "/src/firebase";
import { collection, getDocs } from "firebase/firestore";

const OrderList = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Get all orders
        getDocs(collection(db, 'orders')).then((querySnapshot) => {
            const ordersData = [];
            querySnapshot.forEach((doc) => {
                let order = {
                    orderID: doc.id,
                    orderData: doc.data()
                }
                ordersData.push(order);

            });
            setOrders(ordersData);
        });
    }, []);

    const formatDate = (date) => {
        const d = new Date(date);
        const day = ("0" + d.getDate()).slice(-2);
        const month = ("0" + (d.getMonth() + 1)).slice(-2);
        const year = d.getFullYear();

        return `${day}/${month}/${year}`;
    }

    return (
        <div className="h-full bg-primary">
            {orders.map((order, index) => (
                <div key={index}>
                    {/* Add more fields as necessary */}
                    <div className="card max-w-xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5 group transition-all ease-in-out duration-200 transform group-hover:scale-105">
                        <div className="flex">
                            <div className="p-8 w-full">
                                <div className="flex justify-between">
                                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{order.orderID}</div>
                                    <p className="tracking-wide text-sm text-white font-semibold rounded-md p-1 bg-indigo-500">{order.orderData.status}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="block mt-1 text-lg leading-tight font-medium text-black">{formatDate(order.orderData.date.seconds * 1000)}</p>{console.log()}
                                    <p className="block mt-1 text-lg leading-tight font-medium text-black">{order.orderData.price}$</p>
                                </div>
                                <div className="accordion opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <div className="flex justify-between border-b pb-2">
                                        <p className="mt-2 text-gray-500">Weight: {order.orderData.weigth} lbs</p>
                                        <p className="mt-2 text-gray-500">Discount: {order.orderData.discount}$</p>
                                    </div>

                                    <p className="mt-2 text-gray-500">From: {order.orderData.pointA}</p>
                                    <p className="mt-2 text-gray-500">To: {order.orderData.pointB}</p>
                                    <p className="mt-2 text-gray-500">Distance: {order.orderData.distance} km</p>

                                    <p className="mt-2 text-gray-500">Rating: {order.orderData.rating.rating} stars</p>
                                    <p className="mt-2 text-gray-500 text-justify">{order.orderData.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderList;
