import { OfficeState } from '~/types/office';

export interface DayOffState {
  id?: number;
  officeId: number;
  dateFrom: Date;
  dateTo: Date;
  offices?: OfficeState;
}
