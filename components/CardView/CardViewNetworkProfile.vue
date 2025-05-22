<template>
	<div>
	
		<div
			class="container cardContainer bg-white  mb-5 mt-5 shadow"
			v-if="profileDetail"
		>
			<div class="row">
				<div class="col-md-2">
					<div class="p-3 flex-fill">
						<img
							class="rounded-circle border img-fluid"
							src="https://img.icons8.com/cotton/2x/gender-neutral-user--v2.png"
						/>
					</div>
				</div>
				<div class="col-md-6">
					<div class="p-3 flex-fill">
						<h2 class="block-title mb-2">{{ profileDetail.user.first_name }} {{ profileDetail.user.last_name }}</h2>
						<span>{{ profileDetail.description }}</span>
					</div>
				</div>
				<div class="col-md-4">
					<div class="p-3 flex-fill">
						<p class="mb-2">
							<v-icon>mdi-map-marker</v-icon>
							<span
								>{{ profileDetail.address }}</span
							>
						</p>
						<p class="mb-2">
							<v-icon>mdi-web</v-icon>
							<span>{{ profileDetail.website }}</span>
						</p>
						<p v-if="profileDetail.email" class="mb-2">
							<v-icon>mdi-email-outline</v-icon>
							<span >
								<a href="mailto:raksa.delivery@gmai.com">
									{{ profileDetail.email }}</a
								></span
							>
						</p>
						<p v-else class="mb-2">
							<v-icon>mdi-email-outline</v-icon>
							<span >
								N/A</span
							>
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="container cardContainer bg-white shadow mb-5 mt-5">
			<div class="row p-3 flex-fill">
				<div class="col-md-2">
					<label for="">Date Founded:</label>
				</div>
				<div class="col-md-10">25 December 2019</div>
			</div>
			<div class="row p-3 flex-fill">
				<div class="col-md-2">
					<label for="">Sector</label>
				</div>
				<div class="col-md-10">
					<button class="btn btn-outline-dark" disabled>Food delivery</button>
					<button class="btn btn-outline-dark" disabled>Fintech</button>
				</div>
			</div>
			<div class="row p-3 flex-fill">
				<div class="col-md-2">
					<label for="">Funding stage:</label>
				</div>
				<div class="col-md-10">Seeding</div>
			</div>
			<div class="row p-3 flex-fill">
				<div class="col-md-2">
					<label for="">Employee size:</label>
				</div>
				<div class="col-md-10">1-20 employees</div>
			</div>
			<div class="row p-3 flex-fill">
				<div class="col-md-2">
					<label for="">Description:</label>
				</div>
				<div class="col-md-10">
					<p>
						Our patent pending glycemic lowering technology, 5ibrePlus™, is
						designed to lower the GI of traditionally high GI refined
						carbohydrates, such as white rice, bread and noodles, without
						changing the taste, texture and colour of the food. In addition to
						lowering GI, just 15g of 5ibrePlus™ will provide 25% of suggested
						daily requirement.
					</p>
				</div>
			</div>
			<div class="row p-3 flex-fill">
				<div class="col-md-2">
					<label for="">Video:</label>
				</div>
				<div class="col-md-10">
					<!-- 16:9 aspect ratio -->
					<div class="embed-responsive embed-responsive-16by9">
						<iframe
							class="embed-responsive-item"
							src="https://youtu.be/6IUeNcjeom8"
						></iframe>
					</div>
				</div>
			</div>
			<div class="row p-3 flex-fill">
				<div class="col-md-2">
					<label for="">Members:</label>
				</div>
				<div class="col-md-10">
					<img
						class="rounded-circle border img-fluid"
						src="https://img.icons8.com/cotton/2x/gender-neutral-user--v2.png"
						width="50"
						height="50"
					/>
				</div>
			</div>
			<div class="row p-3 flex-fill">
				<div class="col-md-2">
					<label for="">Funding overview:</label>
				</div>
				<div class="col-md-10">
					<table class="table">
						<thead>
							<tr>
								<th scope="col">Funding stage</th>
								<th scope="col">Amount</th>
								<th scope="col">Funding Rounds</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row">Seeding</th>
								<td>USD 1.5M</td>
								<td>1</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="row p-3 flex-fill" >
				<div class="col-md-2">
					<label for="">Interested In</label>
				</div>
				<div class="col-md-10">
					<button
						class="btn btn-outline-dark ml-2 mb-2 text-dark"
						disabled
						v-for="item in profileDetail.area_of_interests"
						:key="item.id"
					>
						{{ item.desc }}
					</button>
				</div>
			</div>
			<div class="row p-3 flex-fill">
				<div class="col-md-2">
					<label for="">Connections</label>
				</div>
				<div class="col-md-10">
					<div v-if="profileDetail.connections"></div>
					<p v-else>N/A</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "CardViewNetworkProfile",
		props: ["profileDetail"],
	};
</script>