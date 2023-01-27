import { IoSettingsOutline } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
import { Popover } from "@headlessui/react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";


function UserIcon() {
    const { data: session } = useSession();
console.log(session)
    return (
      <div className='h-10 w-10 rounded-md bg-[#F9F8F5] p-1.5'>
        <Popover className='relative flex'>
          <Popover.Button className='cursor-pointer rounded-md shadow-lg hover:bg-gray-100 '>
            <Image
              height={40}
              width={40}
              src={session?.user?.image || "/images/avatar.png"}
              alt='avatar'
              className='rounded-md object-cover'
            />
          </Popover.Button>
          <Popover.Panel className='absolute -right-6 top-8 z-[5] my-4 w-56 list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-[#F9F8F5]'>
            <div className='py-3 px-4'>
              <span className='block text-sm font-bold text-gray-900 dark:text-gray-800'>
                {session?.user?.name || session?.user?.email}
              </span>
            </div>
            <ul
              className='py-1 font-light text-gray-500 dark:text-gray-400'
              aria-labelledby='dropdown'>
              <li>
                <a
                  href='#'
                  className='block py-2 px-4 text-sm font-semibold text-gray-700 hover:bg-[#F0E4A9] dark:hover:text-orange-500'
                  onClick={() => signIn()}>
                  Account settings
                </a>
              </li>
            </ul>

            <ul
              className='py-1 font-light text-gray-500 dark:text-gray-400'
              aria-labelledby='dropdown'>
              <li>
                <Link
                  href='/#'
                  onClick={() => signOut()}
                  className='block py-2 px-4 text-sm font-semibold text-gray-700 hover:bg-[#F0E4A9] dark:hover:text-orange-500'>
                  Sign out
                </Link>
              </li>
            </ul>
          </Popover.Panel>
        </Popover>
      </div>
    );
}

export default UserIcon;
