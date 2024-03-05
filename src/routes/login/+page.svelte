<script lang="ts">
	import { goto } from "$app/navigation";

	const auth = {
		email: "sfr@sfr.fr",
		password: "test",
	};
	async function handleLogin() {
		if (!auth.email || !auth.password) return;
		try {
			const res = await fetch("/api/auth", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(auth),
			});

			if (res.ok) goto("/");
		} catch (e: unknown) {
			console.log("Error creating account: ", (e as Error).message);
		}
	}
</script>

<div>
	<h1>Auth</h1>
	<form on:submit|preventDefault={handleLogin}>
		<input type="email" placeholder="email" bind:value={auth.email} />
		<input type="password" placeholder="Password" bind:value={auth.password} />
		<button type="submit">auth</button>
	</form>
</div>
