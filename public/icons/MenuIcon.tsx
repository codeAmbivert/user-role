import { SVGProps } from "react";

const MenuIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={props.width || "20"}
      height={props.height || "15"}
      viewBox="0 0 20 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 7.5H15M1 1.5H19M1 13.5H19"
        stroke={props.color || "#101828"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MenuIcon;
