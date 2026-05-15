"use client"
import Link from "next/link"
import Image from "next/image";
import DeleteModal from "@/modals/DeleteModal";

import profileIcon_1 from "@/assets/images/dashboard/icon/icon_23.svg";
import profileIcon_2 from "@/assets/images/dashboard/icon/icon_24.svg";
import profileIcon_3 from "@/assets/images/dashboard/icon/icon_25.svg";

const Profile = () => {

   const openDeleteModal = () => {
      const el = document.getElementById('deleteModal');
      if (el) (window as any).bootstrap?.Modal?.getOrCreateInstance(el).show();
   };

   return (
      <>
         <div className="user-name-data">
            <ul className="dropdown-menu" aria-labelledby="profile-dropdown">
               <li>
                  <Link className="dropdown-item d-flex align-items-center" href="/profile"><Image src={profileIcon_1} alt="" className="lazy-img" /><span className="ms-2 ps-1">Profile</span></Link>
               </li>
               <li>
                  <Link className="dropdown-item d-flex align-items-center" href="/account-settings"><Image src={profileIcon_2} alt="" className="lazy-img" /><span className="ms-2 ps-1">Account Settings</span></Link>
               </li>
               <li>
                  <button onClick={openDeleteModal} className="dropdown-item d-flex align-items-center" style={{ background: 'none', border: 'none', padding: '0', width: '100%', cursor: 'pointer' }}><Image src={profileIcon_3} alt="" className="lazy-img"/><span className="ms-2 ps-1">Delete Account</span></button>
               </li>
            </ul>
         </div>
         <DeleteModal />
      </>
   )
}

export default Profile
