class Validator {
  check(source, inpt, localStorage = []) {
    const validationError = [];
    for (const fieldname in source) {
      for (const rulename in source[fieldname]) {
        const rulevalue = source[fieldname][rulename];
        if (rulename === 'required' && inpt[fieldname] === '') {
          validationError.push(`${fieldname.replace(/_/g, ' ')} is required`);
        } else {
          const constraint = rulename;
          switch (constraint) {
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
              localStorage.map((values) => {
                if (values.email === String(inpt[fieldname])) validationError.push(`${fieldname.replace(/_/g, ' ')} is already used`);
                if (values.subject === String(inpt[fieldname])) validationError.push(`this ${fieldname.replace(/_/g, ' ')} is already created`);
              });
              break;
            case 'uniqueupdate':
              localStorage.map((values) => {
                if (values.email === String(inpt[fieldname]) && values.id !== parseInt(inpt.id)) validationError.push(`${fieldname.replace(/_/g, ' ')} is already used`);
                if (values.subject === String(inpt[fieldname]) && values.id !== parseInt(inpt.id)) validationError.push(`this ${fieldname.replace(/_/g, ' ')} is already created`);
              });
              break;
          }
        }
      }
    }
    if (validationError.length === 0) {
      return true;
    }
    return validationError;
  }
}

module.exports = Validator;
