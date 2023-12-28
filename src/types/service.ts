import { OfficeState } from '~/types/office';

export interface ServiceState {
  id: number;
  name: string;
  description?: string;
  price: number;
  officeId: number;
  duration: Date;
  offices?: OfficeState;
}
