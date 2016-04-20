// Should accept url-ish strings with an optional scheme, domain name, ip, and port
const URLISH_REGEX = /^(https?:\/\/)?([a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+|(\d{1,3}\.){3}\d{1,3})(\:\d+)?$/;

export const validateUrlish = (url) =>
  (url && URLISH_REGEX.test(url)) ? true : false;
