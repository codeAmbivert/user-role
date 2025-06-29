import { SVGProps } from "react";

const ArrowDownIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={props.width || "12"}
      height={props.height || "12"}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.00004 1.33334V10.6667M6.00004 10.6667L10.6667 6.00001M6.00004 10.6667L1.33337 6.00001"
        stroke={props.color || "currentColor"}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowDownIcon;
