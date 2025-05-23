
export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      active_path: "/",
      menu_mobile: false
    }
  },
  actions: {
    setActivePath(path: string) {
      this.active_path = path
    },
    toggleMobileMenu() {
      this.menu_mobile = !this.menu_mobile
    },
    hideMobileMenu() {
      this.menu_mobile = false
    }
  }
})