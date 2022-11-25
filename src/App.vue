<template>
    <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, watchEffect } from "vue";
import { useAuthStore } from "./stores/authStore";
import { useDataStore } from "./stores/dataStore";

export default defineComponent({
    setup() {
        const authStore = useAuthStore();
        const dataStore = useDataStore();

        onBeforeMount(() => {
            authStore.listenToAuthChange();
        });

        watchEffect(() => {
            dataStore.listenToData(authStore.user);
        });

        return {};
    },
});
</script>

<style scoped></style>
