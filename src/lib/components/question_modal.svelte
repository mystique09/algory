<script>
	import WarningIcon from './warning_icon.svelte';
</script>

<input type="checkbox" id="question_modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<form method="POST" action="/questions?/newQuestion">
			<div class="modal-box w-full h-full">
				<h2 class="text-lg text-center">Ask a new question</h2>
				<p class="text-2xs alert alert-warning">
					<WarningIcon />
					Warning: Make sure to input all required fields!
				</p>
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
						placeholder="How to..."
						class="input text-xs input-bordered"
					/>
				</div>
				<div class="form-control">
					<label for="tags" class="label">
						<span class="label-text text-xs">Tags <span class="text-red-600 text-xs">*</span></span>
					</label>
					<input
						name="tags"
						id="tags"
						type="text"
						required
						placeholder="go, rust, python,...(4 tags max)"
						class="input text-xs input-bordered"
					/>
				</div>
				<div class="form-control">
					<label for="description" class="label">
						<span class="label-text text-xs"
							>Description <span class="text-red-600 text-xs">*</span></span
						>
					</label>
					<textarea
						name="description"
						id="description"
						type="text"
						required
						placeholder="I encountered this problem..."
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
