<template>
	<div class="main-content flex h-full grow flex-col gap-5 md:flex-row md:gap-0">
		<div class="img-container w-full md:grow md:basis-1/2 lg:basis-3/5">
			<img src="/img/ai-generated-car.png" alt="" class="h-full w-full object-cover" />
		</div>
		<slot />
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
