<script lang="ts">
    import { invalidateAll } from '$app/navigation'
    import { page } from '$app/stores'
    $: user = $page.data.user

    async function logout() {
				if(!user) return
        try {
            // Envoyer une requête POST à la route de déconnexion
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'same-origin',
            })
            await invalidateAll()
        } catch (error) {
            console.error('Erreur lors de la déconnexion :', error)
        }
    }
</script>

{#if user}
    <h1>Logged in as {user.name}</h1>
    <p>Your email is {user.email}</p>
    <button on:click={logout}>Logout</button>
{:else}
    <h1>Not logged in</h1>
{/if}
