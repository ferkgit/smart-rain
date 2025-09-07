export async function downloadPriceList(listId) {
  const response = await fetch(`/pricing/export/${listId}`);
  if (!response.ok) {
    throw new Error('Failed to download price list');
  }
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `price_list_${listId}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
