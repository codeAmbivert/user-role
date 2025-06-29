import { SVGProps } from "react";

const ChartIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={props.width || 24}
      height={props.width || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 20V10M12 20V4M6 20V14"
        stroke={props.color || "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChartIcon;
