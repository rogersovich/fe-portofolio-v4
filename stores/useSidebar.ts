import { defineStore } from "pinia";
import {
  IconLayoutDashboard,
  IconUserEdit,
  IconUsersGroup,
  IconTool,
  IconBook,
  IconBuildings,
  IconTimeline,
  IconTag,
  IconBubbleText,
  IconVocabulary,
  IconPresentation,
  IconNews,
} from "@tabler/icons-vue";

interface MenuItem {
  title: string;
  icon: any;
  is_active: boolean;
  children: ChildMenuItem[];
  route?: string;
  key: string;
}

interface ChildMenuItem {
  title: string;
  is_active: boolean;
  route: string;
}

export const useSidebarStore = defineStore("sidebar", () => {
  const menuList = reactive<MenuItem[]>([
    {
      title: "Dashboard",
      icon: IconLayoutDashboard,
      is_active: true,
      route: "/adminz/dashboard",
      key: "dashboard",
      children: [],
    },
    {
      title: "User",
      icon: IconUsersGroup,
      is_active: false,
      route: "/adminz/user",
      key: "user",
      children: [],
    },
    {
      title: "Author",
      icon: IconUserEdit,
      is_active: false,
      route: "/adminz/author",
      key: "author",
      children: [
        {
          title: "All",
          is_active: false,
          route: "/adminz/author",
        },
        {
          title: "Create",
          is_active: false,
          route: "/adminz/author/create",
        },
      ],
    },
    {
      title: "About",
      icon: IconBook,
      is_active: false,
      route: "/adminz/about",
      key: "about",
      children: [],
    },
    {
      title: "Project",
      icon: IconPresentation,
      is_active: false,
      route: "/adminz/project",
      key: "project",
      children: [],
    },
    {
      title: "Blog",
      icon: IconNews,
      is_active: false,
      route: "/adminz/blog",
      key: "blog",
      children: [],
    },
    {
      title: "Technology",
      icon: IconTool,
      is_active: false,
      route: "/adminz/technology",
      key: "technology",
      children: [],
    },
    {
      title: "Experience",
      icon: IconBuildings,
      is_active: false,
      route: "/adminz/experience",
      key: "experience",
      children: [],
    },
    {
      title: "Topic",
      icon: IconTag,
      is_active: false,
      route: "/adminz/topic",
      key: "topic",
      children: [],
    },
    {
      title: "Statistic",
      icon: IconTimeline,
      is_active: false,
      route: "/adminz/statistic",
      key: "statistic",
      children: [],
    },
    {
      title: "Testimonial",
      icon: IconBubbleText,
      is_active: false,
      route: "/adminz/testimonial",
      key: "testimonial",
      children: [],
    },
    {
      title: "Reading Time",
      icon: IconVocabulary,
      is_active: false,
      route: "/adminz/reading-time",
      key: "reading-time",
      children: [],
    },
  ]);

  const sidebarExpanded = ref(true);
  const router = useRouter();

  const toggleMenu = (menu: MenuItem) => {
    // Reset active state of all items
    menuList.forEach((item) => {
      item.is_active = false;
    });

    if (menu.children.length > 0) {
      // Reset active state of children
      menu.children.forEach((child) => {
        child.is_active = false;
      });

      menu.children[0].is_active = true;
      menu.is_active = !menu.is_active;
    } else {
      menu.is_active = !menu.is_active;
    }

    // If the menu has a route, navigate to it
    if (menu.route) {
      if (menu.children.length > 0) {
        router.push(menu.children[0].route);
      } else {
        router.push(menu.route);
      }
    }
  };

  const toggleMenuChild = (menuParent: MenuItem, menuChild: ChildMenuItem) => {
    menuParent.children.forEach((child) => {
      child.is_active = false;
    });
    menuChild.is_active = !menuChild.is_active;

    // Navigate to child route if available
    if (menuChild.route) {
      router.push(menuChild.route);
    }
  };

  const toggleSidebar = () => {
    sidebarExpanded.value = !sidebarExpanded.value;
    console.log(sidebarExpanded.value);
  };

  return {
    menuList,
    sidebarExpanded,
    toggleMenu,
    toggleMenuChild,
    toggleSidebar,
  };
});
