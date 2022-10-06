import React, { FormEvent, useEffect, useState } from 'react';
import { IEditProfileData, IEditProfileFormData } from '../../interfaces/FormData';
import { TStatusMessage } from '../../types/statusMessage';
import { required, length, email, IValidationResult } from '../../util/validators';
import Input from '../Form/Input';
import FilePicker from '../Form/FilePicker';
import FlashMessage from '../Form/FlashMessage';
import classes from '../Admin/EditMeme.module.scss';
import classesForm from '../Form/Form.module.scss';
import GV from '../../util/constValues';
import inputChangeEditHelper from '../../helpers/inputChangeEditHandler';
import inputBlurHelper from '../../helpers/inputBlurHandler';

const EditProfile: React.FC = () => {
  const editProfileConfig: IEditProfileFormData = {
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
      description: {
        value: '',
        valid: false,
        touched: false,
        validators: [],
        validationMessage: ''
      },
      profileImage: {
        value: '',
        valid: false,
        touched: false,
        validators: [],
        validationMessage: ''
      }
    },
    formIsValid: false
  };

  const [editProfileForm, setEditProfileForm] = useState(editProfileConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<TStatusMessage>({ result: '', message: '' });
  const [imagePreview, setImagePreview] = useState<string>('');

  const imgSettings = {
    contain: false,
    left: true
  };

  const inputChangeHandler = (input: string, value: string, files?: HTMLInputElement['files']) => {
    inputChangeEditHelper(setEditProfileForm, setImagePreview, input, value, files);
  };

  const inputBlurHandler = (input: string) => {
    inputBlurHelper(setEditProfileForm, input);
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dataToPost = {
      username: editProfileForm.form.username.value,
      description: editProfileForm.form.description.value,
      profileImage: editProfileForm.form.profileImage.value
    };

    setIsLoading(true);

    const formData = new FormData();
    formData.append('username', dataToPost.username);
    formData.append('description', dataToPost.description);
    if (dataToPost.profileImage) {
      formData.append('image', dataToPost.profileImage);
    }

    try {
      const response = await fetch(GV.URLS.API_POST + '/update-profile', {
        method: 'PATCH',
        credentials: 'include',
        body: formData
      });

      const responseJSON = await response.json();
      setStatusMessage(responseJSON.flash);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getProfileInfoForEdit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(GV.URLS.API_POST + '/get-profile-info', {
        method: 'GET',
        credentials: 'include'
      });
      const responseJSON = await response.json();
      const userData = responseJSON.body;

      setEditProfileForm((previousState: any) => {
        const prevForm = previousState.form;
        const updatedForm: IEditProfileData = {
          email: {
            ...prevForm.email,
            value: userData.email,
            valid: true,
            touched: true
          },
          username: {
            ...prevForm.username,
            value: userData.username,
            valid: true,
            touched: true
          },
          description: {
            ...prevForm.description,
            value: userData.description,
            valid: true,
            touched: true
          },
          profileImage: {
            ...prevForm.profileImage
          }
        };
        setImagePreview(GV.URLS.APP + '/' + userData.profileImage);
        return {
          ...previousState,
          form: updatedForm
        };
      });
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfileInfoForEdit();
  }, []);

  return (
    <section className={classesForm.mainForm}>
      <h2>Edit your profile:</h2>
      {statusMessage.message && <FlashMessage result={statusMessage.result} message={statusMessage.message} />}
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="Here in the future you will be able to change your email"
          placeholder="Enter your email"
          required={true}
          type="email"
          control="input"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler.bind(this, 'email')}
          value={editProfileForm.form['email'].value}
          valid={editProfileForm.form['email'].valid}
          validationMessage={editProfileForm.form['email'].validationMessage}
          touched={editProfileForm.form['email'].touched}
        />
        <Input
          id="username"
          label="Here you can change your username"
          placeholder="Enter your username"
          required={true}
          type="text"
          control="input"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler.bind(this, 'username')}
          value={editProfileForm.form['username'].value}
          valid={editProfileForm.form['username'].valid}
          validationMessage={editProfileForm.form['username'].validationMessage}
          touched={editProfileForm.form['username'].touched}
        />
        <Input
          id="description"
          label="Profile description, you can write something cool"
          placeholder="Your profile description"
          required={true}
          type="text"
          control="textarea"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler.bind(this, 'description')}
          value={editProfileForm.form['description'].value}
          valid={editProfileForm.form['description'].valid}
          validationMessage={editProfileForm.form['description'].validationMessage}
          touched={editProfileForm.form['description'].touched}
        />
        <FilePicker
          id="profileImage"
          label="Profile pic, this is how others will portray you"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler.bind(this, 'profileImage')}
          valid={editProfileForm.form['profileImage'].valid}
          touched={editProfileForm.form['profileImage'].touched}
        />
        <div className={classes.imagePreview}>
          {!imagePreview && <p>Please choose an image.</p>}
          {imagePreview && (
            <figure
              style={{
                backgroundImage: `url('${imagePreview}')`,
                backgroundSize: imgSettings.contain ? 'contain' : 'cover',
                backgroundPosition: imgSettings.left ? 'left' : 'center'
              }}
            />
          )}
        </div>
        <div className={classesForm.actionsField}>
          {!isLoading && <button>Update profile!</button>}
          {isLoading && <p>Sending request...</p>}
        </div>
      </form>
    </section>
  );
};

export default EditProfile;
