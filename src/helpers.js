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

export function prepareWifi(data) {
  //remove the geo: string
  const code = data.replace('WIFI:', '');
  //split the string in two parts
  const parts = code.split(';');
  let wifi_info = {};
  //loop aver parts
  for (let i = 0; i < parts.length; i++) {
    let fragments = parts[i].split(':');
    if (fragments[0] == '') {
      continue;
    }
    wifi_info[fragments[0]] = fragments[1];
  }
  return wifi_info;
}

export function prepareVCard(data) {
  let raw_data = data.replace('BEGIN:VCARD\n', '');
  raw_data = raw_data.replace('END:VCARD\n', '');
  const parts = raw_data.split('\n');
  let vcard_info = {};
  for (let i = 0; i < parts.length; i++) {
    let fragments = parts[i].split(':');
    if (fragments[0] == '') {
      continue;
    }
    vcard_info[fragments[0]] = fragments[1];
  }
  return vcard_info;
}

export function detectCodeType(code) {
  if (code.startsWith("geo:")) {
    return "geo";
  } else if (code.startsWith("WIFI:")) {
    return "wifi";
  } else if (code.startsWith("BEGIN:VCARD")) {
    return "vcard";
  } else if (code.startsWith("http")) {
    return "url";
  }
  return "text";
}