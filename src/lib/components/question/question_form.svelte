<script lang="ts">
	import SendIcon from '../icons/send_icon.svelte';

	export let authenticated: boolean;
</script>

<div class="form mt-8 mb-24">
	<form method="POST" action="?/newComment">
		<div class="form-control max-w-xl">
			<label class="text-label" for="answer">Your answer</label>
			<div class="relative">
				<textarea
					disabled={!authenticated}
					id="answer"
					name="answer"
					class="textarea textarea-primary bg-white/60 h-48 w-full resize-none"
					placeholder={`${!authenticated ? 'Sign in to answer' : 'Yada yada...'}`}
				/>
				{#if authenticated}
					<div class="absolute bottom-2 right-2">
						<button id="submit" class="btn btn-sm btn-ghost">
							<SendIcon className="w-6 h-6 stroke-primary" />
						</button>
					</div>
				{/if}
			</div>
		</div>
	</form>
</div>
