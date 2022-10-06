import { IValidationResult } from '../util/validators';
import { ISetStateAddMeme, ISetStateEditProfile } from '../interfaces/FormData';
import { generateBase64FromImage } from '../util/image';

const inputChangeEditHandler = (
  stateSetterFunction: ISetStateEditProfile | ISetStateAddMeme,
  stateImagePreviewSetter: React.Dispatch<React.SetStateAction<string>>,
  input: string,
  value: string,
  files?: HTMLInputElement['files']
) => {
  if (files) {
    generateBase64FromImage(files[0])
      .then((b64: any) => {
        stateImagePreviewSetter(b64);
      })
      .catch((error) => {
        stateImagePreviewSetter('');
      });
  }

  stateSetterFunction((previousState: any) => {
    let isValid: boolean = true;
    let validationMessage: string = '';

    const previousStateFormInput = previousState.form[input];

    for (const validator of previousStateFormInput.validators) {
      const validationResult: IValidationResult = validator(value);
      isValid = isValid && validationResult.isValid;
      validationMessage = validationMessage ? validationMessage : validationResult.validationError;
    }

    const updatedForm = {
      ...previousState.form,
      [input]: {
        ...previousStateFormInput,
        valid: isValid,
        value: files ? files[0] : value,
        validationMessage
      }
    };

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

export default inputChangeEditHandler;
