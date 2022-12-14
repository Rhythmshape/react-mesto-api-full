const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
const BadRequestError = require('../errors/BadRequestError');

module.exports.isUrl = (string) => {
  regex.test(string);
};

module.exports.validationUrl = (string) => {
  if (!regex.test(string)) {
    throw new BadRequestError('Введен некорректный URL');
  }
  return string;
};
