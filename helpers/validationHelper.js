class Validator {
  check(source, inpt) {
    const validationError = [];
    for (const fieldname in source) {
      for (const rulename in source[fieldname]) {
        const rulevalue = source[fieldname][rulename];
        if (rulename === 'required' && inpt[fieldname] === '') {
          validationError.push(`${fieldname.replace(/_/g, ' ')} is required`);
        } else {
          if (rulename === 'minLenght' && String(inpt[fieldname]).length < rulevalue) validationError.push(`${fieldname.replace(/_/g, ' ')} field must contain at least ${rulevalue} characters`);
          if (rulename === 'maxLenght' && String(inpt[fieldname]).length > rulevalue) validationError.push(`${fieldname.replace(/_/g, ' ')} field must contain at most ${rulevalue} characters`);
          if (rulename === 'type' && !/^[a-zA-Z]+$/.test(String(inpt[fieldname])) && rulevalue === 'text') validationError.push(`${fieldname.replace(/_/g, ' ')} field must contain only letters`);
          if (rulename === 'type' && !/\S+@\S+\.\S+/.test(String(inpt[fieldname])) && rulevalue === 'email') validationError.push(`${fieldname.replace(/_/g, ' ')} field contain an invalid email address`);
          if (rulename === 'type' && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(String(inpt[fieldname])) && rulevalue === 'password') validationError.push(`${fieldname.replace(/_/g, ' ')} must contain at The string must contain at least 1 lowercase alphabetical character, The string must contain at least 1 uppercase alphabetical character, The string must contain at least 1 numeric character`);
          if (rulename === 'matches' && String(inpt[fieldname]) !== String(inpt[`c${fieldname}`])) validationError.push(`${fieldname.replace(/_/g, ' ')} don't match`);
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
