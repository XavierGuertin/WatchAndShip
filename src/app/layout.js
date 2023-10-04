import './index.css'

export default function RootLayout({ children }) {
  return (
      <html>
          <head>
              <meta charSet="UTF-8"/>
              <link rel="icon" type="image/svg+xml" href="/watch&ship.svg"/>
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <meta name="theme-color" content="#000000"/>
              <title>Watch & Ship</title>
          </head>
          <body>{children}</body>
      </html>
  )
}
