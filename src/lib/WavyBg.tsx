import { ReactNode, ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type WavyBgProps = ComponentProps<"div"> & {
  children: ReactNode;
};

export function WavyBg({ children, className }: WavyBgProps) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 250"
        className="bg-background"
      >
        <path
          fill="#2D3F7B"
          fillOpacity="1"
          d="M0,160L60,170.7C120,181,240,203,360,202.7C480,203,600,181,720,170.7C840,160,960,160,1080,165.3C1200,171,1320,181,1380,186.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
      <div
        className={twMerge("flex flex-col items-center gap-10 px-6 py-10 lg:py-0", className)}
      >
        {children}
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250">
        <path
          fill="#FFFEF9"
          fillOpacity="1"
          d="M0,160L60,170.7C120,181,240,203,360,202.7C480,203,600,181,720,170.7C840,160,960,160,1080,165.3C1200,171,1320,181,1380,186.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
    </>
  );
}
