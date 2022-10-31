<input type="checkbox" id="question_modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<form method="POST" action="/questions?/newQuestion">
			<h2>Ask a new question</h2>
			<p>Make sure to input all required fields!</p>
			<div class="modal-action flex flex-col items-center gap-3">
				<label
					for="question_modal"
					class="btn btn-wide btn-ghost ring-2 ring-red-600 text-xs text-red-600">Cancel</label
				>
				<button class="btn btn-wide bg-primary text-xs">Submit</button>
			</div>
		</form>
	</div>
</div>
