import { forwardRef, type SVGProps } from 'react';

type LinkedinIconProps = {
  size?: number;
} & Omit<SVGProps<SVGSVGElement>, 'height' | 'width'>;

export const LinkedinIcon = forwardRef<SVGSVGElement, LinkedinIconProps>(
  ({ size = 24, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path
        key="linkedin-body"
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
      />
      <rect key="linkedin-bar" width="4" height="12" x="2" y="9" />
      <circle key="linkedin-dot" cx="4" cy="4" r="2" />
    </svg>
  ),
);

LinkedinIcon.displayName = 'LinkedinIcon';
