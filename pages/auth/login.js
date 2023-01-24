import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { signIn } from "next-auth/react";


const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      PASSWORD_REGEX,
      "Must Contain 6 Characters, One UpperCase Letter, OneLowercase Letter, One Number and One Special Case Character"
    )
    .required("No password provided."),
});


const login = () => {

        const {
          register,
          handleSubmit,
          formState: { errors },
          setValue,
          reset,
        } = useForm({
          mode: "all",
          resolver: yupResolver(schema),
        });

        const onSubmit = (data) => {
          console.log(data);
    };
    

  return (
    <div className='mx-auto flex h-screen  max-w-xl items-center p-5'>
      <div className='flex w-full flex-col items-center justify-center space-y-4 rounded-lg border-2 bg-white p-4 shadow-md'>
        <h2 className='text-2xl font-bold text-gray-700'>Welcome Back👋!</h2>

        <form
          className='mt-4 flex w-full flex-col items-center justify-center space-y-5'
          onSubmit={handleSubmit(onSubmit)}>
          <p className='text-sm font-normal text-gray-500'>
            Please fill out the fields
          </p>
          <button
            onClick={() => signIn("google")}
            className='flex  items-center justify-center rounded-xl border border-gray-300 py-2 px-4  md:w-2/5'
            type='button'>
            <FcGoogle className='mr-2 text-xl' />
            Log In with Google
          </button>

          <div class='flex w-3/5 items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300'>
            <p class='mx-4 mb-0 text-center font-semibold'>Or</p>
          </div>

          <div className='flex w-full flex-col space-y-4 p-5'>
            <div className='w-full'>
              <label
                htmlFor='Email'
                className={` ${
                  errors.email ? "text-rose-600" : "text-gray-600"
                }   block font-semibold `}>
                {errors.email ? errors.email.message : "Email"}
              </label>
              <input
                type='email'
                className={` ${
                  errors.email ? "animate-shake border-red-400" : ""
                } sign-input`}
                placeholder='Email'
                {...register("email")}
              />
            </div>
            <div className='w-full'>
              <label
                htmlFor='username'
                className={` ${
                  errors.password ? "text-rose-600" : "text-gray-600"
                }   block font-semibold `}>
                {errors.password ? errors.password.message : "Password"}
              </label>
              <input
                type='password'
                className={` ${
                  errors.password ? "animate-shake border-red-400" : ""
                } sign-input`}
                placeholder='password'
                {...register("password")}
              />
            </div>
          </div>

          <motion.button
            whileTap={{ scale: "0.85" }}
            transition={{ duration: "2" }}
            className='rounded-lg bg-yellow-200 px-4  py-2 text-lg font-extrabold capitalize text-yellow-800 drop-shadow-md'>
            Login
          </motion.button>
        </form>
        <span className='text-sm text-gray-400'>
          Don't have an account?
          <Link
            className='pl-2 font-bold text-orange-400'
            href='/auth/register'>
            SignUp
          </Link>
        </span>
      </div>
    </div>
  );
};

export default login;
