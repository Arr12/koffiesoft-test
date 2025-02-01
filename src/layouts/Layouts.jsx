import React from "react";
import Navbar from "../components/Navbar";

export default function Layouts({ children, setModal, modal }) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}