let SECRET_KEY = 'Sis257';
let SECRET_JWT = 'MiClaveSecreta123*';

module.exports = {
  SECRET_KEY,
  SECRET_TOKEN: require('crypto').createHmac('sha256', SECRET_KEY).update(SECRET_JWT).digest('hex')
};
