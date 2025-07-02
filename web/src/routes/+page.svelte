<script>
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	let todos = $derived(data.todos);
	let message = $derived(data.message);

	let loading = $state(false);

	// Add a new todo
</script>

<div class="mt-12 flex h-svh flex-col items-center gap-y-4 p-4">
	<h1>Workflow is working 😎</h1>
	<h2>This should appear by now</h2>
	<h2>This the newest of newest version of frontend</h2>
	<h3 class="mx-auto max-w-2xl text-2xl font-semibold">{message}</h3>

	<div class="container mx-auto mb-4 max-w-3xl">
		<form
			action="?/add"
			method="post"
			use:enhance={() => {
				loading = true;

				return async ({ update }) => {
					await update();
					loading = false;
				};
			}}
		>
			<input type="text" name="description" placeholder="Add a new task" />
			<button type="submit" disabled={loading}>
				{loading ? 'Adding...' : 'Add'}
			</button>
		</form>
	</div>

	<div class="container mx-auto max-w-3xl flex-1">
		<ul>
			{#each todos as todo}
				<li class="todo-item gap-x-2 bg-gray-100">
					{#if form && form.form === `delete-${todo.id}`}{form.message}{/if}
					<span class="flex-1">{todo.description}</span>
					<form
						class="flex gap-x-2"
						action="?/complete"
						method="post"
						use:enhance={() => {
							loading = true;
							return async ({ update }) => {
								await update();
								loading = false;
							};
						}}
					>
						<input type="hidden" name="id" value={todo.id} />
						<input type="hidden" name="completed" value={!todo.completed} />
						<p>status:{todo.completed ? 'completed' : 'incomplete'}</p>
						<button type="submit">{todo.completed ? '↩️' : '✅'}</button>
					</form>
					<form
						action="?/delete"
						method="post"
						use:enhance={() => {
							loading = true;

							return async ({ update }) => {
								await update();
								loading = false;
							};
						}}
					>
						<input type="hidden" name="id" value={todo.id} id="" />
						<button type="submit">❌</button>
					</form>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.todo-item {
		display: flex;
		justify-content: space-between;
		padding: 0.5em;
		border-bottom: 1px solid #ddd;
	}
</style>
