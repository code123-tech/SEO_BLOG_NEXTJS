import Document,{Html,Head,Main,NextScript} from "next/document";

class MyDocument extends Document {
    render() {
      return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8"/>
          <link rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="./../styles/global.css"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
export default MyDocument;