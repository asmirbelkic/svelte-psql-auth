<script lang="ts">
	import { page } from "$app/stores";
	$: user = $page.data.user;
</script>

{#if user}
	<h1>Logged in as {user.name}</h1>
	<p>Your email is {user.email}</p>
{:else}
	<h1>Not logged in</h1>
{/if}
