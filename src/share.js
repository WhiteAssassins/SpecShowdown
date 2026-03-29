function toUrlSafeBase64(input) {
  return input.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromUrlSafeBase64(input) {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/');
  const padding = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4));
  return normalized + padding;
}

export function encodeSharePayload(payload) {
  const bytes = new TextEncoder().encode(JSON.stringify(payload));
  let binary = '';

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return toUrlSafeBase64(window.btoa(binary));
}

export function decodeSharePayload(hash = window.location.hash) {
  const match = hash.match(/share=([^&]+)/);

  if (!match) {
    return null;
  }

  try {
    const binary = window.atob(fromUrlSafeBase64(match[1]));
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch (error) {
    console.warn('SpecShowdown: failed to decode shared payload.', error);
    return null;
  }
}

export function buildShareUrl(payload) {
  const base = window.location.href.split('#')[0];
  return `${base}#share=${encodeSharePayload(payload)}`;
}

export function clearShareHash() {
  window.history.replaceState({}, '', `${window.location.pathname}${window.location.search}`);
}
