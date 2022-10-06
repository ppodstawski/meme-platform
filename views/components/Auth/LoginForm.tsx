import React, { useState, FormEvent, useRef } from 'react';
import { useAuthContext } from '../../store/auth-context';
import Input from '../Form/Input';
import FlashMessage from '../Form/FlashMessage';
import classesForm from '../Form/Form.module.scss';
import inputChangeHelper from '../../helpers/inputChangeHandler';
import inputBlurHelper from '../../helpers/inputBlurHandler';
import submitHelper from '../../helpers/submitHandler';
import { required, email } from '../../util/validators';
import { ILoginFormData } from '../../interfaces/FormData';
import { TAuthFormProps } from '../../types/authForm';
import { TStatusMessage } from '../../types/statusMessage';

const LoginForm: React.FC<TAuthFormProps> = (props: TAuthFormProps) => {
  const { login } = useAuthContext();

  const loginConfig: ILoginFormData = {
    form: {
      email: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, email],
        validationMessage: ''
      },
      password: {
        value: '',
        valid: false,
        touched: false,
        validators: [required],
        validationMessage: ''
      }
    },
    formIsValid: false
  };

  const [loginForm, setLoginForm] = useState(loginConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<TStatusMessage>({ result: '', message: '' });

  const csrfInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const inputChangeHandler = (input: string, value: string) => {
    inputChangeHelper(setLoginForm, input, value);
  };

  const inputBlurHandler = (input: string) => {
    inputBlurHelper(setLoginForm, input);
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (typeof csrfInputRef === 'undefined') {
      setFormMessage({ result: 'error', message: 'CSRF Token not acquired.' });
      return;
    }

    const dataToPost = {
      email: loginForm.form.email.value,
      password: loginForm.form.password.value,
      _csrf: csrfInputRef.current.value,
      isLogin: true
    };

    const response = await submitHelper(setIsLoading, dataToPost);
    if (response.ok) {
      setFormMessage(response.flash);

      const expirationTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

      login(response.body.userId, expirationTime.toISOString(), {
        userId: response.body.userId,
        email: response.body.email,
        username: response.body.username,
        profileImage: response.body.profileImage
      });
    } else {
      setFormMessage(response.flash);
    }
  };

  return (
    <section className={classesForm.mainForm}>
      <h2>Login</h2>
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
            value={loginForm.form['email'].value}
            valid={loginForm.form['email'].valid}
            validationMessage={loginForm.form['email'].validationMessage}
            touched={loginForm.form['email'].touched}
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
            value={loginForm.form['password'].value}
            valid={loginForm.form['password'].valid}
            validationMessage={loginForm.form['password'].validationMessage}
            touched={loginForm.form['password'].touched}
          />
        </div>
        <div className={classesForm.actionsField}>
          {!isLoading && <button disabled={!props.csrfToken}>Login</button>}
          {isLoading && <p>Sending request...</p>}
          <a href="/signup">Create new account</a>
          {props.csrfToken && <input name="_csrf" type="hidden" value={props.csrfToken} ref={csrfInputRef} />}
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
