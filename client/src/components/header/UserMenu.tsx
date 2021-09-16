import { Link } from "react-router-dom";
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { FiLogOut } from 'react-icons/fi';
import { ImUser } from "react-icons/im";
import { IoMdArrowDropdown } from "react-icons/io";

export default function UserMenu() {
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-between items-center w-full px-2 py-1 font-medium sm:text-lg text-gray-400 rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <span className="h-8 w-8 bg-ro rounded-full"></span>
            <span className="ml-1 mt-1 text-xl"><IoMdArrowDropdown/></span>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-44 sm:w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {() => (
                  <Link to="/"
                    className={`hover:bg-gray-100 group flex rounded-md text-gray-700 items-center w-full px-2 py-2 text-sm`}
                  >
                    <span className="mr-8 sm:text-2xl"><ImUser/></span>
                    <span className="sm:text-lg">Profile</span>
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {() => (
                  <button
                    className={`hover:bg-gray-100 group flex rounded-md items-center text-gray-700 w-full px-2 py-2 text-sm`}
                  >
                    <span className="mr-8 sm:text-2xl"><FiLogOut/></span>
                    <span className="sm:text-lg">Logout</span>
                  </button>
                )}
              </Menu.Item>
            </div>
            
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
};