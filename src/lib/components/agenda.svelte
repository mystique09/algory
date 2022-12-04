<script lang="ts">
	export let agendaProp: AgendaProp;
</script>

<div class="flex flex-col overflow-hidden rounded-lg shadow-lg">
	<div class="px-4 py-5 sm:p-6">
		<dl>
			<dt class="text-base font-normal leading-6 text-gray-900">{agendaProp.titleTop}</dt>
			<dd class="mt-2">
				<p class="text-base leading-6 text-gray-500">
					{agendaProp.descriptionTop}
				</p>
			</dd>
		</dl>
	</div>
	<div class="bg-gray-50 px-4 py-5 sm:p-6">
		<dl>
			<dt class="text-base font-normal leading-6 text-gray-900">{agendaProp.titleBottom}</dt>
			<dd class="mt-2">
				<p class="text-base leading-6 text-gray-500">
					{agendaProp.descriptionBottom}
				</p>
			</dd>
		</dl>
	</div>
</div>
