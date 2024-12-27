import type { LoadEvent } from '@sveltejs/kit';
import client from '$lib/sanityClient';
import type { PhotoshootData } from '$lib/types/photoshoot';

export const load = async ({ params }: LoadEvent): Promise<{ data: PhotoshootData }> => {
	try {
		const { slug } = params;
		const data = await client.fetch(
			`*[_type == "photoshoot" && slug.current == $slug][0]{
				title,
				photoshootTitle,
				photoshootInfo,
				photoshootDate,
				photos[] {
					asset->{url},
					info
				}
			}`,
			{ slug }
		);
		return { data };
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};
