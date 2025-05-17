
export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      active_path: "/"
    }
  },
  actions: {
    setActivePath(path: string) {
      this.active_path = path
    }
  }
})