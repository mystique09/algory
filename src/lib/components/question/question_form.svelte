<script lang="ts">
	export let authenticated: boolean;
</script>

<div class="form w-full mt-8">
	<form class="w-full" method="POST" action="?/newComment">
		<div class="form-control">
			<label class="text-label" for="answer">Your answer</label>
			<textarea
				disabled={!authenticated}
				id="answer"
				name="answer"
				class="textarea textarea-bordered textarea-neutral h-48 w-full max-w-lg resize-none"
				placeholder={`${!authenticated ? 'Sign in to answer' : 'Yada yada...'}`}
			/>
		</div>
		{#if authenticated}
			<div class="w-full">
				<button id="submit" class="mt-4 btn btn-primary btn-wide normal-case">Submit answer</button>
			</div>
		{/if}
	</form>
</div>
