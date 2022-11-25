<template>
    <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import { useAuthStore } from "./stores/authStore";

export default defineComponent({
    setup() {
        const authStore = useAuthStore();

        onBeforeMount(() => {
            authStore.listenToAuthChange();
        });

        return {};
    },
});
</script>

<style scoped></style>
