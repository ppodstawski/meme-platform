import { ISetStateAddMeme, ISetStateEditProfile, ISetStateLogin, ISetStateSignup } from '../interfaces/FormData';

const inputBlurHandler = (
  stateSetterFunction: ISetStateSignup | ISetStateLogin | ISetStateEditProfile | ISetStateAddMeme,
  input: string
) => {
  stateSetterFunction((previousState: any) => {
    return {
      ...previousState,
      form: {
        ...previousState.form,
        [input]: {
          ...previousState.form[input],
          touched: true
        }
      }
    };
  });
};

export default inputBlurHandler;
