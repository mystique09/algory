<input type="checkbox" id="question_modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<form method="POST" action="/questions?/newQuestion">
			<div class="modal-box w-full">
				<h2 class="text-lg text-center">Ask a new question</h2>
				<p class="text-xs text-center alert alert-warning text-gray-700">
					Make sure to input all required fields!
				</p>
				<div class="form-control">
					<label for="title" class="label">
						<span class="label-text">Title <span class="text-red-600 text-xs">*</span></span>
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
						<span class="label-text">Tags <span class="text-red-600 text-xs">*</span></span>
					</label>
					<input
						name="tags"
						id="tags"
						type="text"
						required
						placeholder="go, rust, ...(4 tags max)"
						class="input text-xs input-bordered"
					/>
				</div>
				<div class="form-control">
					<label for="description" class="label">
						<span class="label-text">Description <span class="text-red-600 text-xs">*</span></span>
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
				<label
					for="question_modal"
					class="btn px-8 md:px-12 btn-ghost ring-1 ring-red-600 text-xs text-red-600">Cancel</label
				>
				<button class="btn btn-ghost bg-primary text-white text-xs px-8 md:px-12">Submit</button>
			</div>
		</form>
	</div>
</div>
