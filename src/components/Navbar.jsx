import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [ menu, setMenu ] = useState(false)
    return (
        <nav className="flex items-start md:items-center flex-col md:flex-row justify-between bg-white p-6">
            <div className="flex flex-row items-center justify-between w-full">
                <div className="flex items-center flex-shrink-0 text-black mr-6">
                    <svg className="w-16 h-16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <g id="a"/>
                        <g id="b">
                            <path d="M25,15H7c0-4.42,3.58-8,8-8h2c4.42,0,8,3.58,8,8Z" style={{fill:'#cfb1fc'}}/>
                            <path d="M30,14h-4.059c-.4842-4.3558-4.0892-7.7736-8.5226-7.9788-.2018-.5902-.7552-1.0173-1.4135-1.0173h-.0098c-.6582,0-1.2085,.4269-1.4091,1.0171-4.4355,.2033-8.0426,3.6218-8.527,7.979H2c-.5527,0-1,.4478-1,1s.4473,1,1,1h1.2797l.316,.9487c.4092,1.2271,1.5527,2.0513,2.8457,2.0513h3.0853l1.8824,2.4648c.1309,.1714,.3135,.2959,.5205,.355,.126,.0356,3.0498,.8574,7.3936,1.1006l2.3049,2.1502-.1653,.0949c-.4785,.2749-.6445,.8862-.3691,1.3652,.1846,.3218,.5215,.502,.8682,.502,.1689,0,.3398-.0425,.4971-.1328l6.3457-3.644c.4785-.2749,.6445-.8862,.3691-1.3652-.2754-.4785-.8857-.645-1.3652-.3691l-.1553,.0892c-.4365-.932-1.0585-1.8801-1.6201-2.6483,1.0916-.1739,2.0128-.9393,2.3711-2.0141l.316-.9482h1.2797c.5527,0,1-.4478,1-1s-.4473-1-1-1Zm-15-6h2c3.519,0,6.4323,2.6134,6.9202,6H8.0799c.4879-3.3866,3.4011-6,6.9201-6Zm8.4432,16.0283l-3.0214-2.8188c-.1738-.1616-.3984-.2568-.6357-.2681-3.5-.1655-6.125-.749-6.9961-.9644l-.7463-.9771h11.4841c.6821,.8267,1.8297,2.3546,2.3835,3.611l-2.4681,1.4174Zm3.0646-7.7124c-.1367,.4092-.5186,.6841-.9492,.6841H6.4414c-.4307,0-.8125-.2749-.9492-.6836l-.1054-.3164H26.6131l-.1053,.3159Z" style={{fill:'#96c'}}/>
                        </g>
                    </svg>
                    <span className="ml-3 font-semibold text-xl tracking-tight">Homemade</span>
                </div>
                <div className="block md:hidden">
                    <button onClick={() => setMenu(!menu)} className="flex items-center px-3 py-2 border rounded text-gray-400 border-teal-400 hover:text-gray-500 hover:border-gray-500">
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                    </button>
                </div>
            </div>
            <div className={`${menu ? 'flex' : 'hidden' } md:flex text-sm flex-col md:flex-row items-center justify-center w-full`}>
                <a href="#about-us" className="block lg:inline-block lg:mt-0 text-black font-bold hover:text-gray-700 mr-4 py-2">
                    About Us
                </a>
                <a href="#gallery" className="block lg:inline-block lg:mt-0 text-black font-bold hover:text-gray-700 mr-4 py-2">
                    Gallery
                </a>
                <a href="#testimonials" className="block lg:inline-block lg:mt-0 text-black font-bold hover:text-gray-700 py-2">
                    Testimonial
                </a>
            </div>
            <div className="ml-3 mt-3 md:ml-0 md:mt-0 w-full text-right">
                {
                    localStorage?.getItem('token') ? (
                        <Link to="/dashboard" className="inline-block">
                            <span className="!w-9 !h-9 font-bold rounded-full text-white bg-gray-500 flex items-center justify-center">
                                AI
                            </span>
                        </Link>
                    ) : (
                        <>
                            <Link to="/authentication" className="inline-block text-sm px-3 py-3 leading-none border rounded border-white hover:border-transparent hover:text-white font-bold hover:bg-gray-800">
                                Login
                            </Link>
                            <Link to="/authentication" className="inline-block text-sm px-3 py-3 leading-none border rounded border-white hover:border-transparent hover:text-white font-bold hover:bg-gray-800">
                                Register
                            </Link>
                        </>
                    )
                }
            </div>
        </nav>
    )
}