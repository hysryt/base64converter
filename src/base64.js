const base64 = {}
const map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+.';

base64.encode = function(str) {
  const chars = str.split('').map(c => {
    const code = c.charCodeAt(0);
    const bin = code.toString(2);
    return ('00000000' + bin).slice(-8);
  });
  let binary = chars.join('');
  const paddingNum = (6 - binary.length % 6) % 6;
  binary += '0'.repeat(paddingNum);
  const encodedCharBinaries = [];
  let idx = 0;
  while (binary.length > idx) {
    encodedCharBinaries.push(binary.substr(idx, 6));
    idx += 6;
  }
  const encodedChars = encodedCharBinaries.map(b => {
    const code = parseInt(b, 2);
    return map.charAt(code);
  })
  let encoded = encodedChars.join('');
  encoded += '='.repeat((4 - encoded.length % 4) % 4);
  return encoded;
}

base64.decode = function(str) {
  let decoded = str.split('').filter(c => c !== '=').map(c => {
    return ('000000' + map.indexOf(c).toString(2)).slice(-6);
  }).join('');
  decoded = decoded.slice(0, decoded.length - decoded.length % 8);
  if (decoded.length !== 0) {
    decoded = new Array(decoded.length/8).fill(0).map((_,i) => {
      const code = parseInt(decoded.substr(i * 8, 8), 2);
      return String.fromCharCode(code);
    }).join('');
  }
  return decoded;
}

exports.base64 = base64;