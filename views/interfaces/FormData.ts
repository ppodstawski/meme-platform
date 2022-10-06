export interface IInputConfigData {
  value: string;
  valid: boolean;
  touched: boolean;
  validators: any[];
  validationMessage: string;
}

export interface ISignupPasswordConfigData extends IInputConfigData {
  additionalInfo: { passwordStrength: number };
}

export interface ISignupFormData {
  form: {
    email: IInputConfigData;
    username: IInputConfigData;
    password: ISignupPasswordConfigData;
  };
  formIsValid: boolean;
}

export interface ILoginFormData {
  form: {
    email: IInputConfigData;
    password: IInputConfigData;
  };
  formIsValid: boolean;
}

export interface IAddMemeFormData {
  form: {
    title: IInputConfigData;
    description: IInputConfigData;
    image: IInputConfigData;
  };
  formIsValid: boolean;
}

export interface IEditProfileFormData {
  form: IEditProfileData;
  formIsValid: boolean;
}

export interface IEditProfileData {
  email: IInputConfigData;
  username: IInputConfigData;
  description: IInputConfigData;
  profileImage: IInputConfigData;
}

export interface ISetStateAddMeme extends React.Dispatch<React.SetStateAction<IAddMemeFormData>> {}

export interface ISetStateEditProfile extends React.Dispatch<React.SetStateAction<IEditProfileFormData>> {}

export interface ISetStateSignup extends React.Dispatch<React.SetStateAction<ISignupFormData>> {}

export interface ISetStateLogin extends React.Dispatch<React.SetStateAction<ILoginFormData>> {}

export interface ISetStateLoading extends React.Dispatch<React.SetStateAction<boolean>> {}
