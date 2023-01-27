import { FcGoogle } from "react-icons/fc"
import * as yup from "yup"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion"
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { createUser } from "@/lib/helpers";
import { toast } from "react-hot-toast";

const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;

const schema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      PASSWORD_REGEX,
      "Must Contain 6 Characters, One UpperCase Letter, OneLowercase Letter, One Number and One Special Case Character"
    )
    .required("No password provided."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});



const register = () => {

  const router = useRouter()

    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
    } = useForm({
      mode: "onBlur",
      resolver: yupResolver(schema),
    });

  
   const onSubmit = (data) => {
     const user = createUser(data)
     if (user.data) {
       toast.success("User created successfully")
     }
     router.push("/auth/login")
  };


  return (
    <div className='mx-auto flex h-screen  md:mt-0  max-w-xl items-center p-5'>
      <div className='flex w-full flex-col items-center justify-center space-y-4 rounded-lg border-2 bg-white p-4 shadow-md'>
        <h2 className='text-2xl font-bold text-gray-700'>
          Nice to meet you! 🎊
        </h2>

        <form
          className='mt-4 flex w-full flex-col items-center justify-center space-y-2'
          onSubmit={handleSubmit(onSubmit)}>
          <p className='text-sm font-normal text-gray-500'>
            Please fill out the fields
          </p>
  
          <div className='flex w-full flex-col space-y-4 p-5'>
            <div className='w-full'>
              <label
                htmlFor='username'
                className={` ${
                  errors.username ? "text-rose-600" : "text-gray-600"
                }   block font-semibold `}>
                {errors.username ? errors.username.message : "Username"}
              </label>
              <input
                type='text'
                className={` ${
                  errors.username ? "animate-shake border-red-400" : ""
                } sign-input`}
                placeholder='Username'
                {...register("username")}
              />
            </div>
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
            <div className='w-full'>
              <label
                htmlFor='username'
                className={` ${
                  errors.confirmPassword ? "text-rose-600" : "text-gray-600"
                }   block font-semibold `}>
                {errors.confirmPassword
                  ? errors.confirmPassword.message
                  : "Confirm Password"}
              </label>

              <input
                type='password'
                className={` ${
                  errors.confirmPassword ? "animate-shake border-red-400" : ""
                } sign-input`}
                placeholder='confirm Password'
                {...register("confirmPassword")}
              />
            </div>
          </div>

          <motion.button
            whileTap={{ scale: "0.85" }}
            transition={{ duration: "2" }}
            className='rounded-lg bg-yellow-200 px-4  py-2 text-lg font-extrabold capitalize text-yellow-800 drop-shadow-md'>
            Register
          </motion.button>
        </form>

        <span className='text-sm text-gray-400'>
          Already has an account
          <Link className='pl-2 font-bold text-orange-400' href='/auth/login'>
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default register;
