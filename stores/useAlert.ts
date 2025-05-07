import { defineStore } from 'pinia'
import type { TAlertStore, TSetAlertStore } from '~/types/alert.type'

export const useAlertStore = defineStore('alert', {
  state: (): TAlertStore => {
    return {
      show_alert: false,
      severity: 'info',
      summary: '',
      life: 3000
    }
  },
  actions: {
    setAlert(payload: TSetAlertStore) {
      this.show_alert = payload.show_alert
      this.severity = payload.severity
      this.summary = payload.summary
      this.life = payload.life || 3000     
      setTimeout(() => {
        this.$reset()
      }, 500);
    }
  }
})