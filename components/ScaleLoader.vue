<template>
	<div v-show="loading" class="v-spinner">
		<div class="v-scale v-scale1" :style="[spinnerStyle, spinnerDelay1]"></div>
		<div class="v-scale v-scale2" :style="[spinnerStyle, spinnerDelay2]"></div>
		<div class="v-scale v-scale3" :style="[spinnerStyle, spinnerDelay3]"></div>
		<div class="v-scale v-scale4" :style="[spinnerStyle, spinnerDelay4]"></div>
		<div class="v-scale v-scale5" :style="[spinnerStyle, spinnerDelay5]"></div>
	</div>
</template>

<script setup lang="ts">
const loading = ref(true);
const color = ref("#fff");
const height = ref("35px");
const width = ref("4px");
const margin = ref("2px");
const radius = ref("2px");

const spinnerStyle = computed(() => {
	return {
		backgroundColor: color.value,
		height: height.value,
		width: width.value,
		margin: margin.value,
		borderRadius: radius.value,
		display: "inline-block",
		animationName: "v-scaleStretchDelay",
		animationDuration: "1s",
		animationIterationCount: "infinite",
		animationTimingFunction: "cubic-bezier(.2,.68,.18,1.08)",
		animationFillMode: "both",
	};
});

const spinnerDelay1 = { animationDelay: "0.1s" };
const spinnerDelay2 = { animationDelay: "0.2s" };
const spinnerDelay3 = { animationDelay: "0.3s" };
const spinnerDelay4 = { animationDelay: "0.4s" };
const spinnerDelay5 = { animationDelay: "0.5s" };
</script>

<style>
.v-spinner {
	text-align: center;
}

@-webkit-keyframes v-scaleStretchDelay {
	0% {
		-webkit-animation-name: inherit;
		-webkit-animation-duration: inherit;
		-webkit-animation-iteration-count: inherit;
		-webkit-animation-direction: inherit;
	}

	100% {
		-webkit-transform: scaleY(1);
		transform: scaleY(1);
	}

	50% {
		-webkit-transform: scaleY(0.4);
		transform: scaleY(0.4);
	}
}

@keyframes v-scaleStretchDelay {
	0% {
		-webkit-animation-name: inherit;
		-webkit-animation-duration: inherit;
		-webkit-animation-iteration-count: inherit;
		-webkit-animation-direction: inherit;
	}

	100% {
		-webkit-transform: scaleY(1);
		transform: scaleY(1);
	}

	50% {
		-webkit-transform: scaleY(0.4);
		transform: scaleY(0.4);
	}
}
</style>
