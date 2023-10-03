import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="UTF-8"/>
                    <link rel="icon" type="image/svg+xml" href="/watch&ship.svg"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta name="theme-color" content="#000000"/>
                    <title>Watch & Ship</title>
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
