<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<nav class="flex items-center justify-between px-0.5 py-1 text-xs">
	<a href="/">seventeeneighteennineteen</a>
	<a href="/info">info</a>
</nav>

{@render children()}
