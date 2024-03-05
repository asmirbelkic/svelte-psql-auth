<script lang="ts">
		const register = {
		email: '',
		password: '',
		name: ''
	}


	function handleRegister() {
		if(!register.email || !register.password) return;
		fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(register)
		})
	}
	// your script goes here
</script>

<h1>Register</h1>
<form on:submit|preventDefault={handleRegister}>
	<input type="email" placeholder="email" bind:value={register.email}/>
	<input type="text" placeholder="Name" bind:value={register.name} />
	<input type="password" placeholder="Password" bind:value={register.password}/>
	<button type="submit">Register</button>
</form>