import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner">
      <div className="flex flex-col items-center gap-10 py-12 lg:mx-10 lg:flex-row lg:justify-between lg:px-0 lg:py-10 ">
        <div className="flex flex-col items-center lg:flex-row lg:items-center">
          <p className="text-sm font-medium lg:mr-12">
            Created with ☕ by{" "}
            <span className="font-clash font-semibold">ptrlabs</span>
          </p>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row lg:mt-0">
            <Link href="/privacy">
              <p className="text-center text-sm">Privacy Policy</p>
            </Link>
            <Link href="/tos">
              <p className="text-center text-sm">Terms of Service</p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 lg:flex-row">
          <div className="flex items-center gap-4">
            <Link href="/peter-nguyen">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 32 32"
                className="h-7 w-7 cursor-pointer fill-current text-[#333333] hover:text-[#633CFF]"
              >
                <path
                  fillRule="evenodd"
                  d="M4.619 27.38c1.954 1.953 5.095 1.953 11.38 1.953 6.286 0 9.429 0 11.38-1.953 1.954-1.95 1.954-5.095 1.954-11.38 0-6.286 0-9.428-1.953-11.381C25.43 2.667 22.285 2.667 16 2.667c-6.286 0-9.428 0-11.381 1.952-1.952 1.954-1.952 5.095-1.952 11.38 0 6.286 0 9.429 1.952 11.38Zm8.047-15.713A4.333 4.333 0 1 0 17 16a1 1 0 0 1 2 0 6.333 6.333 0 1 1-6.334-6.334 1 1 0 1 1 0 2Zm11 4.333a4.333 4.333 0 0 1-4.333 4.333 1 1 0 1 0 0 2A6.333 6.333 0 1 0 13 16a1 1 0 1 0 2 0 4.334 4.334 0 0 1 8.666 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link href="https://github.com/peternguyen777">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                className="cursor-pointer fill-current text-[#333333] hover:text-[#633CFF]"
              >
                <path d="M12.5 0C5.594 0 0 5.51 0 12.305c0 5.437 3.581 10.048 8.547 11.674.625.116.854-.265.854-.592 0-.292-.01-1.066-.016-2.092-3.477.742-4.21-1.65-4.21-1.65-.569-1.42-1.39-1.8-1.39-1.8-1.133-.764.087-.748.087-.748 1.255.086 1.914 1.268 1.914 1.268 1.115 1.881 2.927 1.338 3.641 1.024.113-.797.434-1.338.792-1.646-2.776-.308-5.694-1.366-5.694-6.08 0-1.343.484-2.44 1.286-3.302-.14-.31-.562-1.562.11-3.256 0 0 1.047-.33 3.437 1.261 1-.273 2.063-.409 3.125-.415 1.063.006 2.125.142 3.125.415 2.375-1.591 3.422-1.261 3.422-1.261.672 1.694.25 2.945.125 3.256.797.861 1.281 1.959 1.281 3.302 0 4.727-2.921 5.767-5.703 6.07.438.369.844 1.123.844 2.276 0 1.647-.016 2.97-.016 3.37 0 .322.22.707.86.584 5-1.615 8.579-6.23 8.579-11.658C25 5.509 19.403 0 12.5 0z" />
              </svg>
            </Link>
          </div>
          <p className="text-sm">
            <span className="font-clash font-semibold">© 2023 ptrlabs</span>{" "}
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
