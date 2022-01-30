// assets
import { IconUser, IconHelp } from "@tabler/icons";

// constant
const icons = { IconUser, IconHelp };

const other = {
  id: "sample-docs-roadmap",
  type: "group",
  children: [
    {
      id: "sample-page",
      title: "Profile",
      type: "item",
      url: "/profile",
      icon: icons.IconUser,
      breadcrumbs: false,
    },
  ],
};

export default other;
