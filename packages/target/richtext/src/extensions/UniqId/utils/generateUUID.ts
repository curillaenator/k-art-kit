const hexArray: string[] = [];
for (let i = 0; i < 256; ++i) {
  hexArray.push((i + 256).toString(16).slice(1));
}

// @ts-expect-error
function generateUUIDFromBytes(bytes, offset = 0) {
  return (
    hexArray[bytes[offset + 0]] +
    hexArray[bytes[offset + 1]] +
    hexArray[bytes[offset + 2]] +
    hexArray[bytes[offset + 3]] +
    '-' +
    hexArray[bytes[offset + 4]] +
    hexArray[bytes[offset + 5]] +
    '-' +
    hexArray[bytes[offset + 6]] +
    hexArray[bytes[offset + 7]] +
    '-' +
    hexArray[bytes[offset + 8]] +
    hexArray[bytes[offset + 9]] +
    '-' +
    hexArray[bytes[offset + 10]] +
    hexArray[bytes[offset + 11]] +
    hexArray[bytes[offset + 12]] +
    hexArray[bytes[offset + 13]] +
    hexArray[bytes[offset + 14]] +
    hexArray[bytes[offset + 15]]
  ).toLowerCase();
}

let getRandomValuesUnsafe: Crypto['getRandomValues'];
const randomBytes = new Uint8Array(16);
function getRandomValues() {
  if (
    !getRandomValuesUnsafe &&
    ((getRandomValuesUnsafe =
      typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)),
    !getRandomValuesUnsafe)
  ) {
    throw new Error('crypto.getRandomValues() not supported.');
  }
  return getRandomValuesUnsafe(randomBytes);
}

const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);

export function generateUUID(options?: any, rng?: any) {
  if (randomUUID && !rng && !options) return randomUUID();
  options = options || {};
  const randomValues = options.random || (options.rng || getRandomValues)();
  randomValues[6] = (randomValues[6] & 0x0f) | 0x40; // UUID version 4
  randomValues[8] = (randomValues[8] & 0x3f) | 0x80; // UUID variant 10
  return generateUUIDFromBytes(randomValues);
}
