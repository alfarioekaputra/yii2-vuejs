<template>
	<div class="table-responsive">

		<router-link to="create" class="btn btn-primary">
			Create new user
		</router-link>

		<hr>

		<table class="table">
			<thead>
				<tr>
					<th>No.</th>
					<th>Full Name</th>
					<th>Email</th>
					<th>Created</th>
					<th class="text-right">Actions</th>
				</tr>
			</thead>

			<tbody>
				
			</tbody>
		</table>
		
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				users: []
			}
		},
		
	}
</script>