// types.ts

// types.ts

export type FieldType = 'string' | 'number' | 'boolean';

export interface Field {
  name: string;
  type: FieldType;
}


export interface GenerateDataRequest {
  fields: Field[];
  count?: number;
}

export interface GenerateDataResponse {
  url: string;
}
