// Define o tipo para as opções dos selects
export interface Option {
  value: string | undefined;
  label: string;
}

// Interface base para todos os inputs
export interface BaseInput {
  type: string;
  label: string;
  onChange: (event: any) => void;
  options?: Option[];
  hide?: boolean;
  tooltip?: string;
}

// Input do tipo 'select'
export interface SelectInput extends BaseInput {
  type: 'select';
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
}

// Input do tipo 'input-number'
export interface InputNumberInput extends BaseInput {
  type: 'input-number';
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Input do tipo 'input-date'
export interface InputDateInput extends BaseInput {
  type: 'input-date';
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInclude?: () => void;
}

// União de todos os tipos possíveis de input
export type Input = SelectInput | InputNumberInput | InputDateInput;
