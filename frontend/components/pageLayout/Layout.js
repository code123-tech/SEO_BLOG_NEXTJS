import Header from './Header';

const Layout = ({children})=>{
    return(
        <>  
            <Header />
            <section>
              {children}
            </section>
            <style global jsx>{`
          body {
            font-family: 'Patrick Hand', cursive;
            font-size:1.4rem;
            background-color: #f5f5f5;
          }
      `}</style>
        </>
    )
}
export default Layout;