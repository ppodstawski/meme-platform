import React from 'react';

import classes from './Input.module.scss';
import { TInputProps } from '../../types/inputProps';

const Input: React.FC<TInputProps> = (props) => {
  let passPower = 0;
  if (props.additionalInfo && props.additionalInfo.passwordStrength) {
    passPower = props.additionalInfo.passwordStrength;
  }
  return (
    <div className={classes.inputField}>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      {props.control === 'input' && (
        <input
          className={[!props.valid ? 'invalid' : 'valid', props.touched ? 'touched' : 'untouched'].join(' ')}
          type={props.type}
          id={props.id}
          required={props.required}
          value={props.value}
          placeholder={props.placeholder}
          onChange={(e) => props.onChange(props.id, e.target.value, e.target.files)}
          onBlur={props.onBlur}
        />
      )}
      {props.control === 'textarea' && (
        <textarea
          className={[!props.valid ? 'invalid' : 'valid', props.touched ? 'touched' : 'untouched'].join(' ')}
          id={props.id}
          rows={props.textareaRows}
          required={props.required}
          value={props.value}
          placeholder={props.placeholder}
          onChange={(e) => props.onChange(props.id, e.target.value)}
          onBlur={props.onBlur}
        />
      )}
      {passPower === 3 && <div className="pass-result-strong">Strong password</div>}
      {passPower === 2 && <div className="pass-result-medium">Medium password</div>}
      {passPower === 1 && <div className="pass-result-weak">Weak password</div>}
      {props.validationMessage && <div className="validation-error-msg">{props.validationMessage}</div>}
    </div>
  );
};

export default Input;
