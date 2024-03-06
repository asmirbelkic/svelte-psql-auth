<script>
	import { removeToast, toastsStore } from '$lib/stores/toast';
</script>

<div class="container">
	{#each $toastsStore as toast (toast.id)}
		<button class={`toast ${toast.type}`} on:click={() => removeToast(toast)}>
			{#if toast.title}
				<div class="title">{toast.title}</div>
			{/if}
			<div class="message">{toast.message}</div>
		</button>
	{/each}
</div>


<style>
	:global(*) {
		box-sizing: border-box;
	}
	.container {
		display: flex;
		position: fixed;
		right: 10px;
		top: 10px;
		z-index: 1000;
		flex-direction: column-reverse;
	}
	.toast {
		outline: none;
		border: 0;
		border-radius: 6px;
		color: #fff;
		cursor: pointer;
		display: block;
		margin-bottom: 5px;
		padding: 15px 20px;
		position: relative;
		width: 300px;
	}
	.toast.success {
		background-color: #4caf50;
	}
	.toast.danger {
		background-color: #f44336;
	}
</style>