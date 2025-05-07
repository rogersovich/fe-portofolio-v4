export interface TAlertStore {
  severity: TSeverityType;
  summary: string;
  life: number;
  show_alert: boolean;
}
export interface TSetAlertStore {
  severity: TSeverityType;
  summary: string;
  life?: number;
  show_alert: boolean;
}

export type TSeverityType = 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast';