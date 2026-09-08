"use client";

import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { animationCreate } from "@/utils/utils";

const Wrapper = ({ children }: any) => {
    useEffect(() => {
        // Keep Bootstrap out of the initial page bundle and load its interactive
        // behaviour only after the browser has rendered the page.
        void import("bootstrap/dist/js/bootstrap");

        // animation
        const timer = setTimeout(() => {
            animationCreate();
        }, 100);

        return () => clearTimeout(timer);
    }, []);


    return <>
        {children}
        <ToastContainer position="top-center" />
    </>;
}

export default Wrapper
