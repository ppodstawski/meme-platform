import { IPasswordValidationResult, IValidationResult } from '../util/validators';
import { ISetStateLogin, ISetStateSignup } from '../interfaces/FormData';

const inputChangeHandler = (stateSetterFunction: ISetStateSignup | ISetStateLogin, input: string, value: string) => {
  stateSetterFunction((previousState: any) => {
    let isValid: boolean = true;
    let validationMessage: string = '';
    let additionalInfo = { passwordStrength: 0 };

    const previousStateFormInput = previousState.form[input];

    for (const validator of previousStateFormInput.validators) {
      if (input === 'password') {
        const validationResult: IPasswordValidationResult = validator(value);
        additionalInfo.passwordStrength = validationResult.passwordStrength;
        isValid = isValid && validationResult.isValid;
        validationMessage = validationMessage ? validationMessage : validationResult.validationError;
      } else {
        const validationResult: IValidationResult = validator(value);
        isValid = isValid && validationResult.isValid;
        validationMessage = validationMessage ? validationMessage : validationResult.validationError;
      }
    }

    const updatedForm = {
      ...previousState.form,
      [input]: {
        ...previousStateFormInput,
        valid: isValid,
        value,
        validationMessage
      }
    };

    if (input === 'password' && additionalInfo.passwordStrength > 0) {
      updatedForm.password.additionalInfo.passwordStrength = additionalInfo.passwordStrength;
    }

    let formIsValid = true;
    for (const inputName in updatedForm) {
      formIsValid = formIsValid && updatedForm[inputName].valid;
    }

    return {
      ...previousState,
      form: updatedForm,
      formIsValid: formIsValid
    };
  });
};

export default inputChangeHandler;
