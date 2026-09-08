

import HeaderFour from "@/layouts/headers/HeaderFour"
import { Suspense } from "react"
import ListingDetailsSixArea from "./ListingDetailsSixArea"
import FancyBanner from "@/components/common/FancyBanner"
import FooterFour from "@/layouts/footers/FooterFour"

const ListingDetailsSix = () => {
   return (
      <>
         <HeaderFour />
         <main>
            <Suspense fallback={<div className="mt-200 text-center"><p>Loading...</p></div>}>
               <ListingDetailsSixArea />
            </Suspense>
            <FancyBanner />
         </main>
         <FooterFour />
      </>
   )
}

export default ListingDetailsSix;
