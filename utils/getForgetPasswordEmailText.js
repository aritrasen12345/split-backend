import config from "../config/config.js";

const getForgetPasswordEmailText = (name, uniqueString) => {
  return `<p>Hello ${name.split(" ")[0]}, click this <a target="_blank" href="${
    config.WEB_APP_BASE_URL
  }/auth/set_new_password?token=${uniqueString}">link</a></p>`;
};

export default getForgetPasswordEmailText;
