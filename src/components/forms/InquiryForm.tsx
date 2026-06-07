"use client";

import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { submitPublicInquiry } from "@/utils/dashboardApi";

type InquiryTypeId =
   | "lease-commercial"
   | "investment"
   | "development-land"
   | "fuel-station"
   | "sell-property"
   | "viewing"
   | "general";

type InquiryType = {
   id: InquiryTypeId;
   label: string;
   icon: string;
   blurb: string;
};

const INQUIRY_TYPES: InquiryType[] = [
   {
      id: "lease-commercial",
      label: "Lease commercial space",
      icon: "bi-building",
      blurb: "Retail, office, industrial or warehouse leasing.",
   },
   {
      id: "investment",
      label: "Investment opportunity",
      icon: "bi-graph-up-arrow",
      blurb: "Income-producing or off-market commercial property.",
   },
   {
      id: "development-land",
      label: "Development land",
      icon: "bi-map",
      blurb: "Vacant land for retail, residential or mixed-use.",
   },
   {
      id: "fuel-station",
      label: "Fuel station opportunity",
      icon: "bi-fuel-pump",
      blurb: "Acquire, lease or develop a fuel station site.",
   },
   {
      id: "sell-property",
      label: "Sell or list my property",
      icon: "bi-tag",
      blurb: "Get a valuation and list your property with DG.",
   },
   {
      id: "viewing",
      label: "Schedule a viewing",
      icon: "bi-calendar-event",
      blurb: "Book a walk-through of a listing you've seen.",
   },
   {
      id: "general",
      label: "General question",
      icon: "bi-chat-dots",
      blurb: "Something else. We'll point you to the right person.",
   },
];

const BUDGET_OPTIONS = [
   "Under R10,000 / month",
   "R10,000 to R30,000 / month",
   "R30,000 to R75,000 / month",
   "R75,000 to R150,000 / month",
   "R150,000+ / month",
   "Purchase: Under R5m",
   "Purchase: R5m to R15m",
   "Purchase: R15m to R50m",
   "Purchase: R50m+",
   "Not sure yet",
];

const COMMERCIAL_USES = [
   "Retail",
   "Office",
   "Industrial / warehouse",
   "Showroom",
   "Restaurant / hospitality",
   "Medical",
   "Mixed-use",
   "Other",
];

const INVESTMENT_TYPES = [
   "Retail centre",
   "Office building",
   "Industrial / logistics",
   "Mixed-use",
   "Fuel station",
   "Development opportunity",
   "Open to suggestions",
];

const PROPERTY_TYPES_TO_SELL = [
   "Retail",
   "Office",
   "Industrial",
   "Land",
   "Mixed-use",
   "Fuel station",
   "Other",
];

const PHONE_REGEX = /^[+0-9()\-\s]{7,20}$/;

type FormValues = {
   inquiryType: InquiryTypeId;
   fullName: string;
   email: string;
   phone: string;
   preferredArea?: string;
   sizeSqm?: string;
   budget?: string;
   intendedUse?: string;
   investmentType?: string;
   developmentIntent?: string;
   propertyAddress?: string;
   propertyType?: string;
   askingPrice?: string;
   listingReference?: string;
   preferredDate?: string;
   message: string;
};

const buildSchema = () =>
   yup.object({
      inquiryType: yup
         .mixed<InquiryTypeId>()
         .oneOf(INQUIRY_TYPES.map((t) => t.id))
         .required("Please choose what you're inquiring about."),
      fullName: yup.string().trim().required("Your name is required.").min(2, "Name is too short."),
      email: yup.string().trim().email("Enter a valid email address.").required("Email is required."),
      phone: yup
         .string()
         .trim()
         .required("Phone number is required.")
         .matches(PHONE_REGEX, "Enter a valid phone number."),
      message: yup
         .string()
         .trim()
         .required("Please tell us a little about your inquiry.")
         .min(10, "A few more details would help."),
      preferredArea: yup.string().trim(),
      sizeSqm: yup.string().trim(),
      budget: yup.string().trim(),
      intendedUse: yup.string().trim(),
      investmentType: yup.string().trim(),
      developmentIntent: yup.string().trim(),
      propertyAddress: yup.string().trim(),
      propertyType: yup.string().trim(),
      askingPrice: yup.string().trim(),
      listingReference: yup.string().trim(),
      preferredDate: yup.string().trim(),
   });

const fieldKey = (k: keyof FormValues) => k;

const buildMessageBody = (data: FormValues, typeLabel: string) => {
   const lines: string[] = [];
   lines.push(`Inquiry type: ${typeLabel}`);

   const add = (label: string, value?: string) => {
      if (value && value.trim()) lines.push(`${label}: ${value.trim()}`);
   };

   add("Preferred area", data.preferredArea);
   add("Size required", data.sizeSqm);
   add("Budget", data.budget);
   add("Intended use", data.intendedUse);
   add("Investment type", data.investmentType);
   add("Development intent", data.developmentIntent);
   add("Property address", data.propertyAddress);
   add("Property type", data.propertyType);
   add("Asking price", data.askingPrice);
   add("Listing reference", data.listingReference);
   add("Preferred viewing date", data.preferredDate);

   lines.push("", "Message:", data.message.trim());
   return lines.join("\n");
};

