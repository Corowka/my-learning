import styles from "./navigation.module.css";
import { Link } from "../../UI/link/Link";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import DashboardLight from "../../../public/dashboard-light.svg";
import CollectionLight from "../../../public/world-light.svg";
import WorldLight from "../../../public/collections-light.svg";
import SettingsLight from "../../../public/settings-light.svg";

interface NavigationItem {
  icon: StaticImageData;
  title: string;
  link: string;
}

const NAVIGATION_LIST: NavigationItem[] = [
  { icon: DashboardLight, title: "Dashboard", link: "/dashboard" },
  { icon: CollectionLight, title: "Collection", link: "/collection" },
  { icon: WorldLight, title: "World", link: "/world" },
  { icon: SettingsLight, title: "Settings", link: "/settings" },
];

interface NavigationProps {}

export const Navigation = ({}: NavigationProps) => {
  const { pathname } = useRouter();

  return (
    <nav className={styles.content}>
      {NAVIGATION_LIST.map((item, index) => (
        <Link key={index} href={item.link}>
          <div
            className={[
              styles.link,
              pathname === item.link ? styles.currentLink : {},
            ].join(" ")}
          >
            <Image
              className={styles.icon}
              src={item.icon}
              width={32}
              height={32}
              alt={item.title + " icon"}
            />
            {item.title}
          </div>
        </Link>
      ))}
    </nav>
  );
};
