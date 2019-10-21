/* eslint-disable default-case */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
class Validator {
  check(source, inpt, localStorage) {
    const validationError = [];
    for (const fieldname in source) {
      for (const rulename in source[fieldname]) {
        const rulevalue = source[fieldname][rulename];
        if (rulename === 'required' && inpt[fieldname] === '') {
          validationError.push(`${fieldname.replace(/_/g, ' ')} is required`);
        } else {
          const contraint = rulename;
          switch (contraint) {
            case 'minLenght':
              if (String(inpt[fieldname]).length < rulevalue) validationError.push(`${fieldname.replace(/_/g, ' ')} field must contain at least ${rulevalue} characters`);
              break;
            case 'maxLenght':
              if (String(inpt[fieldname]).length > rulevalue) validationError.push(`${fieldname.replace(/_/g, ' ')} field must contain at most ${rulevalue} characters`);
              break;
            case 'type':
              switch (rulevalue) {
                case 'text':
                  if (!/^[a-zA-Z]+$/.test(String(inpt[fieldname]))) validationError.push(`${fieldname.replace(/_/g, ' ')} field must contain only letters`);
                  break;
                case 'email':
                  if (!/\S+@\S+\.\S+/.test(String(inpt[fieldname]))) validationError.push(`${fieldname.replace(/_/g, ' ')} field contain an invalid email address`);
                  break;
                case 'password':
                  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(String(inpt[fieldname]))) validationError.push(`${fieldname.replace(/_/g, ' ')} must contain at The string must contain at least 1 lowercase alphabetical character, The string must contain at least 1 uppercase alphabetical character, The string must contain at least 1 numeric character`);
                  break;
              }
              break;
            case 'matches':
              if (String(inpt[fieldname]) !== String(inpt[`c${fieldname}`])) validationError.push(`${fieldname.replace(/_/g, ' ')} don't match`);
              break;
            case 'unique':
              // eslint-disable-next-line array-callback-return
              localStorage.map((values) => {
                if (values.Email === String(inpt[fieldname])) validationError.push(`${fieldname.replace(/_/g, ' ')} is already used`);
              });
              break;
          }
        }
      }
    }
    if (validationError.length === 0) {
      // eslint-disable-next-line no-param-reassign
      return true;
    }
    return validationError;
  }
}

module.exports = Validator;
