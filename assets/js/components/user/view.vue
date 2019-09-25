<template>
	<div class="row">

		<div v-if="notFound" class="col-md-12">
			<div  class="alert alert-warning">
				{{ message }}
			</div>			
		</div>

        
    </div>
</template>

<script>
	export default {
		data() {
			return {
				notFound: false,
				message: 'message',
				user: []
			}
		},
		
	}
</script>

<style type="text/css" scoped>
body{
	padding-top:30px;
}
.glyphicon {  margin-bottom: 10px;margin-right: 10px;}
small {
	display: block;
	line-height: 1.428571429;
	color: #999;
}
</style>