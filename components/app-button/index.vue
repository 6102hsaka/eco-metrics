<template>
    <button
        class="px-5 py-2 border-2 rounded-xl hover:opacity-90"
        :class="
            outlined
                ? ' border-green-700 text-green-700'
                : ' bg-green-700 text-slate-50'
        "
    >
        {{ label }}
    </button>
</template>

<script setup lang="ts">
interface Props {
    label: string;
    outlined?: boolean;
}
const props = defineProps<Props>();
</script>
