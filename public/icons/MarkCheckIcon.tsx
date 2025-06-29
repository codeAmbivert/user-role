import { SVGProps } from "react";

const MarkCheckIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={props.width || 10}
      height={props.height || 7}
      viewBox="0 0 10 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.33335 1.5L3.75002 6.08333L1.66669 4"
        stroke={props.color || "currentColor"}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MarkCheckIcon;
