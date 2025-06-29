import EmailIcon from "../../../public/icons/EmailIcon";
import MarkCheckIcon from "../../../public/icons/MarkCheckIcon";
import PlusIcon from "../../../public/icons/PlusIcon";
import UsersIcon from "../../../public/icons/UsersIcon";
import InputField from "../shared/InputField";
import UserRoleTable from "../shared/UserRoleTable";

const UserRoleDetails = () => {
  const roles = [
    { name: "Superadmin", lastActive: "Last active 06/2023", active: true },
    { name: "Developeradmin", lastActive: "Last active 01/2023" },
    { name: "Supportadmin", lastActive: "Last active 01/2023" },
  ];

  return (
    <div>
      <h3 className="text-[18px] font-medium text-[#101828]">User Roles</h3>
      <p className="text-[14px] text-[#667085] pb-4">
        Update your roles details and information.
      </p>
      <div className="flex flex-wrap py-4 border-t border-b border-gray-200 gap-5">
        <div className="text-[14px]">
          <p className="font-medium text-[#344054]">Connected email</p>
          <p className="text-[#667085]">Select role account</p>
        </div>
        <div className="flex-1 text-sm">
          <div className="flex items-start">
            <input type="radio" className="mr-2 accent-[#7F56D9]" />
            <label className="-mt-1">
              <p className="text-[#101828] font-medium">My account</p>
              <p className="text-[#667085]">olivia@untitledui.com</p>
            </label>
          </div>
          <div className="flex items-start mt-4">
            <input type="radio" className="mr-2 accent-[#7F56D9]" />
            <label className="-mt-1">
              <p className="text-[#101828] font-medium mb-1">
                An alternative email
              </p>
              <InputField
                name="email"
                placeholder="Enter email address"
                value="billing@untitledui.com"
                startIcon={<EmailIcon color="#667085" />}
                onChange={() => {}}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap py-4 border-b border-gray-200 gap-5">
        <div className="text-[14px]">
          <p className="font-medium text-[#344054]">Active Role</p>
          <p className="text-[#667085]">
            Select active role available to the user.
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-3 text-sm">
          {roles.map((role, index) => (
            <div
              key={index}
              className={`p-3 flex gap-3 items-start justify-between rounded-md border cursor-pointer ${
                role.active
                  ? "bg-[#F9F5FF] border-[#D6BBFB]"
                  : "bg-white border-[#EAECF0] hover:border-[#D6BBFB]"
              }`}
            >
              <div className="flex gap-3 items-start text-[14px]">
                <div className="border border-[#F2F4F7] h-[32px] w-[46px] flex items-center justify-center rounded-md bg-white">
                  <UsersIcon width={22} height={18} color="#667085" />
                </div>
                <div
                  className={`flex-1 ${
                    role.active ? "text-[#53389E]" : "text-[#70798C]"
                  }`}
                >
                  <p className="font-medium">{role.name}</p>
                  <p className="mb-1">{role.lastActive}</p>
                  <div className="flex gap-2">
                    <p className="">Set as default</p>
                    <p className="font-medium text-[#53389E]">Edit</p>
                  </div>
                </div>
              </div>
              {role.active ? (
                <div className="h-[16px] w-[16px] rounded-full border border-[#6941C6] bg-[#6941C6] font-medium flex items-center justify-center text-white">
                  <MarkCheckIcon />
                </div>
              ) : (
                <div className="h-[16px] w-[16px] rounded-full border text-[#D0D5DD] font-medium" />
              )}
            </div>
          ))}
          <div className="flex items-center gap-2 text-[#667085] font-medium cursor-pointer">
            <PlusIcon /> Add role to user
          </div>
        </div>
      </div>

      <div className="mt-8">
        <UserRoleTable />
      </div>
    </div>
  );
};

export default UserRoleDetails;
