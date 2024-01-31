import {  User } from 'firebase/auth'
import { AuthFormValues } from '../@types';
import { insertData } from './insertData';

const saveUserData = async (data: AuthFormValues, user: User) => {
  const userData = {
    name: data["name"],
    email: user.email,
    photoURL: user.photoURL,
    phoneNumber: user.phoneNumber,
    emailVerified: user.emailVerified,
    uid: user.uid,
  };

  await insertData("Users", userData);
};

export default saveUserData