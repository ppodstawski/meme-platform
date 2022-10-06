export type TInputProps = {
  id: string;
  label: string;
  control: string;
  type: string;
  value: string;
  placeholder: string;
  required: boolean;
  touched: boolean;
  valid: boolean;
  validationMessage: string;
  onChange: (id: string, value: HTMLInputElement['value'], files?: HTMLInputElement['files']) => void;
  onBlur: () => void;
  textareaRows?: number;
  additionalInfo?: { passwordStrength?: number };
};

export type TFilePickerProps = {
  id: string;
  label: string;
  touched: boolean;
  valid: boolean;
  onChange: (id: string, value: HTMLInputElement['value'], files?: HTMLInputElement['files']) => void;
  onBlur: () => void;
};