const InquiryForm = () => {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [submitted, setSubmitted] = useState(false);

   const schema = useMemo(buildSchema, []);

   const {
      register,
      handleSubmit,
      reset,
      control,
      watch,
      formState: { errors },
   } = useForm<FormValues>({
      resolver: yupResolver(schema) as any,
      defaultValues: {
         inquiryType: "lease-commercial",
         fullName: "",
         email: "",
         phone: "",
         message: "",
      },
   });

   const activeType = watch("inquiryType");
   const activeTypeDef = INQUIRY_TYPES.find((t) => t.id === activeType) ?? INQUIRY_TYPES[0];

   const onSubmit = async (data: FormValues) => {
      setIsSubmitting(true);
      try {
         await submitPublicInquiry({
            name: data.fullName.trim(),
            email: data.email.trim(),
            phone: data.phone.trim(),
            message: buildMessageBody(data, activeTypeDef.label),
         });
         toast.success("Inquiry sent. We'll get back to you shortly.", { position: "top-center" });
         reset();
         setSubmitted(true);
      } catch (error: any) {
         toast.error(
            error?.response?.data?.error || "Could not send your inquiry. Please try again.",
            { position: "top-center" }
         );
      } finally {
         setIsSubmitting(false);
      }
   };

   if (submitted) {
      return (
         <div className="dg-inquiry-success">
            <div className="dg-inquiry-success__icon">
               <i className="bi bi-check2-circle"></i>
            </div>
            <h3>Thanks. Your inquiry is on its way.</h3>
            <p>
               A member of the DG Property team will review your message and come back to you with the
               right next step. Most replies go out within one business day.
            </p>
            <button type="button" className="dg-inquiry-success__btn" onClick={() => setSubmitted(false)}>
               Send another inquiry
            </button>
         </div>
      );
   }

   return (
      <form className="dg-inquiry-form" onSubmit={handleSubmit(onSubmit)} noValidate>
         <div className="dg-inquiry-form__head">
            <p className="dg-inquiry-form__eyebrow">Step 1</p>
            <h3>What can we help you with?</h3>
            <p className="dg-inquiry-form__lead">
               Pick the option closest to your question. We&apos;ll only ask for the details that matter.
            </p>
         </div>

         <Controller
            name="inquiryType"
            control={control}
            render={({ field }) => (
               <div className="dg-inquiry-types" role="radiogroup" aria-label="Inquiry type">
                  {INQUIRY_TYPES.map((type) => {
                     const checked = field.value === type.id;
                     return (
                        <label
                           key={type.id}
                           className={`dg-inquiry-type${checked ? " is-active" : ""}`}
                        >
                           <input
                              type="radio"
                              name={field.name}
                              value={type.id}
                              checked={checked}
                              onChange={() => field.onChange(type.id)}
                           />
                           <span className="dg-inquiry-type__icon">
                              <i className={`bi ${type.icon}`}></i>
                           </span>
                           <span className="dg-inquiry-type__body">
                              <span className="dg-inquiry-type__label">{type.label}</span>
                              <span className="dg-inquiry-type__blurb">{type.blurb}</span>
                           </span>
                        </label>
                     );
                  })}
               </div>
            )}
         />
         {errors.inquiryType && <p className="dg-inquiry-error">{errors.inquiryType.message}</p>}

         <div className="dg-inquiry-form__head dg-inquiry-form__head--mid">
            <p className="dg-inquiry-form__eyebrow">Step 2</p>
            <h3>A few details about you</h3>
         </div>

         <div className="dg-inquiry-grid">
            <div className="dg-field">
               <label htmlFor="fullName">Full name *</label>
               <input id="fullName" type="text" placeholder="e.g. Jane Smith" {...register("fullName")} />
               {errors.fullName && <p className="dg-inquiry-error">{errors.fullName.message}</p>}
            </div>

            <div className="dg-field">
               <label htmlFor="email">Email *</label>
               <input id="email" type="email" placeholder="you@example.com" {...register("email")} />
               {errors.email && <p className="dg-inquiry-error">{errors.email.message}</p>}
            </div>

            <div className="dg-field">
               <label htmlFor="phone">Phone *</label>
               <input id="phone" type="tel" placeholder="+27 ..." {...register("phone")} />
               {errors.phone && <p className="dg-inquiry-error">{errors.phone.message}</p>}
            </div>
         </div>

         <div className="dg-inquiry-form__head dg-inquiry-form__head--mid">
            <p className="dg-inquiry-form__eyebrow">Step 3</p>
            <h3>About your {activeTypeDef.label.toLowerCase()}</h3>
         </div>

         {(activeType === "lease-commercial" || activeType === "investment" || activeType === "development-land" || activeType === "fuel-station") && (
            <div className="dg-inquiry-grid">
               <div className="dg-field">
                  <label htmlFor={fieldKey("preferredArea")}>Preferred area / suburb</label>
                  <input
                     id={fieldKey("preferredArea")}
                     type="text"
                     placeholder="e.g. Bedfordview, Sandton, East Rand"
                     {...register("preferredArea")}
                  />
               </div>

               {(activeType === "lease-commercial" || activeType === "development-land") && (
                  <div className="dg-field">
                     <label htmlFor={fieldKey("sizeSqm")}>
                        Size required {activeType === "development-land" ? "(sqm or hectares)" : "(sqm)"}
                     </label>
                     <input
                        id={fieldKey("sizeSqm")}
                        type="text"
                        placeholder="e.g. 250 sqm"
                        {...register("sizeSqm")}
                     />
                  </div>
               )}

               <div className="dg-field">
                  <label htmlFor={fieldKey("budget")}>Budget range</label>
                  <select id={fieldKey("budget")} defaultValue="" {...register("budget")}>
                     <option value="">Select a range</option>
                     {BUDGET_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                     ))}
                  </select>
               </div>

               {activeType === "lease-commercial" && (
                  <div className="dg-field">
                     <label htmlFor={fieldKey("intendedUse")}>Intended use</label>
                     <select id={fieldKey("intendedUse")} defaultValue="" {...register("intendedUse")}>
                        <option value="">Select a use</option>
                        {COMMERCIAL_USES.map((opt) => (
                           <option key={opt} value={opt}>{opt}</option>
                        ))}
                     </select>
                  </div>
               )}

               {activeType === "investment" && (
                  <div className="dg-field">
                     <label htmlFor={fieldKey("investmentType")}>Investment type</label>
                     <select id={fieldKey("investmentType")} defaultValue="" {...register("investmentType")}>
                        <option value="">Select a type</option>
                        {INVESTMENT_TYPES.map((opt) => (
                           <option key={opt} value={opt}>{opt}</option>
                        ))}
                     </select>
                  </div>
               )}

               {activeType === "development-land" && (
                  <div className="dg-field dg-field--full">
                     <label htmlFor={fieldKey("developmentIntent")}>Planned development</label>
                     <input
                        id={fieldKey("developmentIntent")}
                        type="text"
                        placeholder="e.g. neighbourhood retail centre, residential estate"
                        {...register("developmentIntent")}
                     />
                  </div>
               )}
            </div>
         )}

         {activeType === "sell-property" && (
            <div className="dg-inquiry-grid">
               <div className="dg-field dg-field--full">
                  <label htmlFor={fieldKey("propertyAddress")}>Property address</label>
                  <input
                     id={fieldKey("propertyAddress")}
                     type="text"
                     placeholder="Street, suburb, city"
                     {...register("propertyAddress")}
                  />
               </div>
               <div className="dg-field">
                  <label htmlFor={fieldKey("propertyType")}>Property type</label>
                  <select id={fieldKey("propertyType")} defaultValue="" {...register("propertyType")}>
                     <option value="">Select a type</option>
                     {PROPERTY_TYPES_TO_SELL.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                     ))}
                  </select>
               </div>
               <div className="dg-field">
                  <label htmlFor={fieldKey("askingPrice")}>Asking price (if any)</label>
                  <input
                     id={fieldKey("askingPrice")}
                     type="text"
                     placeholder="e.g. R12,500,000"
                     {...register("askingPrice")}
                  />
               </div>
            </div>
         )}

         {activeType === "viewing" && (
            <div className="dg-inquiry-grid">
               <div className="dg-field">
                  <label htmlFor={fieldKey("listingReference")}>Listing reference / address</label>
                  <input
                     id={fieldKey("listingReference")}
                     type="text"
                     placeholder="DG-1234 or property address"
                     {...register("listingReference")}
                  />
               </div>
               <div className="dg-field">
                  <label htmlFor={fieldKey("preferredDate")}>Preferred date</label>
                  <input
                     id={fieldKey("preferredDate")}
                     type="date"
                     {...register("preferredDate")}
                  />
               </div>
            </div>
         )}

         <div className="dg-field dg-field--full">
            <label htmlFor="message">Your message *</label>
            <textarea
               id="message"
               rows={5}
               placeholder="Share anything else that would help us prepare for the conversation..."
               {...register("message")}
            />
            {errors.message && <p className="dg-inquiry-error">{errors.message.message}</p>}
         </div>

         <button type="submit" className="dg-inquiry-submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send my inquiry"}
         </button>
      </form>
   );
};

export default InquiryForm;
