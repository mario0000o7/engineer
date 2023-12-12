export interface OfficeState {
  id: number;
  name: string;
  address1?: string;
  address2?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  ownerId: number;
  timeFrom: Date;
  timeTo: Date;
}
