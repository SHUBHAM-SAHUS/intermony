export const getValidationMessage = (meta, errors) => {
  const name = meta.label;
  const errorType = Object.keys(errors)[0];
  const ValidationKey = Object.keys(errors[errorType])[0];
  const errorConfig = {
    required: `${name} is Required`,
    email: `${name} is Invalid`,
    pattern: `${name} is Invalid`,
    minLength: `${name} Minimum length is ${errors[errorType][ValidationKey]}`,
    notEquivalent: `${name} should be same as Password`
  };
  return errorConfig[errorType];
};

export const checkIfMatchingPasswords = (
  passwordKey,
  passwordConfirmationKey
) => {
  return group => {
    let passwordInput = group.controls[passwordKey],
      passwordConfirmationInput = group.controls[passwordConfirmationKey];
    if (passwordInput.value !== passwordConfirmationInput.value) {
      passwordConfirmationInput.setErrors({ notEquivalent: true });
    } else {
      passwordConfirmationInput.setErrors(null);
    }
    return null;
  };
};
