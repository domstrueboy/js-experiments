/* eslint-disable no-plusplus */
export default function convert(buffer) {
  const Uint8ArrayView = new Uint8Array(buffer);
  const savedUint8ArrayView = Uint8Array.from(Uint8ArrayView);
  const headersBytes = 68;
  const len = savedUint8ArrayView.length;
  const width = savedUint8ArrayView[18];
  const height = savedUint8ArrayView[22];

  Uint8ArrayView[18] = height;
  Uint8ArrayView[22] = width;

  for (let i = 0; i < height; i++) {
    for (let j = width - 1; j >= 0; j--) {
      Uint8ArrayView[headersBytes + 1 + j * height * 3 + i * 3] = savedUint8ArrayView[headersBytes + 1 + i * width * 3 + j * 3];
      Uint8ArrayView[headersBytes + 1 + j * height * 3 + i * 3 + 1] = savedUint8ArrayView[headersBytes + 1 + i * width * 3 + j * 3 + 1];
      Uint8ArrayView[headersBytes + 1 + j * height * 3 + i * 3 + 2] = savedUint8ArrayView[headersBytes + 1 + i * width * 3 + j * 3 + 2];
    }
  }
  return buffer;
}
