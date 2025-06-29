"use client";
import { useState } from "react";
import UserRoleDetails from "./UserRoleDetails";

const SettingsPageComp = () => {
  const [pageState, setPageState] = useState("roles");

  const page = [
    { label: "My details", value: "roles" },
    { label: "Profile", value: "roles" },
    { label: "Password", value: "roles" },
    { label: "Team", value: "roles" },
    { label: "Plan", value: "roles" },
    { label: "Roles", value: "roles" },
    { label: "Notification", value: "roles" },
    { label: "Integrations", value: "roles" },
    { label: "API", value: "roles" },
  ];

  return (
    <div className="">
      <div className="p-6 pb-5">
        <h2 className="text-[30px] font-medium text-[#101828]">Settings</h2>
        <p className="text-[#667085]">Manage your team and preferences here.</p>
      </div>
      <div className="overflow-hidden">
        <div className="flex overflow-x-auto md:px-6 hide-scrollbar">
          {page.map((item, index) => (
            <button
              className={`py-2 px-4 border border-[#D0D5DD] cursor-pointer text-[14px] whitespace-nowrap ${
                item.label === "Roles" ? "bg-gray-50" : "bg-white"
              } ${index === 0 ? "rounded-tl-lg rounded-bl-lg" : ""} ${
                index === page.length - 1 ? "rounded-tr-lg rounded-br-lg" : ""
              }`}
              key={index}
              onClick={() => setPageState(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {pageState === "roles" && (
          <div className="flex flex-col gap-6">
            <UserRoleDetails />
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPageComp;
