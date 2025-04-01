import Link from "next/link";
import Logo from "@/components/icons/Logo";
import HamburgerMenuIcon from "@/components/icons/HamburgerMenuIcon";

const Navbar = () => {
  return (
    <nav>
      {/* <div className="h-[72px]"></div> */}
      <div className="fixed top-0 left-0 right-0 z-[50] flex items-center justify-between px-8 py-6">
        <ul className="flex items-center gap-2">
          <li className="text-xs rounded-border">中</li>
          <li className="text-sm text-white bg-black rounded-border">EN</li>
        </ul>
        <Link href="/">
          <Logo className="w-auto h-5" />
        </Link>
        <button className="rounded-border">
          <HamburgerMenuIcon className="hamburger-icon" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
