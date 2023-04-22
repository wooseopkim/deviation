import { isKnown, type LargeS, type SmallS } from './members';
import { members } from './members';

type Size = 'small' | 'medium' | 'big' | 'max';

const sizes: {
	[size in Size]: string;
} = {
	small: 'default',
	medium: 'hqdefault',
	big: 'sddefault',
	max: 'maxresdefault',
};

export function getThumbnail(videoId: string, size: Size = 'medium') {
	return `https://img.youtube.com/vi/${videoId}/${sizes[size]}.jpg`;
}

export function getVideoId(name: LargeS | SmallS) {
	const member = members[name];
	if (!isKnown(member)) {
		return member.teaserVideoId;
	}
	return member.revealVideoId;
}
