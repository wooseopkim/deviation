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
