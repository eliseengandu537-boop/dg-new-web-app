"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation"; 
import { AUTH_API_URL } from "@/utils/api";


import OpenEye from "@/assets/images/icon/icon_68.svg";

interface FormData {
  name: string;
  email: string;
  password: string;
  termsAccepted: boolean;
}

const RegisterForm = () => {
  const router = useRouter(); 

  const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup.string().required("Password is required").min(8, "Use at least 8 characters"),
    termsAccepted: yup
      .boolean()
      .oneOf([true], "You must accept the terms and conditions") 
      .required(),
  })
  .required();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${AUTH_API_URL}/signup`, data);

      if (response.status === 201) {
        localStorage.setItem("dg_token", response.data.token);
        localStorage.setItem("dg_user", JSON.stringify(response.data.user));
        toast.success("Account created! Redirecting to your dashboard...", {
          position: "top-center",
        });
        reset();
        setTimeout(() => router.push("/dashboard/client"), 1500);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Error during registration", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label htmlFor="register-name">Name*</label>
            <input id="register-name" type="text" autoComplete="name" {...register("name")} placeholder="Your name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "register-name-error" : undefined} />
            <p id="register-name-error" className="form_error" role={errors.name ? "alert" : undefined}>{errors.name?.message}</p>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label htmlFor="register-email">Email*</label>
            <input id="register-email" type="email" autoComplete="email" {...register("email")} placeholder="you@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "register-email-error" : undefined} />
            <p id="register-email-error" className="form_error" role={errors.email ? "alert" : undefined}>{errors.email?.message}</p>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-20">
            <label htmlFor="register-password">Password*</label>
            <input
              id="register-password"
              type={isPasswordVisible ? "text" : "password"}
              autoComplete="new-password"
              {...register("password")}
              placeholder="Enter Password"
              className="pass_log_id"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "register-password-error" : undefined}
            />
            <span className="placeholder_icon">
              <button type="button" className={`passVicon ${isPasswordVisible ? "eye-slash" : ""}`} onClick={togglePasswordVisibility} aria-label={isPasswordVisible ? "Hide password" : "Show password"}>
                <Image src={OpenEye} alt="" aria-hidden="true" />
              </button>
            </span>
            <p id="register-password-error" className="form_error" role={errors.password ? "alert" : undefined}>{errors.password?.message}</p>
          </div>
        </div>
        <div className="col-12">
          <div className="agreement-checkbox d-flex justify-content-between align-items-center">
            <div>
              <input type="checkbox" id="termsAccepted" {...register("termsAccepted")} />
              <label htmlFor="termsAccepted">
                By hitting the &quot;Register&quot; button, you agree to the{" "}
                <Link href="/terms-and-conditions">Terms &amp; Conditions</Link> &{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>
              </label>
              <p className="form_error">{errors.termsAccepted?.message}</p>
            </div>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn-two w-100 text-uppercase d-block mt-20" disabled={loading}>
            {loading ? "Signing up..." : "SIGN UP"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
