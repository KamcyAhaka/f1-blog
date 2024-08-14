<template>
  <div
    v-if="loading"
    class="relative animate-spin box-content"
    :style="wrapperStyle"
  >
    <div
      class="absolute rounded-full opacity-80 box-content"
      :style="moonStyle"
    ></div>
    <div
      class="rounded-full opacity-10 border-solid box-content"
      :style="ringStyle"
    ></div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { computed } from 'vue';

interface Props {
  loading: boolean;
  color: string;
  size: number;
  sizeUnit: string;
}

const props = defineProps<Props>();

const moonSize = (size: number) => (size / 7).toFixed(5);

const wrapperStyle = computed(() => ({
  width: `${props.size + parseFloat(moonSize(props.size)) * 2}${props.sizeUnit}`,
  height: `${props.size + parseFloat(moonSize(props.size)) * 2}${props.sizeUnit}`,
}));

const moonStyle = computed(() => ({
  top: `${props.size / 2 - parseFloat(moonSize(props.size)) / 2}${props.sizeUnit}`,
  backgroundColor: props.color,
  width: `${moonSize(props.size)}${props.sizeUnit}`,
  height: `${moonSize(props.size)}${props.sizeUnit}`,
}));

const ringStyle = computed(() => ({
  borderWidth: `${moonSize(props.size)}${props.sizeUnit}`,
  borderColor: props.color,
  width: `${props.size}${props.sizeUnit}`,
  height: `${props.size}${props.sizeUnit}`,
}));
</script>

<style scoped>
@keyframes moon {
  100% {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: moon 0.6s linear infinite;
}
</style>
