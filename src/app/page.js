import Image from 'next/image'
import styles from "../styles/home.module.css";
import Link from 'next/link';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className={styles.container}>
                <header className="{styles.header} bg-gray-200 p-4 rounded-md shadow-md"><Image src="/image/logo.jpg"
                                                                                                alt="Logo" width={300}
                                                                                                height={50}/>
                    <nav className="flex justify-between items-center">
                        <ul className="flex space-x-4">
                            <li className="hover:bg-gray-300 p-2 rounded transition duration-300 ease-in-out"><Link
                                href="#">Home</Link></li>
                            <li className="hover:bg-gray-300 p-2 rounded transition duration-300 ease-in-out"><Link
                                href="#">Services</Link></li>
                            <li className="hover:bg-gray-300 p-2 rounded transition duration-300 ease-in-out"><Link
                                href="#">Pricing</Link></li>
                            <li className="hover:bg-gray-300 p-2 rounded transition duration-300 ease-in-out"><Link
                                href="#">Contact</Link></li>
                        </ul>
                    </nav>
                    <h1>Welcome to Watch&Ship!</h1>
                    <p>Deliver packages with ease and save money by watching ads.</p>
                </header>

                <section className="{styles.section} bg-white p-4 my-4 rounded-md shadow-md">
                    <h2>How It Works</h2>
                    <p>Request a quote for package delivery. If you want to save on the quote, simply watch ads and get
                        discounts!</p>
                </section>
                <section className="{styles.section} bg-white p-4 my-4 rounded-md shadow-md">
                    <h2>Testimonials</h2>
                    <div className="testimonial">
                        <p>"This service is amazing!" - John Doe</p></div>
                    <div className="testimonial"><p>"Saved a lot on shipping!" - Jane Smith</p></div>
                </section>
                <section className="{styles.section} bg-white p-4 my-4 rounded-md shadow-md"><h2>FAQ</h2>
                    <div className="faq-item"><h3>How does it work?</h3><p>We provide discounts when you watch ads.</p>
                    </div>
                    <div className="faq-item"><h3>How much can I save?</h3><p>Discounts vary based on the number of ads
                        you watch.</p></div>
                </section>
                <section className="{styles.section} bg-white p-4 my-4 rounded-md shadow-md"><h2>Features</h2>
                    <div className="feature-card"><Image src="/image/quickDelivery.png" width={300} height={50}
                                                         alt="Feature 1"/><p>Quick
                        Delivery</p></div>
                    <div className="feature-card"><Image src="/image/wideShipping.png" width={300} height={50}
                                                         alt="Feature 2"/><p>Wide
                        Coverage</p></div>
                </section>

                <section className="{styles.section} bg-white p-4 my-4 rounded-md shadow-md">
                    <Link href="/quote">
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition duration-300 ease-in-out">Get
                            a Quote
                        </button>
                    </Link>
                </section>

                <footer className="{styles.footer} bg-gray-200 p-4 mt-4 rounded-md shadow-md">
                    <div className="social-media-icons">
                        <Link href="#"><Image src="/image/facebook.png" alt="Facebook" width={30} height={30}/></Link>
                        <Link href="#"><Image src="/image/twitter.png" alt="Twitter" width={30} height={30}/></Link>
                        <Link href="#"><Image src="/image/instagram.png" alt="Instagram" width={30} height={30}/></Link>
                    </div>
                    <Link href="#">Contact</Link>
                    <Link href="#">About Us</Link>
                    <Link href="#">Terms of Service</Link>
                </footer>
            </div>
        </main>
    )
}
