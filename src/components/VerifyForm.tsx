"use client";

import { Auth } from "@aws-amplify/auth";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Formik
      initialValues={{ email: searchParams.get("email"), code: "" }}
      validate={(values) => {
        const errors: { email?: string } = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        // console.log("HELLO");
        try {
          await Auth.confirmSignUp(values.email, values.code);
          router.push("/");
        } catch (error) {
          setErrors({ code: error.message });
        }
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="w-96 rounded-md bg-stone-50 shadow-md p-10 mx-auto"
        >
          <div className="grid grid-col-6 gap-6">
            <div className="col-span-6 h-24">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email (Username)
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                autoComplete="email"
              />

              <div className="text-red-700 mt-1 block text-sm">
                {errors.email && touched.email && errors.email}
              </div>
            </div>
            <div className="col-span-6 h-24">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                OTP Code
              </label>
              <input
                type="text"
                name="code"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.code}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                autoComplete="otp"
              />

              <div className="text-red-700 mt-1 block text-sm">
                {errors.code && touched.code && errors.code}
              </div>
            </div>

            <div className="col-span-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="disabled:cursor-not-allowed disabled:bg-orange-300 rounded-lg text-white px-5 py-2 bg-orange-500 hover:bg-orange-700 duration-150 transform"
              >
                Verify
              </button>
            </div>
            <div className="col-span-3 self-center justify-self-center text-sm hover:underline">
              <Link href="/register" className="">
                Register
              </Link>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}
