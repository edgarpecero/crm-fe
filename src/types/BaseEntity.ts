export enum EntityTypeEnum {
  ORDER = 'order',
  CUSTOMER = 'customer',
  ITEM = 'item',
  USER = 'user',
}

export interface BaseEntity {
  id: string;
  number: string;                   // Unique identifier
  status: string;
  createdAt: string;                // Timestamp of creation (ISO 8601 string)
  lastModifiedAt: string;           // Timestamp of last modification (ISO 8601 string)
  lastModifiedBy: string;           // Who last modified the order
}