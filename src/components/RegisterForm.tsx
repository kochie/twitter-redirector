"use client";

import { Auth } from "@aws-amplify/auth";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  return (
    <Formik
      initialValues={{ email: "", password: "", passwordConfirm: "" }}
      validate={(values) => {
        const errors: { email?: string; password?: string } = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        if (values.password !== values.passwordConfirm) {
          errors.password = "Passwords do not match";
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        // console.log("HELLO");
        try {
          await Auth.signUp({
            username: values.email,
            attributes: {
              email: values.email,
            },
            password: values.password,
            autoSignIn: {
              enabled: true,
            },
          });
          router.push("/verify?email=" + values.email);
        } catch (error) {
          setErrors({ password: error.message });
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
            <div className="col-span-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                autoComplete="password"
              />
            </div>
            <div className="col-span-6">
              <label
                htmlFor="passwordConfirm"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="passwordConfirm"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.passwordConfirm}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                autoComplete="password"
              />

              <div className="text-red-700 mt-1 block text-sm">
                {errors.password && touched.password && errors.password}
              </div>
            </div>

            <div className="col-span-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="disabled:cursor-not-allowed disabled:bg-purple-300 rounded-lg text-white px-5 py-2 bg-purple-500 hover:bg-purple-700 duration-150 transform"
              >
                Register
              </button>
            </div>
            <div className="col-span-3 self-center justify-self-center text-sm hover:underline">
              <Link href="/login" className="">
                Login
              </Link>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}
