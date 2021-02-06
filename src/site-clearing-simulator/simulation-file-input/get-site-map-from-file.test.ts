import { getSiteMapFromFile } from './get-site-map-from-file';

describe('getSiteMapFromFile', () => {
  it('should convert stringified map to site map', () => {
    const sampleMap = 'ooo\nttT\nrrr';

    expect(getSiteMapFromFile(sampleMap)).toEqual([
      ['o', 'o', 'o'],
      ['t', 't', 'T'],
      ['r', 'r', 'r']
    ]);
  });

  it('should handle redundant spaces on lines', () => {
    const sampleMap = 'ooo  \nttT \nrrr   ';

    expect(getSiteMapFromFile(sampleMap)).toEqual([
      ['o', 'o', 'o'],
      ['t', 't', 'T'],
      ['r', 'r', 'r']
    ]);
  });

  it('should handle newline at the end', () => {
    const sampleMap = 'ooo\nttT\nrrr\n';

    expect(getSiteMapFromFile(sampleMap)).toEqual([
      ['o', 'o', 'o'],
      ['t', 't', 'T'],
      ['r', 'r', 'r']
    ]);
  });
});