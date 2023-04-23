import type { Id } from './Id';

export type Member<NAME extends string = string, ID extends Id = Id> = {
	id: ID;
	name: NAME;
	color: `#${string}` | undefined;
	videoId: string | undefined;
};
