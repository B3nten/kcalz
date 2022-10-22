export type TMeal = {
	id?: number;
	name?: string;
	date: string;
	notes?: string;

	protein?: number;
	carbs?: number;
	fat?: number;
	calories?: number;

	breakfast?: boolean;
	lunch?: boolean;
	dinner?: boolean;
	snack?: boolean;
};

