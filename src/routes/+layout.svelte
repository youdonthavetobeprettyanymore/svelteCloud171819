<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<!-- Navbar -->
<nav class="sticky top-0 z-50 flex items-center justify-between bg-white px-0.5 py-1 text-sm">
	<a href="/">seventeeneighteennineteen</a>
	<a href="/info">info</a>
</nav>

<!-- Main Content -->
<main class="mt-2">
	{@render children()}
</main>
