import config from "../config/config.js"

const getSignUpEmailText = (name, uniqueString) => {
  return `<p>Hello ${name.split(" ")[0]}, click the link to verify ${
    config.WEB_APP_BASE_URL
  }/auth/verify_email?key=${uniqueString}</p>`;
};

export default getSignUpEmailText;
