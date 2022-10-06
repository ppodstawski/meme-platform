import React, { FormEvent, PropsWithChildren, useEffect, useState } from 'react';
import { required, length, IValidationResult } from '../../util/validators';

import Input from '../Form/Input';
import classes from './EditMeme.module.scss';
import classesForm from '../Form/Form.module.scss';

import { IAddMemeFormData } from '../../interfaces/FormData';
import { generateBase64FromImage } from '../../util/image';
import FilePicker from '../Form/FilePicker';
import GV from '../../util/constValues';
import { useRouter } from 'next/router';
import { TStatusMessage } from '../../types/statusMessage';
import FlashMessage from '../Form/FlashMessage';
import inputChangeEditHelper from '../../helpers/inputChangeEditHandler';
import inputBlurHelper from '../../helpers/inputBlurHandler';

const EditMeme: React.FC<PropsWithChildren<{ mode: 'NEW' | 'EDIT' }>> = (props) => {
  const addMemeConfig: IAddMemeFormData = {
    form: {
      title: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, length({ min: 5 })],
        validationMessage: ''
      },
      description: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, length({ min: 10 })],
        validationMessage: ''
      },
      image: {
        value: '',
        valid: false,
        touched: false,
        validators: [required],
        validationMessage: ''
      }
    },
    formIsValid: false
  };

  const router = useRouter();
  const [addMemeForm, setAddMemeForm] = useState(addMemeConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<TStatusMessage>({ result: '', message: '' });
  const [imagePreview, setImagePreview] = useState<string>('');

  const { memeId } = router.query;
  const editMode = props.mode === 'EDIT';
  const imgSettings = {
    contain: false,
    left: true
  };

  const inputChangeHandler = (input: string, value: string, files?: HTMLInputElement['files']) => {
    inputChangeEditHelper(setAddMemeForm, setImagePreview, input, value, files);
  };

  const inputBlurHandler = (input: string) => {
    inputBlurHelper(setAddMemeForm, input);
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dataToPost = {
      title: addMemeForm.form.title.value,
      description: addMemeForm.form.description.value,
      image: addMemeForm.form.image.value
    };

    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', dataToPost.title);
    formData.append('description', dataToPost.description);
    if (dataToPost.image) {
      formData.append('image', dataToPost.image);
    }

    try {
      let url = GV.URLS.API_POST + '/add-meme';
      let method = 'POST';
      if (editMode && typeof memeId === 'string') {
        url = GV.URLS.API_POST + '/update-meme';
        method = 'PATCH';
        formData.append('memeId', memeId);
      }
      const response = await fetch(url, {
        method,
        credentials: 'include',
        body: formData
      });

      const responseJSON = await response.json();
      setStatusMessage(responseJSON.flash);
      if (responseJSON.ok) {
        router.push('/admin');
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getMemeForEdit = async (memeId) => {
    setIsLoading(true);
    try {
      const response = await fetch(GV.URLS.API_POST + '/get-meme', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          memeId: memeId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseJSON = await response.json();
      setStatusMessage(responseJSON.flash);

      const editMemeData = responseJSON.body[0];

      setAddMemeForm((previousState: any) => {
        const prevForm = previousState.form;

        const updatedForm = {
          title: {
            ...prevForm.title,
            value: editMemeData.title,
            valid: true,
            touched: true
          },
          description: {
            ...prevForm.description,
            value: editMemeData.description,
            valid: true,
            touched: true
          },
          image: {
            ...prevForm.image
          }
        };

        setImagePreview(GV.URLS.APP + '/' + editMemeData.imageUrl);

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
    if (props.mode === 'EDIT' && memeId) {
      getMemeForEdit(memeId);
    }
  }, [memeId]);

  return (
    <section className={classesForm.mainForm}>
      {editMode ? <h2>Edit your Meme:</h2> : <h2>Add Meme right here:</h2>}
      {statusMessage.message && <FlashMessage result={statusMessage.result} message={statusMessage.message} />}
      <form onSubmit={submitHandler}>
        <Input
          id="title"
          label="Meme title"
          placeholder="Enter Meme title"
          required={true}
          type="text"
          control="input"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler.bind(this, 'title')}
          value={addMemeForm.form['title'].value}
          valid={addMemeForm.form['title'].valid}
          validationMessage={addMemeForm.form['title'].validationMessage}
          touched={addMemeForm.form['title'].touched}
        />
        <Input
          id="description"
          label="Meme description"
          placeholder="Type Meme description"
          required={true}
          type="text"
          control="textarea"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler.bind(this, 'description')}
          value={addMemeForm.form['description'].value}
          valid={addMemeForm.form['description'].valid}
          validationMessage={addMemeForm.form['description'].validationMessage}
          touched={addMemeForm.form['description'].touched}
        />
        <FilePicker
          id="image"
          label="The image, most vital part of Meme, don't screw it!"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler.bind(this, 'image')}
          valid={addMemeForm.form['image'].valid}
          touched={addMemeForm.form['image'].touched}
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
          {!isLoading && !editMode && <button>Create Meme!</button>}
          {!isLoading && editMode && <button>Update Meme!</button>}
          {isLoading && <p>Sending request...</p>}
        </div>
      </form>
    </section>
  );
};

export default EditMeme;
