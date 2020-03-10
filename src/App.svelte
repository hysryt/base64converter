<script>
import {base64} from './base64.js';

let plain = "";
let encoded = "";

function inputPlain(e) {
  encoded = base64.encode(e.target.value);
}

function inputBase64(e) {
  plain = base64.decode(e.target.value);
}
</script>

<main>
Plain
<textarea on:input={inputPlain} value={plain}></textarea>
Base64
<textarea on:input={inputBase64} value={encoded}></textarea>
</main>

<style>
</style>