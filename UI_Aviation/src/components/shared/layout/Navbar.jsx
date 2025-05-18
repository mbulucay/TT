import React, { Fragment } from "react";
import {
  HiOutlineBell,
  HiOutlineSearch,
  HiOutlineChatAlt,
} from "react-icons/hi";
import { Menu, Popover, Transition } from "@headlessui/react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div
      className={`bg-blue-200/90 h-24 md:h-16 px-4 py-1 items-end md:items-center border-b border-gray-200 justify-between flex flex-col md:flex-row sm:mr-8 md:mr-0`}
    >
      <div className="relative ">
        <HiOutlineSearch
          fontSize={20}
          className="text-blue-400/100 absolute top-1/2 left-3 -translate-y-1/2 shadow-md bg-white"
        />

        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[17rem] h-10 pl-11 pr-4 rounded-sm shadow-md"
        ></input>
      </div>

      <div className={`flex mt-2 gap-2`}>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`${open ? "bg-blue-200" : ""} group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100`}
              >
                <HiOutlineChatAlt color="black" fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-3 transform w-80">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-medium">
                      Messages
                    </strong>
                    <div className="mt-2 py-1 text-sm">
                      This is messages panel.
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`${open ? "bg-blue-200" : ""} group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100`}
              >
                <HiOutlineBell color="black" fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-3 transform w-80">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-medium">
                      Notifications
                    </strong>
                    <div className="mt-2 py-1 text-sm">
                      This is notification panel.
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        <Menu as="div" className="relative">
          <div>
            <Menu.Button className="ml-2 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
              <span className="sr-only">Open user menu</span>
              <div
                className="h-10 w-10 rounded-full bg-blue-200 bg-cover bg-no-repeat bg-center ring-2 ring-offset-2 ring-black shadow-2xl shadow-black"
                style={{
                  backgroundImage:
                    'url("data:image/jpeg;base64,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")',
                }}
              >
                <span className="sr-only">Marc Backes</span>
              </div>
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
            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2.5 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate("/profile")}
                    className={classNames(
                      active && "bg-gray-100",
                      "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                    )}
                  >
                    Your Profile
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate("/settings")}
                    className={classNames(
                      active && "bg-gray-100",
                      "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                    )}
                  >
                    Settings
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active && "bg-gray-100",
                      "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                    )}
                  >
                    Sign out
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}

export default Navbar;
