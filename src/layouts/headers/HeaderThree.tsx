"use client"
import NavMenu from "./Menu/NavMenu"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import UseSticky from "@/hooks/UseSticky"
import Offcanvas from "./Menu/Offcanvas"
import { contactInfo } from "@/data/contact-info";

import logo_1 from "@/assets/images/assets/logodg.png";

const HeaderThree = () => {
   const { sticky } = UseSticky();
   const [offCanvas, setOffCanvas] = useState<boolean>(false);

   return (
      <>
         <header className={`theme-main-menu menu-overlay menu-style-five sticky-menu ${sticky ? "fixed" : ""}`}>
            <div className="inner-content gap-one">
               <div className="top-header position-relative">
                  <div className="d-flex align-items-center">
                     <div className="logo order-lg-0">
                        <Link href="/" className="d-flex align-items-center">
                           <Image src={logo_1} alt="DG logo" width={111} height={46} />
                        </Link>
                     </div>

                     <div className="right-widget ms-auto me-3 me-lg-0 order-lg-4">
                        <ul className="d-flex align-items-center style-none">
                           <li className="d-none d-xl-block"><button onClick={() => setOffCanvas(true)} style={{ cursor: "pointer" }} className="sidenavbtn rounded-circle tran3s" type="button"><i className="fa-sharp fa-light fa-bars-filter"></i></button></li>
                        </ul>
                     </div>

                     <div className="order-lg-2 d-none d-xxl-block">
                        <p className="m0 email-text ps-5 pe-5">Our Email <Link href={contactInfo.emailHref} className="tran3s fw-500 ms-2">{contactInfo.emailDisplay}</Link></p>
                     </div>

                     <nav className="navbar navbar-expand-lg p0 ms-lg-5 order-lg-3">
                        <button className="navbar-toggler d-block d-lg-none" type="button" data-bs-toggle="collapse"
                           data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                           aria-label="Toggle navigation">
                           <span></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                           <NavMenu />
                        </div>
                     </nav>
                  </div>
               </div>
            </div>
         </header>

         <Offcanvas offCanvas={offCanvas} setOffCanvas={setOffCanvas} />
      </>
   )
}

export default HeaderThree
