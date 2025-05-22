<template>
	<div>
		<div class="card mb-3 inbox-card" v-for="item in inboxes" :key="item.message.title + Math.random()">
			<div class="row no-gutters p-2">
				  <div class="col-md-3 text-center" >
                        <img src="https://img.icons8.com/cotton/2x/gender-neutral-user--v2.png" width="130" height="130" class="rounded-circle border img-fluid">
                        <h5>{{item.sender.name}}</h5>
                      
                    </div>    
				<div class="col-md-7">
					<div class="card-body">
						<h5 class="card-title">{{item.message.title}}</h5>
						<p class="card-text">
						{{item.message.content}}
						</p>
						
					</div>
				</div>
                <div class="col-md-2">
<p class="card-text">
							<small class="text-muted">{{item.message.date}}</small>
						</p>
                </div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "InvestorInbox",
		data() {
			return {
				inboxes: [
					{
						sender: { name: "Dara sok", profileUrl: "" },
						message: {
							title: "Hello",
							content: "lorem ipsum",
							date: "30 April,2021",
							read: false,
						},
					},
					{
						sender: { name: "Dara sok", profileUrl: "" },
						message: {
							title: "Hello",
							content: "lorem ipsum",
							date: "30 April,2021",
							read: false,
						},
					},
					{
						sender: { name: "Dara sok", profileUrl: "" },
						message: {
							title: "Hello",
							content: "lorem ipsum",
							date: "30 April,2021",
							read: false,
						},
					},
				],
			};
		},
	};
</script>
<style scoped>
   
</style>