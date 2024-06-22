import Link from "next/link";
import { BsGithub, BsLinkedin, BsTwitterX } from "react-icons/bs";

export default function Footer() {
  const links = [
    {
      name: "GitHub",
      link: "https://github.com/ydv-ankit",
      Icon: <BsGithub />,
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/ankityadav1121/",
      Icon: <BsLinkedin />,
    },
    {
      name: "X.com",
      link: "https://x.com/ydvtwts",
      Icon: <BsTwitterX />,
    },
  ];
  return (
    <div className="w-full min-h-20 border-t border-b">
      <div className="flex flex-col items-center justify-between h-full p-4 sm:flex-row">
        <div className="flex justify-center items-center">
          <div className="">
            <div className="text-xl font-bold my-2">
              PenPulse - <span className="text-xl font-medium">Ankit Ydv</span>
            </div>
            <div className="text-md opacity-65">
              &copy; {new Date().getFullYear()} - All rights reserved
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-start mt-4 sm:mt-0">
          {links.map(({ name, link, Icon }, index) => (
            <Link href={link} key={index} target="_blank">
              <div className="flex justify-center items-center hover:underline transition-all rounded-md">
                {Icon}
                <div className="mx-2 my-1">{name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
