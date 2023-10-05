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

export function prepareCoordinate(data) {
  //remove the geo: string
  const code = data.replace('geo:', '');
  //split the string in two parts
  const parts = code.split(',');
  return {lat: parts[0], lng: parts[1]};
}

export function formattedDate(timestamp) {
  // Create a Date object from the timestamp
  const date = new Date(parseInt(timestamp));

  // Extract day, month, year, hour, and minute components
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  // Format the date as "dd/mm/yyyy hh:mm:ss"
  const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;

  return formattedDate;
}
