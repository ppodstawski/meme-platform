export interface IValidationResult {
  isValid: boolean;
  validationError: string;
}

export interface IPasswordValidationResult extends IValidationResult {
  passwordStrength: number;
}

export const required = (value: string): IValidationResult => {
  const isValid = value.trim() !== '';
  const validationError = isValid ? '' : 'This field is required.';
  return {
    isValid,
    validationError
  };
};

export const length =
  (config: { min?: number; max?: number }) =>
  (value: string): IValidationResult => {
    let isValid = true;
    let validationError: string = '';
    if (config.min) {
      isValid = isValid && value.trim().length >= config.min;
      validationError = isValid
        ? ''
        : `This field requires at least ${config.min} characters.`;
    }
    if (config.max) {
      isValid = isValid && value.trim().length <= config.max;
      validationError = isValid
        ? ''
        : `This field can only be ${config.max} characters long.`;
    }
    return {
      isValid,
      validationError
    };
  };

export const email = (value: string): IValidationResult => {
  const isValid =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
      value
    );

  const validationError = isValid ? '' : 'This field requires valid email.';
  return {
    isValid,
    validationError
  };
};

export const password = (value: string): IPasswordValidationResult => {
  const passwordSettings = {
    strongHintMsg:
      'Hint: strong level password needs to have at least two special characters, at least one digit and 8 characters long.',
    mediumHintMsg:
      'Valid password requires lower and uppercase letters with at least one special character, and must be at least six characters long.',
    strongRegex: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
    mediumRegex:
      /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/,
    twoSpecialCharRegex: /(?:[^`!@#$%^&*\-_=+'\/.,]*[`!@#$%^&*\-_=+'\/.,]){2}/
  };

  let isValid = false;
  let validationError = '';
  let passwordStrength = 0;

  if (
    passwordSettings.strongRegex.test(value) &&
    passwordSettings.twoSpecialCharRegex.test(value)
  ) {
    isValid = true;
    validationError = '';
    passwordStrength = 3;
  } else if (passwordSettings.mediumRegex.test(value)) {
    isValid = true;
    validationError = passwordSettings.strongHintMsg;
    passwordStrength = 2;
  } else {
    isValid = false;
    validationError = passwordSettings.mediumHintMsg;
    passwordStrength = 1;
  }
  return {
    isValid,
    validationError,
    passwordStrength
  };
};
