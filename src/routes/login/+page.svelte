<script lang="ts">
    import { addToast } from '$lib/stores/toast'
    import { goto } from '$app/navigation'

    const auth = {
        email: 'sfr@sfr.fr',
        password: 'testsss',
    }
    async function handleLogin() {
        if (!auth.email || !auth.password) {
            return addToast({
                type: 'danger',
                message: 'Veuillez remplir tous les champs',
            })
        }
				const res = await fetch('/api/auth', {
						method: 'POST',
						headers: {
								'Content-Type': 'application/json',
						},
						body: JSON.stringify(auth),
				})

				if (res.ok) goto('/board')
				const data = await res.json()

				if(!data.success) addToast({
						type: 'danger',
						message: data.message,
				})
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

