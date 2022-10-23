<script lang="ts">
	import { page } from '$app/stores';
</script>

{#if $page.data.session.user}
	<div>
		<h1>{$page.data.session.user.email}</h1>
		<p>TODO!: Show latest posts</p>
	</div>
{:else}
	<div class="hero min-h-screen bg-base-120">
		<div class="hero-content">
			<div class="max-w-lg">
				<h1 class="text-5xl font-bold text-primary">Algory</h1>
				<p class="py-6 text-lg font-light">
					Looking for a community to ask for help? You are in the right path! <span
						class="text-lg font-semibold text-primary">Algory</span
					> is like stackoverflow where you can ask for tech-related questions, answer questions, upvote
					questions/answers everytime.
				</p>
				<a
					href="/sign-up"
					class="signup btn btn-md rounded-full text-primary bg-white hover:bg-primary hover:text-white border-none ring ring-primary"
					>Ready? Click to Join!</a
				>
				<div class="py-8 flex flex-col-reverse max-w-md items-start">
					<span class="text-xs font-semibold">Repository</span>
					<a href="https://github.com/mystique09/algory">
						<img class="h-12 w-12" src="/images/github.svg" alt="Github icon" />
					</a>
				</div>
			</div>
		</div>
	</div>
{/if}

<svelte:head>
	<title>Algory</title>
	<meta
		name="description"
		content="Algory, where you can ask for questions, and also help others."
	/>
</svelte:head>
