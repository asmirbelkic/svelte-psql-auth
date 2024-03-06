<script lang="ts">
    import { addToast } from '$lib/stores/toast'
    import { goto } from '$app/navigation'

    const register = {
        email: '',
        password: '',
        name: '',
    }

    async function handleRegister() {
        if (!register.email || !register.password) {
            return addToast({
                type: 'danger',
                message: 'Veuillez remplir tous les champs',
            })
        }
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(register),
        })

				if (res.ok) goto('/board')
				const data = await res.json()

				if(!data.success) addToast({
						type: 'danger',
						message: data.message,
				})
    }
    // your script goes here
</script>

<h1>Register</h1>
<form on:submit|preventDefault={handleRegister}>
    <input type="email" placeholder="email" bind:value={register.email} />
    <input type="text" placeholder="Name" bind:value={register.name} />
    <input type="password" placeholder="Password" bind:value={register.password} />
    <button type="submit">Register</button>
</form>
