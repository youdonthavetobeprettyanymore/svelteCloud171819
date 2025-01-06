<script lang="ts">
	import type { PhotoshootData } from '$lib/types/photoshoot';

	export let data: { data: PhotoshootData };
	const { title, photoshootTitle, photoshootInfo, photoshootDate, photos } = data.data;

	function getAspectRatio(photo: any): string {
		if (
			photo.asset &&
			photo.asset.metadata &&
			photo.asset.metadata.dimensions &&
			photo.asset.metadata.dimensions.width &&
			photo.asset.metadata.dimensions.height
		) {
			const width = photo.asset.metadata.dimensions.width;
			const height = photo.asset.metadata.dimensions.height;
			return `${width}/${height}`;
		}
		// Fallback aspect ratio
		return '16/9';
	}
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
		{#each photos as photo}
			<div class={`aspect-[${getAspectRatio(photo)}] relative`}>
				<img
					src={photo.asset.url}
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
</main>
