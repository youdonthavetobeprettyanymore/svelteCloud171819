<script lang="ts">
	import type { PhotoshootData } from '$lib/types/photoshoot';
	import { urlFor } from '$lib/sanityClient';
	import { onMount } from 'svelte';

	export let data: { data: PhotoshootData };
	const { title, photoshootTitle, photoshootInfo, photoshootDate, photos } = data.data;

	// We'll store a subset of the photos here
	let displayedPhotos: any[] = [];
	let chunkSize = 6; // How many photos to load per chunk
	let currentIndex = 0; // Tracks how many we've loaded so far

	/**
	 * Compute aspect ratio for Tailwind's aspect-ratio utility.
	 */
	function getAspectRatio(photo: any): string {
		if (photo?.asset?.metadata?.dimensions?.width && photo?.asset?.metadata?.dimensions?.height) {
			const { width, height } = photo.asset.metadata.dimensions;
			return `${width}/${height}`;
		}
		return '16/9';
	}

	/**
	 * Return an optimized URL from Sanity.
	 * Here, we’re using width(2000), but feel free to do srcset if you like.
	 */
	function getOptimizedUrl(photo: any) {
		return urlFor(photo.asset)
			.width(2000)
			.quality(90)
			.fit('max')
			.auto('format') // Let Sanity serve WebP, AVIF, etc. where possible
			.url();
	}

	/**
	 * Load the next chunk of photos into `displayedPhotos`.
	 */
	function loadMore() {
		if (currentIndex >= photos.length) return; // No more photos to load
		const nextSlice = photos.slice(currentIndex, currentIndex + chunkSize);
		displayedPhotos = [...displayedPhotos, ...nextSlice];
		currentIndex += chunkSize;
	}

	let observer: IntersectionObserver;

	onMount(() => {
		// Create the IntersectionObserver, watching the sentinel
		observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				loadMore();
			}
		});

		const sentinel = document.getElementById('sentinel');
		if (sentinel) {
			observer.observe(sentinel);
		}

		// Load the first chunk immediately
		loadMore();
	});
</script>

<main class="mx-auto max-w-7xl p-4">
	<!-- Shoot Info. -->
	<div class="mb-4 flex flex-col items-center text-center">
		<h1 class="text-xl">{photoshootTitle}</h1>
		<ul class="text-sm">
			{#each photoshootInfo as role}
				<p class="text-sm">{role}</p>
			{/each}
		</ul>
		<p class="text-sm text-rose-900">{photoshootDate}</p>
	</div>

	<!-- Gallery Section. -->
	<section class="grid grid-cols-2 gap-1">
		{#each displayedPhotos as photo, i (i)}
			<div class={`aspect-[${getAspectRatio(photo)}] relative`}>
				<img
					src={getOptimizedUrl(photo)}
					alt={photo.info || 'Photo from shoot'}
					class="h-full w-full object-cover"
					loading="lazy"
				/>
				{#if photo.info}
					<p class="mt-1 text-sm text-gray-600">{photo.info}</p>
				{/if}
			</div>
		{/each}
	</section>

	<!-- Sentinel for IntersectionObserver -->
	<div id="sentinel" class="h-2"></div>
</main>
