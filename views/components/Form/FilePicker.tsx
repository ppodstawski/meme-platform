import React from 'react';

import classes from './Input.module.scss';
import { TFilePickerProps } from '../../types/inputProps';

const FilePicker: React.FC<TFilePickerProps> = (props) => {
  return (
    <div className={classes.inputField}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        className={[!props.valid ? 'invalid' : 'valid', props.touched ? 'touched' : 'untouched'].join(' ')}
        type="file"
        id={props.id}
        onChange={(e) => props.onChange(props.id, e.target.value, e.target.files)}
        onBlur={props.onBlur}
      />
    </div>
  );
};

export default FilePicker;
