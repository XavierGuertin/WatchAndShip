// app/page.js
"use client";

import React, { useState } from 'react'
import styles from './quote.module.css'

export default function Page() {
    const [quote, setQuote] = useState(null)
    const [discountedQuote, setDiscountedQuote] = useState(null)

    const calculateQuote = (weight) => {
        const calculatedQuote = 50 + (weight * 2)
        setQuote(calculatedQuote)
    }

    const watchAds = () => {
        if (quote) {
            const discount = quote * 0.9
            setDiscountedQuote(discount)
        }
    }

    const makePayment = () => {
        alert('Proceeding to payment gateway...')
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Get a Quote</h1>
            </header>

            <section className={styles.section}>
                <div>
                    <label>Pickup Address:</label>
                    <input type="text" required/>
                </div>

                <div>
                    <label>Delivery Address:</label>
                    <input type="text" required/>
                </div>

                <div>
                    <label>Package Size:</label>
                    <select>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </div>

                <div>
                    <label>Package Weight (kg):</label>
                    <input type="number" onChange={(e) => calculateQuote(parseFloat(e.target.value))} required/>
                </div>
            </section>

            {quote && (
                <section className={styles.section}>
                    <p>Total Quote: ${quote.toFixed(2)}</p>
                    <button onClick={watchAds}>Watch Ads to Save Money</button>
                    {discountedQuote && <p>Discounted Quote: ${discountedQuote.toFixed(2)}</p>}
                    <button onClick={makePayment}>Pay Now</button>
                </section>
            )}

            <footer className={styles.footer}>
                <a href="/">Home</a>
                <a href="#">Contact</a>
                <a href="#">About Us</a>
            </footer>
        </div>
    )
}