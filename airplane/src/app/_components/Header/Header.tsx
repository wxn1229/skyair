"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Spacer,
} from "@nextui-org/react";
import Logo from "./Logo";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import {
  Heart,
  Plane,
  Search,
  SeparatorHorizontalIcon,
  Settings,
} from "lucide-react";

export default function Header() {
  const router = useRouter();
  return (
    <div className="w-full ">
      <Navbar position="static" className="w-full ">
        <NavbarBrand></NavbarBrand>
        <NavbarContent className="sm:flex gap-4" justify="center">
          <NavbarItem>
            <div
              className="flex cursor-pointer"
              onClick={() => {
                router.push("/");
              }}
            >
              <Plane></Plane>
              <Spacer x={4} />
              <p className="font-bold text-inherit">SKY AIR</p>
            </div>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end"></NavbarContent>
      </Navbar>
      <Divider className=""></Divider>
    </div>
  );
}
