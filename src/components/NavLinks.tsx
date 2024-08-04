"use client";
import {
  DocumentDuplicateIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { id: 0, name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    id: 1,
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: DocumentDuplicateIcon,
  },
  {
    id: 3,
    name: "Customers",
    href: "/dashboard/customers",
    icon: UserGroupIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <li key={link.id}>
            <Link
              key={link.name}
              href={link.href}
              className={clsx({
                "btn-active": pathname === link.href,
              })}
            >
              <LinkIcon className="w-5 h-5" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          </li>
        );
      })}
    </>
  );
}
