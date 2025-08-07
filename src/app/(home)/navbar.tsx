"use client";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavbarSidebar } from "./navbar-sidebar";
import { useState } from "react";
import { MenuIcon } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant={"outline"}
      className={cn(
        "bg-transparent hover:bg-transparent border-transparent hover:border-primary px-3.5 text-lg",
        isActive &&
          "bg-blue-500 text-white hover:bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const navbarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/contact", children: "Contact" },
  { href: "/blogs", children: "Blogs" },
  //   { href: "/dashboard", children: "Dashboard" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      <Link href="/" className={`pl-6 flex items-center`}>
        <span className={cn("text-5xl font-extrabold", poppins.className)}>
          trvble
        </span>
      </Link>
      <NavbarSidebar
        items={navbarItems}
        open={isSidebarOpen}
        onOpenChange={() => setSidebarOpen((prev) => !prev)}
      />
      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>
      <div className="hidden lg:flex">
        <Button
          asChild
          variant={"secondary"}
          className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-blue-300 transition-colors text-lg font-semibold"
        >
          <Link href="/login">Login</Link>
        </Button>
        <Button
          asChild
          className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black hover:bg-blue-300 hover:text-black transition-colors text-lg font-semibold"
        >
          <Link href="/sign-up">Sign-up</Link>
        </Button>
      </div>
      <div className="flex items-center justify-center border-none lg:hidden">
        <Button
          variant={"ghost"}
          className="size-12 border-transparent bg-white"
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};
