import BreadcrumbOne from '@/components/common/breadcrumb/BreadcrumbOne'
import FooterFour from '@/layouts/footers/FooterFour'
import HeaderOne from '@/layouts/headers/HeaderOne'
import FaqArea from './FaqArea'
import FancyBanner from '@/components/common/FancyBanner'

const Faq = () => {
   return (
      <>
         <HeaderOne style={true} />
         <BreadcrumbOne title="Questions & Answers" sub_title="Frequently Asked Questions" style={false} />
         <FaqArea/>
         <FancyBanner style={false} />
         <FooterFour />
      </>
   )
}

export default Faq
