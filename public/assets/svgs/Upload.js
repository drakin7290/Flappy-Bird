import * as React from 'react';
const SvgUpload = ({ title, titleId, ...props }) => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role={'icon-default'}
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M5.625 4.125h13.5m-12.75 9.75 6-5.25 6 5.25m-6 7.5V8.625"
      stroke={'currentColor'}
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgUpload;
