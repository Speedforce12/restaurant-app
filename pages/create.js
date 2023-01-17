import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Loader from "@/components/Loader";
import { storage } from "@/firebase/firebase";

const schema = yup
  .object({
    name: yup.string().required(),
    price: yup.number().positive().required(),
    categories: yup.string().required(),
    calories: yup.number().positive(),
  })
  .required();

const create = () => {
  const [progress, setProgress] = useState(0);
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // upload images to firebase
  const uploadImage = (e) => {
    setLoading(true);
    const file = e.target[0]?.files[0];
    if (!file) return;
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploaded = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(uploaded);
      },
      (error) => {
        console.log(error);
        setLoading(false);
        toast.error("Something went wrong while uploading image: Try again");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
          setLoading(false);
          toast.success("Image uploaded successfully");
        });
      }
    );
  };

  // delete images from firebase
  const deleteImages = () => {
    setLoading(true);
    const deleteRef = ref(storage, imgUrl);

    // Delete the file
    deleteObject(deleteRef)
      .then(() => {
        // image deleted successfully
        setImgUrl(null);
        setLoading(false);
        toast.success("Image deleted successfully");
      })
      .catch((error) => {
        // error handling
        console.log(error);
        setLoading(false);
        toast.error("Unexpected error while deleting");
      });
  };

  const onSubmit = (data) => console.log(data);
  return (
    <div className='mx-auto my-auto flex  w-full max-w-4xl flex-col items-center justify-center p-3'>
      <h1 className='text-center text-3xl font-bold text-orange-600'>
        Create A New Dish
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='my-12 flex min-h-[460px] w-4/5 flex-col space-y-8 rounded-md border border-gray-300 p-5'>
        <div className='flex items-center space-x-2'>
          <MdFoodBank className='text-2xl text-gray-500' />
          <input
            className='w-full rounded-md border-b-2 bg-[#F9F8F5] p-2 text-orange-600 focus:outline-[#F0E4A9]'
            type='text'
            {...register("name")}
            placeholder='Give me a dish name'
          />
        </div>
        <div className='flex items-center space-x-2'>
          <BiFoodMenu className='text-2xl text-gray-500' />
          <select
            type='text'
            {...register("categories")}
            className='w-full cursor-pointer rounded-lg bg-[#F9F8F5] p-2 text-orange-600'>
            <option value='default' hidden='hidden'>
              Select a category
            </option>
            <option value='Curry'>Curry</option>
            <option value='Rice'>Rice</option>
            <option value='Fish Meat'>Fish Meat</option>
            <option value='Drinks'>Drinks</option>
            <option value='Ice cream'>Ice cream</option>
          </select>
        </div>
        <div className='h-225 md:h-340 group flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dotted border-gray-300'>
          {loading ? (
            <Loader />
          ) : (
            <>
              {imgUrl ? (
                <div className='relative h-full'>
                  <img src={imgUrl} className='h-full  w-full object-cover' />

                  <button
                    type='button'
                    className='absolute bottom-3 right-3 cursor-pointer rounded-full bg-red-500 p-3 text-xl outline-none transition-all  duration-500 ease-in-out hover:shadow-md'>
                    <MdDelete className='text-white' />
                  </button>
                </div>
              ) : (
                <>
                  <label className='flex h-full w-full cursor-pointer flex-col items-center justify-center'>
                    <div className='flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg'>
                      <MdCloudUpload className='text-3xl text-gray-500 hover:text-gray-700' />
                      <p className='text-gray-500 hover:text-gray-700'>
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type='file'
                      name='picture'
                      accept='image/*'
                      onChange={uploadImage}
                      {...register("picture")}
                      className='h-0 w-0'
                    />
                  </label>
                </>
              )}
            </>
          )}
        </div>
        <div className='flex items-center space-x-2'>
          <MdAttachMoney className='text-2xl text-gray-500' />
          <input
            type='text'
            {...register("price")}
            placeholder='Price'
            className='w-full rounded-md border-b-2 bg-[#F9F8F5] p-2 text-orange-600 focus:outline-[#F0E4A9]'
          />
        </div>
        <div className='flex w-full items-center space-x-2'>
          <MdFastfood className='text-2xl text-gray-500' />
          <input
            type='text'
            {...register("calories")}
            placeholder='Calories'
            className='w-full rounded-md border-b-2 bg-[#F9F8F5] p-2 text-orange-600 focus:outline-[#F0E4A9]'
          />
        </div>

        <div className='flex items-center justify-center'>
          <button
            type='submit'
            className='rounded-md bg-green-400 px-4 py-2 font-bold text-white hover:bg-green-600'>
            {progress ? `${progress}% Uploaded` : "Save Dish"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default create;
