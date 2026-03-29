import { toPng } from 'html-to-image';

function downloadBlob(blob, fileName) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(link.href);
}

export async function downloadNodeAsPng(node, fileName) {
  const exportWidth = Number(node.dataset.exportWidth) || 1200;
  const exportHeight = Number(node.dataset.exportHeight) || 675;
  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: '#05070d',
    width: exportWidth,
    height: exportHeight,
    style: {
      width: `${exportWidth}px`,
      height: `${exportHeight}px`,
      maxWidth: 'none',
      margin: '0',
      display: 'block',
      background: '#05070d',
    },
  });

  const response = await fetch(dataUrl);
  const blob = await response.blob();
  downloadBlob(blob, fileName);
}

export function downloadJson(data, fileName) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  downloadBlob(blob, fileName);
}

export function downloadText(text, fileName) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, fileName);
}

export async function copyToClipboard(text) {
  if (!navigator.clipboard) {
    return false;
  }

  await navigator.clipboard.writeText(text);
  return true;
}
