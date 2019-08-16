/* eslint-disable no-plusplus */
export default function convert(buffer) {
  const Uint8ArrayView = new Uint8Array(buffer);
  const savedUint8ArrayView = Uint8Array.from(Uint8ArrayView);
  const headersBytes = 54;
  const width = savedUint8ArrayView[18];
  const height = savedUint8ArrayView[22];

  Uint8ArrayView[18] = height;
  Uint8ArrayView[22] = width;

  for (let i = 1; i <= height; i++) {
    for (let j = 1; j <= width; j++) {
      const I = headersBytes + (height - i) * width * 3 + j * 3;
      const O = headersBytes + j * height * 3 + i * 3;
      Uint8ArrayView[O] = savedUint8ArrayView[I];
      Uint8ArrayView[O + 1] = savedUint8ArrayView[I + 1];
      Uint8ArrayView[O + 2] = savedUint8ArrayView[I + 2];
    }
  }
  return buffer;
}
