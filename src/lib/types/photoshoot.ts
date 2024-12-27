export interface PhotoshootData {
	title: string;
	photoshootTitle: string;
	photoshootInfo: string[];
	photoshootDate: string;
	photos: {
		asset: {
			url: string;
		};
		info?: string;
	}[];
}
