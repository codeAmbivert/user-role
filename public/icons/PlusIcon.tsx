import { SVGProps } from "react";

const PlusIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={props.width || 14}
      height={props.height || 14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7 1.16667V12.8333M1.16667 7H12.8333"
        stroke={props.color || "currentColor"}
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlusIcon;
