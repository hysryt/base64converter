<script>
let plain = "";
let base64 = "";

function inputPlain(e) {
  const encoded = encode(e.target.value);
  base64 = encoded;
}

function inputBase64(e) {
  const decoded = decode(e.target.value);
  plain = decoded;
}

function encode(str) {
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
  const map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+.';
  const encodedChars = encodedCharBinaries.map(b => {
    const code = parseInt(b, 2);
    return map.charAt(code);
  })
  let encoded = encodedChars.join('');
  encoded += '='.repeat((4 - encoded.length % 4) % 4);
  return encoded;
}

function decode(str) {
  return str;
}
</script>

<main>
Plain
<textarea on:input={inputPlain} value={plain}></textarea>
Base64
<textarea on:input={inputBase64} value={base64}></textarea>
</main>

<style>
</style>