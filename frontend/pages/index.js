import Link from "next/link";
import Layout from './../components/pageLayout/Layout';
import Headline from './../components/pageLayout/Headline';

export default function Home() {
  return (
    <Layout>
        <Headline content = "Welcome to BLOGMART"/>
        <Link href="/signup">
          <a>Signup</a>
        </Link>
    </Layout>
  )
}
