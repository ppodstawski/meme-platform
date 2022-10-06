import GV from '../util/constValues';
import { ISetStateLoading } from '../interfaces/FormData';

type TPostData = {
  email: string;
  username?: string;
  password: string;
  isLogin: boolean;
};

const submitHandler = async (setStateForLoading: ISetStateLoading, data: TPostData) => {
  setStateForLoading(true);
  const url = data.isLogin ? GV.URLS.LOGIN : GV.URLS.SIGNUP;

  try {
    const response = await fetch(GV.URLS.API_POST + url, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        ...data
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    setStateForLoading(false);

    return await response.json();
  } catch (error: any) {
    console.log(error.message);
  } finally {
    setStateForLoading(false);
  }
};

export default submitHandler;
