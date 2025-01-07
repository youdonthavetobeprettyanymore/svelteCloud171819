// src/routes/[slug]/+page.server.ts

import type { LoadEvent } from '@sveltejs/kit';
import client from '$lib/sanityClient';
import type { PhotoshootData } from '$lib/types/photoshoot';

export const load = async ({ params }: LoadEvent): Promise<{ data: PhotoshootData }> => {
	try {
		const { slug } = params;

		/**
		 * IMPORTANT:
		 *  1) We fetch the “asset” as a *reference* (using `asset-> {...}`),
		 *     because the Sanity Image URL builder (`@sanity/image-url`)
		 *     expects either an image reference or an object with `_id`/`_ref`/`metadata`.
		 *  2) We also fetch `metadata` if we need to compute aspect ratio in the front-end.
		 *  3) We can still grab the `url` if desired, but it’s not strictly necessary
		 *     for the builder to work.
		 */
		const data = await client.fetch(
			`*[_type == "photoshoot" && slug.current == $slug][0]{
				title,
				photoshootTitle,
				photoshootInfo,
				photoshootDate,
				photos[] {
					asset-> {
						_id,
						// includes width/height for the aspect ratio in .metadata.dimensions
						metadata,
						// optional: url if you want raw access, but not needed for builder
						url
					},
					info
				}
			}`,
			{ slug }
		);

		// If no data, you might want to throw a 404
		if (!data) {
			throw new Error(`No photoshoot found for slug: ${slug}`);
		}

		return { data };
	} catch (err) {
		console.error('Error in load function:', err);
		throw err; // SvelteKit will respond with a 500 by default for thrown errors
	}
};
