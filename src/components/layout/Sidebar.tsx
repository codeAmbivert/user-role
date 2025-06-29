"use client";
import React from "react";
import LogoIcon from "../../../public/icons/LogoIcon";
import InputField from "../shared/InputField";
import SearchIcon from "../../../public/icons/SearchIcon";
import HomeIcon from "../../../public/icons/HomeIcon";
import ChartIcon from "../../../public/icons/ChartIcon";
import StackIcon from "../../../public/icons/StackIcon";
import CheckIcon from "../../../public/icons/CheckIcon";
import UsersIcon from "../../../public/icons/UsersIcon";
import SupportIcon from "../../../public/icons/SupportIcon";
import NavBtn from "./NavBtn";
import Image from "next/image";
import Logout from "../../../public/icons/Logout";
import SettingsIcon from "../../../public/icons/SettingsIcon";

const Sidebar = () => {
  const links = [
    { label: "Home", icon: <HomeIcon />, path: "#" },
    { label: "Dashboard", icon: <ChartIcon />, path: "#", notification: "10" },
    { label: "Projects", icon: <StackIcon />, path: "#" },
    { label: "Tasks", icon: <CheckIcon />, path: "#" },
    { label: "Users", icon: <UsersIcon />, path: "#" },
    { label: "Support", icon: <SupportIcon />, path: "#" },
    { label: "Settings", icon: <SettingsIcon />, path: "/" },
  ];

  return (
    <div className="bg-white py-5 px-4 flex flex-col gap-5 shadow h-screen overflow-hidden">
      <div className="flex items-center gap-2">
        <LogoIcon />
        <p className="text-xl font-medium">Untitled UI</p>
      </div>
      <div className="overflow-y-auto flex flex-col gap-5 hide-scrollbar">
        <InputField
          name="search"
          placeholder="Search"
          startIcon={<SearchIcon color="#667085" height={15} width={15} />}
          onChange={() => {}}
        />
        <div>
          {links.map((link) => (
            <NavBtn key={link.label} link={link} />
          ))}
        </div>
        <div className="bg-[#F9FAFB] rounded-lg p-4 text-sm">
          <h2 className="text-[#101828] font-medium mb-1">
            New Features Available!
          </h2>
          <p className="text-[#667085]">
            Check out the new dashboard view. Pages now load faster.
          </p>
          <div className="w-full aspect-[215:136] my-3">
            <Image
              src="/images/new_feature_img.png"
              alt="New Features"
              width={100}
              height={100}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex items-center gap-3">
            <p className="text-[#667085]">Dismiss</p>
            <p className="text-[#6941C6] font-medium">What&apos;s new?</p>
          </div>
        </div>
        <div className="py-5 border-t border-gray-100 flex items-start justify-between">
          <div className="flex gap items-start gap-2 text-[14px]">
            <div className="w-full h-[40px] aspect-square">
              <Image
                src="/images/user_avatar.png"
                alt="New Features"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-[#101828]">Olivia Rhye</p>
              <p className="text-[#667085]">olivia@untitledui.com</p>
            </div>
          </div>
          <Logout color="#667085" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
