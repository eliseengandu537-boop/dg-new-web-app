"use client"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Image from "next/image";
import { AUTH_API_URL } from "@/utils/api";
import { contactInfo } from "@/data/contact-info";

import OpenEye from "@/assets/images/icon/icon_68.svg";

interface FormData {
   email: string;
   password: string;
}

const LoginForm = () => {
   const router = useRouter(); 
   const schema = yup
      .object({
         email: yup.string().required().email().label("Email"),
         password: yup.string().required().label("Password"),
      })
      .required();

   const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: yupResolver(schema) });

   const onSubmit = async (data: FormData) => {
      try {
         const response = await fetch(`${AUTH_API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
         });

         const result = await response.json();

         if (response.ok) {
            localStorage.setItem("dg_token", result.token);
            localStorage.setItem("dg_user", JSON.stringify(result.user));
            toast.success("Login successful", { position: "top-center" });
            reset();
            if (result.user?.role === "admin") {
               router.push("/dashboard/admin");
            } else {
               router.push("/dashboard/client");
            }
         } else {
            toast.error(result.error || result.message || "Invalid email or password");
         }
      } catch (error) {
         toast.error("An error occurred. Please try again.");
      }
   };

   const [isPasswordVisible, setPasswordVisibility] = useState(false);
   const togglePasswordVisibility = () => setPasswordVisibility(!isPasswordVisible);

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="row">
            <div className="col-12">
               <div className="input-group-meta position-relative mb-25">
                  <label htmlFor="login-email">Email*</label>
                  <input id="login-email" type="email" autoComplete="email" {...register("email")} placeholder="you@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "login-email-error" : undefined} />
                  <p id="login-email-error" className="form_error" role={errors.email ? "alert" : undefined}>{errors.email?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <div className="input-group-meta position-relative mb-20">
                  <label htmlFor="login-password">Password*</label>
                  <input id="login-password" type={isPasswordVisible ? "text" : "password"} autoComplete="current-password" {...register("password")} placeholder="Enter password" className="pass_log_id" aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? "login-password-error" : undefined} />
                  <span className="placeholder_icon">
                     <button type="button" className={`passVicon ${isPasswordVisible ? "eye-slash" : ""}`} onClick={togglePasswordVisibility} aria-label={isPasswordVisible ? "Hide password" : "Show password"}>
                        <Image src={OpenEye} alt="" aria-hidden="true" />
                     </button>
                  </span>
                  <p id="login-password-error" className="form_error" role={errors.password ? "alert" : undefined}>{errors.password?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <div className="agreement-checkbox d-flex justify-content-between align-items-center">
                  <div>
                     <input type="checkbox" id="remember" />
                     <label htmlFor="remember">Keep me logged in</label>
                  </div>
                  <Link href={`${contactInfo.emailHref}?subject=Password%20help`}>Need help signing in?</Link>
               </div>
            </div>
            <div className="col-12">
               <button type="submit" className="btn-two w-100 text-uppercase d-block mt-20">Login</button>
            </div>
         </div>
      </form>
   )
}

export default LoginForm;
