export interface BaseEntity {
  id: string;
  status: string;
  createdAt: string;                // Timestamp of creation (ISO 8601 string)
  lastModifiedAt: string;           // Timestamp of last modification (ISO 8601 string)
  lastModifiedBy: string;           // Who last modified the order
}