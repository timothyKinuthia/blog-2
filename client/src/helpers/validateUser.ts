
import { IUserRegister } from './IUser';

export const validateInput = ({ name, account, password, passwordConfirm }: IUserRegister) => {
    let error = {
        msg: ""
    };

    if (name.length > 40) {
        error.msg = "Your name is too long."
    }

    if (password !== passwordConfirm) {
        error.msg = "Passwords don't match!"
    };

    if (password.length < 7 ) {
        error.msg = "Passwords should have minimum of 7 chars"
    };

    if (password.length > 35) {
        error.msg = "Passwords should have maximum of 35 chars"
    }

    if (!isValidEmail(account) && !isValidPhone(account)) {
        error.msg = "Invalid email or phone number!"
    };

    return { error };
};

export const isValidEmail = (email: string) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    return re.test(String(email).toLowerCase());
  };
  
  export const isValidPhone = (phone: string) => {
      var patt = /^[\+]?\d{2,}?[(]?\d{2,}[)]?[-\s\.]?\d{2,}?[-\s\.]?\d{2,}[-\s\.]?\d{0,9}$/im;
      return patt.test(phone);
  };