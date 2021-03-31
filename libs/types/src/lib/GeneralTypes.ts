export type isActiveType = {
  isActive: boolean;
};

export type FileValidator = {
  validate: (file: File) => boolean;
  errorMessage: string;
};

// Representation of an empty value in visualisations (Table, Charts, KPI, ...)
export const EMPTY_VALUE = '---';
