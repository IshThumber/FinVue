import { Avatar, Navbar, Typography } from "@material-tailwind/react";
import React from "react";
import profile from "../assets/profile.png";

// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
function NavList() {
    return (
        <ul className="bg-red-300 my-1 flex flex-col gap-1 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="py-2 ml-3 font-sans"
            >
                Ish
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="py-2 font-medium"
            >
                <a
                    href="/"
                    className="flex items-center hover:text-blue-700 transition-colors"
                >
                    <Avatar src={profile} alt="avatar" size="sm" />
                </a>
            </Typography>
        </ul>
    );
}

const NavbarSimple = () => {
    return (
        <Navbar className="bg-green-200 h-max max-w-full mx-auto p rounded-none border-none shadow-none">
            <div className="font-sans flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="/"
                    variant="h6"
                    className="flex flex-row items-center gap-2 font-sans mr-4 py-1.5"
                >
                    FinVue
                </Typography>
                <div className="hidden lg:block">
                    <NavList />
                </div>
            </div>
            {/* <Collapse open={openNav}>
        <NavList />
      </Collapse> */}
        </Navbar>
    );
};

export default NavbarSimple;
