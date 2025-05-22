<template>
	<div class="container cardContainer bg-white card mb-5 mt-5">
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
					carbohydrates, such as white rice, bread and noodles, without changing
					the taste, texture and colour of the food. In addition to lowering GI,
					just 15g of 5ibrePlus™ will provide 25% of suggested daily
					requirement.
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
					<iframe class="embed-responsive-item" src="https://youtu.be/6IUeNcjeom8"></iframe>
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
	</div>
</template>

<script>
	export default {
		name: "CardViewNetworkInfo",
	};
</script>