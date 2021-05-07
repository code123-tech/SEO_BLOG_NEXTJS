import React,{useState} from "react";
import Link from "next/link";
import { isAuth,signout} from './../../actions/authentication';
import Router from "next/router";
import NProgress from "nprogress";
import Image from 'next/image'
import "../../node_modules/nprogress/nprogress.css";

import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";

Router.onRouteChangeStart = url=>NProgress.start();
Router.onRouteChangeComplete = url=>NProgress.done();
Router.onRouteChangeError = url=>NProgress.done();

const Header = ()=>{
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar color="dark" dark expand="md" className="text-white sticky-top"> 
            <Link href="/">
                <NavLink>
                   {process.env.APP_NAME}
                </NavLink>
                
            </Link>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar >
                    {!isAuth()&&(
                        <>
                        <NavItem>
                            <Link href="/signin">
                                <NavLink>Signin</NavLink>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link href="/signup">
                                <NavLink>Signup</NavLink>
                            </Link>
                        </NavItem>
                        </>
                    )}
                    {
                        isAuth() &&(
                        <NavItem>
                            <Link href={isAuth().role===0?"/user":"/admin"}>
                                <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
                            </Link>
                        </NavItem>
                        )
                    }
                    {
                    isAuth() &&(
                    <NavItem>
                        <NavLink style={{cursor:"pointer"}} onClick={()=>signout(()=>Router.replace(`/signin`))}>
                            Signout
                        </NavLink>
                    </NavItem>
                    )
                    }
                </Nav>
            </Collapse>
        </Navbar>
    )
}
export default Header;