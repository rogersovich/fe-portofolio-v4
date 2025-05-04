import { defineStore } from 'pinia'
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
  title: string
  icon: any
  is_active: boolean
  children: ChildMenuItem[]
}

interface ChildMenuItem {
  title: string
  is_active: boolean
}

export const useSidebarStore = defineStore('sidebar', () => {
  const menuList = reactive<MenuItem[]>([
    {
      title: 'Dashboard',
      icon: IconLayoutDashboard,
      is_active: true,
      children: [],
    },
    {
      title: 'User',
      icon: IconUsersGroup,
      is_active: false,
      children: [],
    },
    {
      title: 'Author',
      icon: IconUserEdit,
      is_active: false,
      children: [
        {
          title: 'All',
          is_active: false,
        },
        {
          title: 'Create',
          is_active: false,
        },
      ],
    },
    {
      title: 'About',
      icon: IconBook,
      is_active: false,
      children: [],
    },
    {
      title: 'Project',
      icon: IconPresentation,
      is_active: false,
      children: [],
    },
    {
      title: 'Blog',
      icon: IconNews,
      is_active: false,
      children: [],
    },
    {
      title: 'Technology',
      icon: IconTool,
      is_active: false,
      children: [],
    },
    {
      title: 'Experience',
      icon: IconBuildings,
      is_active: false,
      children: [],
    },
    {
      title: 'Topic',
      icon: IconTag,
      is_active: false,
      children: [],
    },
    {
      title: 'Statistic',
      icon: IconTimeline,
      is_active: false,
      children: [],
    },
    {
      title: 'Testimonial',
      icon: IconBubbleText,
      is_active: false,
      children: [],
    },
    {
      title: 'Reading Time',
      icon: IconVocabulary,
      is_active: false,
      children: [],
    },
  ])

  const sidebarExpanded = ref(true)

  const toggleMenu = (menu: MenuItem) => {
    // Reset active state of all items
    menuList.forEach((item) => {
      item.is_active = false
    })

    if (menu.children.length > 0) {
      // Reset active state of children
      menu.children.forEach((child) => {
        child.is_active = false
      })

      menu.children[0].is_active = true
      menu.is_active = !menu.is_active
    } else {
      menu.is_active = !menu.is_active
    }
  }

  const toggleMenuChild = (menuParent: MenuItem, menuChild: ChildMenuItem) => {
    menuParent.children.forEach((child) => {
      child.is_active = false
    })
    menuChild.is_active = !menuChild.is_active
  }

  const toggleSidebar = () => {
    sidebarExpanded.value = !sidebarExpanded.value
  }

  return {
    menuList,
    sidebarExpanded,
    toggleMenu,
    toggleMenuChild,
    toggleSidebar,
  }
})