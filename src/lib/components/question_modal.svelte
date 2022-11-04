<script lang="ts">
	import { languages } from '$lib/utils/helpers';
	import { onDestroy } from 'svelte';
	import WarningIcon from './icons/warning_icon.svelte';

	$: langs = languages;
	onDestroy(() => {
		langs = [];
	});
</script>

<input type="checkbox" id="question_modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<form method="POST" action="/questions?/newQuestion">
			<div class="modal-box w-full h-full">
				<h2 class="text-lg text-center">Ask a new question</h2>
				<div class="alert alert-warning flex flex-row items-center">
					<WarningIcon />
					<div>
						<span class="text-xs">Warning: Make sure to input all required fields!</span>
					</div>
				</div>
				<div class="form-control">
					<label for="title" class="label">
						<span class="label-text text-xs">Title <span class="text-red-600 text-xs">*</span></span
						>
					</label>
					<input
						name="title"
						id="title"
						type="text"
						required
						placeholder="How to...(atleast 6 characters)"
						class="input text-xs input-bordered"
					/>
				</div>
				<div class="form-control">
					<label for="tags" class="label">
						<span class="label-text text-xs">Tag <span class="text-red-600 text-xs">*</span></span>
					</label>
					<select
						id="tags"
						name="tags"
						max={4}
						multiple
						class="select select-bordered w-full max-w-xs"
					>
						<option disabled selected>Select tag</option>
						{#each langs as programmingLanguage}
							<option>{programmingLanguage}</option>
						{/each}
					</select>
				</div>
				<div class="form-control">
					<label for="content" class="label">
						<span class="label-text text-xs"
							>Content <span class="text-red-600 text-xs">*</span></span
						>
					</label>
					<textarea
						name="content"
						id="content"
						type="text"
						required
						placeholder="I encountered this problem...(atleast 6 characters)"
						class="textarea textarea-bordered text-xs h-18"
					/>
				</div>
			</div>
			<div class="modal-action flex items-center justify-evenly gap-3">
				<label for="question_modal" class="btn btn-outline btn-error px-8 md:px-12">Cancel</label>
				<button class="btn btn-accent px-8 md:px-12">Submit</button>
			</div>
		</form>
	</div>
</div>
