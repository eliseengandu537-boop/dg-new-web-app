import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterFour from "@/layouts/footers/FooterFour"
import ErrorArea from "./ErrorArea"

const Error = () => {
   return (
      <>
         <HeaderOne style={true} />
         <main><ErrorArea /></main>
         <FooterFour />
      </>
   )
}

export default Error
