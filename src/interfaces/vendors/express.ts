/**
 * Express types definitions
 *
 * @author Piotr Podstawski <podstawski.p@gmail.com>
 */

import { Request, Response, NextFunction } from 'express';
import User from '../../models/User';

// @todo clean this type def
export interface IRequest extends Request {
  flash(message: string, callback: any): any;
  session: any;
  user?: User;
  csrfToken?: any;
  comment?: {
    text: string;
  };
}

export interface IResponse extends Response {
  username: string;
}

export interface INext extends NextFunction {}
