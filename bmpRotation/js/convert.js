/* eslint-disable no-plusplus */
export default function convert(buffer) {
  console.log(buffer);
  const int8ArrayView = new Int8Array(buffer);
  for (let i = 69, len = int8ArrayView.length; i < len; i += 3) {
    int8ArrayView[i] += 100;
  }
  return buffer;
}
