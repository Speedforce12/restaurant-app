import * as React from "react";
import { toast, ToastBar, Toaster } from "react-hot-toast";
import { HiX } from "react-icons/hi";

export default function Notification() {
  return (
    <div>
      <Toaster
        reverseOrder={false}
        position='top-center'
        toastOptions={{
          style: {
            borderRadius: "8px",
            maxWidth: "512px",
            width: "100%",
          },
        }}>
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message, visible }) => (
              <>
                <div
                  className={`${
                    visible ? "animate-enter" : "animate-leave"
                  } pointer-events-auto flex w-full  max-w-lg`}>
                  <div className='w-0 flex-1 p-4'>
                    <div className='flex items-start'>
                      <div className='flex-shrink-0 items-center justify-center pt-0.5'>
                        {icon}
                      </div>
                      <div className='ml-3 flex-1'>
                        <p className='text-base font-bold text-gray-900'>
                          {message}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='flex border-l border-gray-200'>
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className='flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:text-indigo-500'>
                      Close
                    </button>
                  </div>
                </div>
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </div>
  );
}
