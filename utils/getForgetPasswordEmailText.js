import config from "../config/config.js";

const getForgetPasswordEmailText = (name, uniqueString) => {
  return `<p>Hello ${name.split(" ")[0]}, click the link to verify ${
    config.WEB_APP_BASE_URL
  }/auth/verify_email?token=${uniqueString}</p>`;
};

export default getForgetPasswordEmailText;
