import FooterFour from '@/layouts/footers/FooterFour'
import HeaderOne from '@/layouts/headers/HeaderOne'
import ContactArea from './ContactArea'

const Contact = () => {
   return (
      <>
         <HeaderOne style={true} />
         <main>
            <ContactArea />
         </main>
         <FooterFour />
      </>
   )
}

export default Contact
