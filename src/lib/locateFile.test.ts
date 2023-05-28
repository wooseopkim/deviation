import path, { basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import { describe, expect, it } from "vitest";
import locateFile from "./locateFile";

describe(locateFile.name, () => {
  it('should locate directly contained path', async () => {
    const filename = fileURLToPath(import.meta.url);
    const root = dirname(dirname(filename));
    const subpath = path.join(basename(dirname(filename)), basename(filename));

    const file = await locateFile(root, subpath);

    expect(file).toBe(filename);
  });
  
  it('should reject when root does not contain path', async () => {
    const filename = fileURLToPath(import.meta.url);

    const p = locateFile(dirname(filename), 'this file does not exist');

    expect(p).rejects.toEqual(new Error('not found'));
  });
  
  it('should locate indirectly contained path', async () => {
    const filename = fileURLToPath(import.meta.url);
    const root = dirname(dirname(filename));
    const subpath = basename(filename);

    const file = await locateFile(root, subpath);

    expect(file).toBe(filename);
  });
});
