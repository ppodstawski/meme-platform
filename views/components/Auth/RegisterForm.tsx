import React, { useState, FormEvent, useRef } from 'react';
import Input from '../Form/Input';
import FlashMessage from '../Form/FlashMessage';
import classesForm from '../Form/Form.module.scss';
import inputChangeHelper from '../../helpers/inputChangeHandler';
import inputBlurHelper from '../../helpers/inputBlurHandler';
import submitHelper from '../../helpers/submitHandler';
import { required, email, length, password } from '../../util/validators';
import { ISignupFormData } from '../../interfaces/FormData';
import { TAuthFormProps } from '../../types/authForm';
import { TStatusMessage } from '../../types/statusMessage';

const RegisterForm: React.FC<TAuthFormProps> = (props: TAuthFormProps) => {
  const signupConfig: ISignupFormData = {
    form: {
      email: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, email],
        validationMessage: ''
      },
      username: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, length({ min: 3 })],
        validationMessage: ''
      },
      password: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, password],
        validationMessage: '',
        additionalInfo: { passwordStrength: 0 }
      }
    },
    formIsValid: false
  };

  const [signupForm, setSignupForm] = useState(signupConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<TStatusMessage>({ result: '', message: '' });

  const csrfInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const inputChangeHandler = (input: string, value: string) => {
    inputChangeHelper(setSignupForm, input, value);
  };

  const inputBlurHandler = (input: string) => {
    inputBlurHelper(setSignupForm, input);
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (typeof csrfInputRef === 'undefined') {
      setFormMessage({ result: 'error', message: 'CSRF Token not acquired.' });
      return;
    }

    const dataToPost = {
      email: signupForm.form.email.value,
      username: signupForm.form.username.value,
      password: signupForm.form.password.value,
      _csrf: csrfInputRef.current.value,
      isLogin: false
    };

    const response = await submitHelper(setIsLoading, dataToPost);
    if (response) {
      setFormMessage(response);
    }
  };

  return (
    <section className={classesForm.mainForm}>
      <h2>Sign Up</h2>
      {formMessage.message && <FlashMessage result={formMessage.result} message={formMessage.message} />}
      {!props.csrfToken && (
        <FlashMessage result="error" message="Error: token not received! Submission is not possible." />
      )}
      <form onSubmit={submitHandler}>
        <div>
          <Input
            id="email"
            label="Your email"
            placeholder="Type your email"
            required={true}
            type="email"
            control="input"
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler.bind(this, 'email')}
            value={signupForm.form['email'].value}
            valid={signupForm.form['email'].valid}
            validationMessage={signupForm.form['email'].validationMessage}
            touched={signupForm.form['email'].touched}
          />
        </div>
        <div>
          <Input
            id="username"
            label="Your username"
            placeholder="Type your username"
            required={true}
            type="text"
            control="input"
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler.bind(this, 'username')}
            value={signupForm.form['username'].value}
            valid={signupForm.form['username'].valid}
            validationMessage={signupForm.form['username'].validationMessage}
            touched={signupForm.form['username'].touched}
          />
        </div>
        <div>
          <Input
            id="password"
            label="Your password"
            placeholder="Enter your password"
            required={true}
            type="password"
            control="input"
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler.bind(this, 'password')}
            value={signupForm.form['password'].value}
            valid={signupForm.form['password'].valid}
            validationMessage={signupForm.form['password'].validationMessage}
            touched={signupForm.form['password'].touched}
            additionalInfo={signupForm.form['password'].additionalInfo}
          />
        </div>
        <div className={classesForm.actionsField}>
          {!isLoading && <button disabled={!props.csrfToken}>Create Account</button>}
          {isLoading && <p>Sending request...</p>}
          <a href="/login">Login with existing account</a>
          {props.csrfToken && <input name="_csrf" type="hidden" value={props.csrfToken} ref={csrfInputRef} />}
        </div>
      </form>
    </section>
  );
};

export default RegisterForm;
