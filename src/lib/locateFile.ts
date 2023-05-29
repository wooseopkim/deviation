import fs from 'fs';
import path from 'path';

export default async function locateFile(root: string, subpath: string): Promise<string> {
	const [upmost, ...rest] = path.normalize(subpath).split(path.sep).filter(Boolean);
	const ps = fs.readdirSync(root).map((x) => {
		const current = path.resolve(root, x);
    console.debug('inspecting', current);
		if (x === upmost && rest.length === 0) {
			return Promise.resolve(current);
		}
		if (fs.statSync(current).isDirectory()) {
			const p = x === upmost ? rest.join(path.sep) : subpath;
			return locateFile(current, p);
		}
		return Promise.reject();
	});
	return Promise.any(ps).catch(() => {
    const message = `Couldn't locate <${subpath}> in <${root}>`;
    const error = new Error(message);
    return Promise.reject(error);
  });
}
