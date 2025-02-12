export const datePickerFormat = 'dd/MM/yyyy';

export const errorMessages = {
  alphanumericRequired: 'Value must be alphanumeric',
  amountGreaterThanZero: 'Value must be greater than $0.00',
  codeMustBeTenDigits: 'Must be exactly 10 digits',
  creditCardMachineConnectionError: 'Unable to connect to credit card machine',
  dollarValueRequired: 'Must be a dollar value',
  duplicateProduct: ' was already added.',
  familyNameInvalid: 'Invalid family name',
  fromDateMustBeBeforeToDate: 'From should be before To',
  futureDateNotAllowed: 'Cannot select a date in the future',
  givenNameInvalid: 'Invalid given name.',
  greaterThanZeroRequired: 'Must be an integer greater than 0',
  mismatchEmail: 'Emails must match.',
  mismatchPassword: 'Passwords must match.',
  incorrectPassword: 'Incorrect Password',
  noSpecialCharactersAllowed: 'No special characters allowed',
  noWhitespaceOrSpecialCharacters: 'Cannot contain white space or special characters.',
  notFound: 'Not found',
  passwordSameAsOld: 'The new password cannot be the same as the current password.',
  pastDateRequired: 'Date must be earlier than today',
  toDateMustBeAfterFromDate: 'To should be after From',
  tooEarlyDate: 'Date is too early',
  totalMustBeEqualOrLess: 'Must be equal or less than total',
  validEmailRequired: 'Enter a valid email address',
  validDateRequired: 'Please enter a valid date',
  validNumberRequired: 'Please enter a valid number.',
  validZipCodeRequired: 'Please Enter a valid Zip / Postal code.',
  validPasswordRequired:
    'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.',
};

export const regexAlphenumeric = /^[a-zA-Z0-9]+$/;
export const regexAlphenumericWithSpaces = /^[A-Za-z0-9 ]*$/;
export const regexAlphenumericWithDashesAndSpaces = /^[A-Za-z0-9- ]*$/;
export const regexUsername = /^[a-zA-Z0-9.]+$/;
export const cognitoUserNamesRegex = /^[A-Za-záéíóúñÁÉÍÓÚÑ\s'-]{1,40}$/;
export const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ])[A-Za-z0-9^$*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ]{8,256}$/;
export const dollarValueRegex = /^-?(0|[1-9][0-9]{0,2})(,\d{3})*(\.\d{1,2})?$/;
export const commaSeparationRegex = /\B(?=(\d{3})+(?!\d))/g;
export const dollarValueGreaterThanZeroRegex = /^(?!0+$)([1-9][0-9]{0,2})(,\d{3})*(.\d{1,2})?$/;
export const ENTER_KEYCODE = 13;
export const regexLeadingZero = /^(-?)(0+)(?=.)/;
export const regexPositiveDigit = /^\d+$/;
export const regexPositiveNonRequiredDigit = /^\d*$/;
export const regexAnyDigit = /^-?\d+$/;
export const regexDigitOrMinus = /^-?\d*$/;
export const regexPositiveDigitOrFloatPoint = /^(?:0|[1-9]\d*)(?:\.\d+)?$/;
