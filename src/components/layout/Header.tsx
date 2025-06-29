import LogoIcon from "../../../public/icons/LogoIcon";
import MenuIcon from "../../../public/icons/MenuIcon";

interface HeaderProps {
  // openMenu?: boolean;
  setOpenMenu?: (state: boolean) => void;
}

const Header = ({ setOpenMenu }: HeaderProps) => {
  return (
    <div className="h-[63px] w-full bg-white flex items-center justify-between px-5">
      <div className="flex items-center gap-2">
        <LogoIcon />
        <p className="text-xl font-medium">Untitled UI</p>
      </div>
      <MenuIcon
        color="#667085"
        className="cursor-pointer"
        onClick={() => setOpenMenu?.(true)}
      />
    </div>
  );
};

export default Header;
