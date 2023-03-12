import config from "../config/config.js";

const getSignUpEmailText = (name, uniqueString) => {
  return `<p>Hello ${name.split(" ")[0]}, click this <a target="_blank" href="${
    config.WEB_APP_BASE_URL
  }/auth/verify_email?token=${uniqueString}">link</a></p>`;
};

export default getSignUpEmailText;
