import {
  IconAddressBook,
  IconAffiliate,
  IconChecklist,
  IconLayoutDashboard,
  IconSettings,
  IconShieldLock,
  IconTournament,
  IconUserCircle,
} from "@tabler/icons-react";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
  {
    title: "Dashboard",
    label: "",
    href: "/dashboard",
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: "Leads",
    label: "",
    href: "/dashboard/Leads",
    icon: <IconChecklist size={18} />,
  },
  {
    title: "Contacts",
    label: "",
    href: "/dashboard/Contacts",
    icon: <IconAddressBook size={18} />,
  },
  {
    title: "Settings",
    label: "",
    href: "",
    icon: <IconSettings size={18} />,
    sub: [
      {
        title: "Profile",
        label: "",
        href: "/dashboard/Settings/profile",
        icon: <IconUserCircle size={18} />,
      },
      {
        title: "Organization",
        label: "",
        href: "/dashboard/Settings/organization",
        icon: <IconAffiliate size={18} />,
      },
      {
        title: "Team Management",
        label: "",
        href: "/dashboard/Settings/teamManagement",
        icon: <IconTournament size={18} />,
      },
      {
        title: "Security",
        label: "",
        href: "/dashboard/Settings/security",
        icon: <IconShieldLock size={18} />,
      },
    ],
  },
];
