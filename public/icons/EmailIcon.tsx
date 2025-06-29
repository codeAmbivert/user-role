import { SVGProps } from "react";

const EmailIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 16}
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.3333 3.00001C18.3333 2.08334 17.5833 1.33334 16.6667 1.33334H3.33333C2.41666 1.33334 1.66666 2.08334 1.66666 3.00001M18.3333 3.00001V13C18.3333 13.9167 17.5833 14.6667 16.6667 14.6667H3.33333C2.41666 14.6667 1.66666 13.9167 1.66666 13V3.00001M18.3333 3.00001L10 8.83334L1.66666 3.00001"
        stroke={props.color || "currentColor"}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EmailIcon;
