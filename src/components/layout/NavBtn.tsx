import { usePathname} from "next/navigation";
import Link from "next/link";
interface LinkProps {
  link: {
    label: string;
    icon: React.ReactNode;
    path: string;
    notification?: string;
  };
}
const NavBtn = ({ link }: LinkProps) => {
  const pathname = usePathname();
  return (
    <Link
      href={link.path}
      className={`${
        pathname.includes(link.path) ? "bg-[#F9FAFB]" : "hover:bg-[#F9FAFB]"
      } h-[40px] px-3 flex items-center justify-between gap-3 rounded-lg cursor-pointer text-[#344054]`}
    >
      <div className="flex items-center gap-3">
        {link.icon}
        <p className="font-medium text-[#344054]">{link.label}</p>
      </div>
      {link.notification && (
        <div className="bg-[#F2F4F7] px-3 py-1 rounded-full text-xs font-medium text-[#344054]">
          {link.notification}
        </div>
      )}
    </Link>
  );
};

export default NavBtn;
