// helpers.js
import validator from 'validator';
// ValidUrl must be have the https:// in front
export function prepareUrl(code) {
  const strict_par = {
    protocols: ['http','https','ftp'],
    require_tld: true,
    require_protocol: true, // requiring protocol
    require_host: true,
    require_port: false,
    require_valid_protocol: true,
    allow_underscores: false,
    host_whitelist: false,
    host_blacklist: false,
    allow_trailing_dot: false,
    allow_protocol_relative_urls: false,
    allow_fragments: true,
    allow_query_components: true,
    disallow_auth: false,
    validate_length: true
  };

  if (validator.isURL(code, strict_par)) {
    return {is_url: true, value: code};
  }

  if (validator.isURL(code)) {
    return {is_url: true, value: 'http://' + code};
  }
  return {is_url: false, value: code};
}
