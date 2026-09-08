"use client"
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { submitContactMessage } from "@/utils/dashboardApi";
import Link from "next/link";

interface FormData {
   user_name: string;
   user_email: string;
   message: string;
   privacyAccepted: boolean;
}

const schema = yup
   .object({
      user_name: yup.string().required().label("Name"),
      user_email: yup.string().required().email().label("Email"),
      message: yup.string().required().label("Message"),
      privacyAccepted: yup.boolean().oneOf([true], "Please confirm that you have read the privacy notice.").required(),
   })
   .required();

const ContactForm = () => {
   const [isSubmitting, setIsSubmitting] = useState(false);

   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });

   const sendMessage = async (data: FormData) => {
      setIsSubmitting(true);

      try {
         await submitContactMessage({
            name: data.user_name.trim(),
            email: data.user_email.trim(),
            message: data.message.trim(),
            subject: "Website contact form",
         });

         toast.success("Message sent successfully", { position: 'top-center' });
         reset();
      } catch (error: any) {
         toast.error(error?.response?.data?.error || "Failed to send message. Please try again.", {
            position: 'top-center',
         });
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <form onSubmit={handleSubmit(sendMessage)} className="friendly-contact-form">
         <h3>Send us a message</h3>
         <p className="form-intro">We would love to hear what you are looking for and how we can help.</p>
         <div className="messages" aria-live="polite"></div>
         <div className="row controls">
            <div className="col-12">
               <div className="input-group-meta form-group mb-30">
                  <label htmlFor="contact-name">Name*</label>
                  <input id="contact-name" type="text" {...register("user_name")} name="user_name" placeholder="Your name" autoComplete="name" aria-invalid={Boolean(errors.user_name)} aria-describedby={errors.user_name ? "contact-name-error" : undefined} />
                  <p className="form_error" id="contact-name-error" role={errors.user_name ? "alert" : undefined}>{errors.user_name?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <div className="input-group-meta form-group mb-40">
                  <label htmlFor="contact-email">Email*</label>
                  <input id="contact-email" type="email" {...register("user_email")} placeholder="Email address" name="user_email" autoComplete="email" aria-invalid={Boolean(errors.user_email)} aria-describedby={errors.user_email ? "contact-email-error" : undefined} />
                  <p className="form_error" id="contact-email-error" role={errors.user_email ? "alert" : undefined}>{errors.user_email?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <div className="input-group-meta form-group mb-35">
                  <label htmlFor="contact-message">Message*</label>
                  <textarea id="contact-message" {...register("message")} placeholder="Tell us how we can help" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined}></textarea>
                  <p className="form_error" id="contact-message-error" role={errors.message ? "alert" : undefined}>{errors.message?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <div className="mb-25" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 10, alignItems: "start" }}>
                  <input id="contact-privacy" type="checkbox" {...register("privacyAccepted")} aria-invalid={Boolean(errors.privacyAccepted)} aria-describedby={errors.privacyAccepted ? "contact-privacy-error" : undefined} style={{ width: 20, height: 20, marginTop: 3 }} />
                  <div>
                     <label htmlFor="contact-privacy" style={{ color: "#334155", fontSize: 14, lineHeight: 1.6 }}>
                        I understand that DG Property will use these details to respond to this message, as explained in the <Link href="/privacy-policy" style={{ textDecoration: "underline" }}>Privacy Policy</Link>.*
                     </label>
                     <p className="form_error" id="contact-privacy-error" role={errors.privacyAccepted ? "alert" : undefined}>{errors.privacyAccepted?.message}</p>
                  </div>
               </div>
            </div>
            <div className="col-12">
               <button type='submit' className="btn-nine text-uppercase rounded-3 fw-normal w-100" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
               </button>
            </div>
         </div>
      </form>
   )
}

export default ContactForm
