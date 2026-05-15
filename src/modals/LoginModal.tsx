import Image from "next/image"
import LoginForm from "@/components/forms/LoginForm"

import loginIcon_1 from "@/assets/images/icon/google.png"
import loginIcon_2 from "@/assets/images/icon/facebook.png"

const LoginModal = ({ loginModal, setLoginModal }: any) => {

   return (
      <>
         <div className="modal fade" id="loginModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-fullscreen modal-dialog-centered">
               <div className="container">
                  <div className="user-data-form modal-content">
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                     <div className="form-wrapper m-auto">
                        <div className="text-center mb-20">
                           <h2>Welcome Back!</h2>
                        </div>
                        <LoginForm />
                        <div className="d-flex align-items-center mt-30 mb-10">
                           <div className="line"></div>
                           <span className="pe-3 ps-3 fs-6">OR</span>
                           <div className="line"></div>
                        </div>
                        <div className="row">
                           <div className="col-sm-6">
                              <a href="#" className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10">
                                 <Image src={loginIcon_1} alt="" />
                                 <span className="ps-3">Login with Google</span>
                              </a>
                           </div>
                           <div className="col-sm-6">
                              <a href="#" className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10">
                                 <Image src={loginIcon_2} alt="" />
                                 <span className="ps-3">Login with Facebook</span>
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default LoginModal
