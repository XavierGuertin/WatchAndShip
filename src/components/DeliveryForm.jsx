'use client';
import React, {useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {Autocomplete, useJsApiLoader} from "@react-google-maps/api";
import {addDoc, collection} from "firebase/firestore";
import {db} from "src/firebase";

const libraries = ["places"];

const DeliveryForm = () => {

    const [weight, setWeight] = useState("");
    const todayDate = new Date();
    const [date, setDate] = useState(new Date());
    const [amount, setAmount] = useState(0);
    const [distance, setDistance] = useState("");
    const [description, setDescription] = useState("");

    const pickupRef = React.useRef("");
    const deliveryRef = React.useRef("");

    const [userUID] = React.useState(() => {
        if (typeof window !== 'undefined') {
            const from_localStorage = window.localStorage.getItem('userUID')
            if (from_localStorage === null || from_localStorage === undefined) {
                return 'unknown'
            }

            return `${from_localStorage}` ? from_localStorage : 'unknown'
        }
        return 'notFound'
    });


    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API,
        libraries
    });

    if (!isLoaded) return null;

    async function calculateDistanceAndAmount() {
        if (pickupRef.current.value !== "" && deliveryRef.current.value !== "") {
            const distanceGoogle = new google.maps.DirectionsService();

            const results = await distanceGoogle.route({
                origin: pickupRef.current.value,
                destination: deliveryRef.current.value,
                travelMode: google.maps.TravelMode.DRIVING,
            });

            setAmount(calculateDeliveryFee(weight, distance, date));
            setDistance(Math.round(results.routes[0].legs[0].distance.value / 1000));
        }
    }

    const getQuote = async (e) => {
        e.preventDefault();

        if (window.confirm(`Are you sure you want to proceed with the quote? You'll be redirected to the payment page.`)) {
            //Add the order to the firestore and set the status to not-paid
            const docData = {
                courierUID: null,
                courierName: null,
                deliveryDate: date,
                description: description,
                discount: null,
                distance: distance,
                pointA: pickupRef.current.value,
                pointB: deliveryRef.current.value,
                price: amount,
                rating: null,
                status: "not-paid",
                userUID: userUID,
                weight: weight,
                customerUsername: window.localStorage.getItem('username')
            };
            const docRef = await addDoc(collection(db, "orders"), docData);

            //Redirect to payment page
            window.location.href = "/payment/" + docRef.id;

        } //else go back to form
    };

    function calculateDeliveryFee(weightLbs, distanceKm, date) {
        const BASE_RATE = 10.00; // Base rate in dollars
        const WEIGHT_RATE = 0.10; // Rate per pound in dollars
        const DISTANCE_RATE = 0.10; // Rate per kilometer in dollars
        const URGENT_MULTIPLIER = 1.5; // Multiplier for urgent delivery
        const WEEKEND_MULTIPLIER = 1.1; // Multiplier for weekends
        const DISCOUNT_RATE = 0.95; // Discount for non-peak times (5% off)

        // Convert dateString to a Date object
        const deliveryDate = new Date(date);
        const currentDate = new Date();

        // Calculate the difference in days between the current date and the delivery date
        const msPerDay = 24 * 60 * 60 * 1000;
        const daysUntilDelivery = (deliveryDate - currentDate) / msPerDay;

        // Determine if the delivery is urgent (assuming urgent means less than 2 days until delivery)
        const isUrgent = daysUntilDelivery < 2;

        // Determine if the delivery date is on a weekend
        const isWeekend = deliveryDate.getDay() === 6 || deliveryDate.getDay() === 0; // 6 for Saturday, 0 for Sunday

        // Calculate base fee
        let fee = BASE_RATE;

        // Add weight-based fee
        fee += weightLbs * WEIGHT_RATE;

        // Add distance-based fee
        fee += distanceKm * DISTANCE_RATE;

        // Adjust fee for urgency
        if (isUrgent) {
            fee *= URGENT_MULTIPLIER;
        }

        // Adjust fee for weekend delivery
        if (isWeekend) {
            fee *= WEEKEND_MULTIPLIER;
        }

        // Apply discount for non-peak times (if not urgent and not on the weekend)
        if (!isUrgent && !isWeekend) {
            fee *= DISCOUNT_RATE;
        }

        // Round to 2 decimal places for currency
        return Math.round(fee * 100) / 100;
    }

    return (
        <div className="sign-in-container w-full h-full font-poppins z-[20]">
            <form onSubmit={getQuote}>
                <div className="bg-grey-lighter min-h-screen flex flex-col">
                    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            <h1 className="mb-8 text-3xl text-center">Get a Quote</h1>
                            <input
                                type="text"
                                className="block border border-black w-full p-3 rounded mb-4"
                                value={weight}
                                onChange={(e) => {
                                    setWeight(e.target.value);
                                }}
                                placeholder="Weight (Lbs)"
                            />
                            <DatePicker className="block border border-black w-full p-3 rounded mb-4"
                                        minDate={todayDate}
                                        selected={date}
                                        onChange={(date) => setDate(date)}
                            />
                            <br/>
                            <Autocomplete>
                                <input
                                    className="block border border-black w-full p-3 rounded mb-4"
                                    type="text"
                                    placeholder="Pick Up Address"
                                    ref={pickupRef}
                                    onChange={() => setDistance("")}
                                />
                            </Autocomplete>
                            <Autocomplete>
                                <input
                                    className="block border border-black w-full p-3 rounded mb-4"
                                    type="text"
                                    placeholder="Delivery Address"
                                    ref={deliveryRef}
                                    onChange={() => setDistance("")}
                                />
                            </Autocomplete>

                            <textarea className="block border border-black w-full p-3 rounded mb-4"
                                      rows="4"
                                      cols="10"
                                      placeholder="Description"
                                      onChange={(e) => setDescription(e.target.value)}
                            >
                            </textarea>

                            <button type="button"
                                    className="w-full text-center py-3 rounded bg-blue-gradient text-black focus:outline-none my-1"
                                    onClick={calculateDistanceAndAmount}>
                                Calculate Quote
                            </button>

                            <div>
                                <p>
                                    <strong>
                                        {distance !== "" ? "\nDistance is " + distance + " km\n" : null}
                                    </strong>
                                </p>
                            </div>

                            <div>
                                <p>
                                    <strong>
                                        {amount !== 0 ? "\nThe quote amount is " + amount + " $\n" : null}
                                    </strong>
                                </p>
                            </div>

                            {distance !== "" && weight !== "" && date !== todayDate && description !== "" ?
                                <button
                                    type="submit"
                                    className="w-full text-center py-3 rounded bg-blue-gradient text-black focus:outline-none my-1">
                                    Confirm Quote & Pay
                                </button>
                                : null}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default DeliveryForm;
