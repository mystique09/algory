<script lang="ts">
	import Agenda from './agenda.svelte';

	let agendas: AgendaProp[] = [
		{
			titleTop: 'Ask and answer questions',
			descriptionTop: 'Get help from the community by asking and answering questions.',
			titleBottom: 'Search for similar questions',
			descriptionBottom: 'Find answers to similar questions that have been asked before.'
		},
		{
			titleTop: 'Share knowledge and build your career',
			descriptionTop: 'Help others and improve your skills by sharing your knowledge.',
			titleBottom: 'Connect with other developers',
			descriptionBottom:
				'Join the community and connect with other developers who share your interests.'
		},
		{
			titleTop: 'Easy to use and customizable',
			descriptionTop: 'Algory is easy to use and customizable to fit your needs.',
			titleBottom: 'Available on all devices',
			descriptionBottom:
				'Algory is available on all devices, so you can access it anywhere, anytime.'
		}
	];
</script>

<main class="h-auto">
	<div class="bg-gray-50 py-16 lg:py-24">
		<div class="relative mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
			<div class="relative">
				<h3
					class="text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
				>
					Welcome to Algory
				</h3>
				<p class="mt-4 text-center text-xl leading-7 text-gray-500">
					A stackoverflow clone for programmers. Ask and answer questions, share knowledge, and
					build your career.
				</p>
			</div>
		</div>
	</div>
	<div class="relative overflow-hidden bg-white">
		<div class="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full">
			<div class="relative mx-auto h-full max-w-prose text-lg">
				<svg
					class="absolute top-12 left-full translate-x-32 transform"
					width="404"
					height="384"
					fill="none"
					viewBox="0 0 404 384"
				>
					<defs>
						<pattern
							id="f210dbf6-a58d-43cc-af7c-26321f7e5a72"
							x="0"
							y="0"
							width="20"
							height="20"
							patternUnits="userSpaceOnUse"
						>
							<rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
						</pattern>
					</defs>
					<rect width="404" height="384" fill="url(#f210dbf6-a58d-43cc-af7c-26321f7e5a72)" />
				</svg>
				<svg
					class="absolute top-1/2 right-full -translate-y-1/2 -translate-x-32 transform"
					width="404"
					height="384"
					fill="none"
					viewBox="0 0 404 384"
				>
					<defs>
						<pattern
							id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
							x="0"
							y="0"
							width="20"
							height="20"
							patternUnits="userSpaceOnUse"
						>
							<rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
						</pattern>
					</defs>
					<rect width="404" height="384" fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
				</svg>
			</div>
		</div>

		<div class="relative p-4 sm:px-6 lg:px-8">
			<div class="relative mx-auto max-w-7xl">
				<div class="text-center">
					<h2
						class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
					>
						Find answers to your questions
					</h2>
					<p class="mt-3 text-lg leading-7 text-gray-500">
						Get help from other developers who have been in your shoes. Search for similar questions
						or ask a new one.
					</p>
				</div>
				<div class="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
					{#each agendas as agenda}
						<Agenda agendaProp={agenda} />
					{/each}
				</div>
			</div>
		</div>
	</div>
</main>
