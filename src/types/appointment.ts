import { ServiceState } from '~/types/service';

export interface AppointmentState {
  id?: number;
  userId: number;
  serviceId: number;
  date: Date;
  price: number;
  archive?: boolean;
  services?: ServiceState;
}
