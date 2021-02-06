export const getSiteMapFromFile = (textContent: string) => {
  const siteRows = textContent.trim().split('\n');

  return [
    ...siteRows.map((row) => row.trim().split(''))
  ];
};