<template>
    <div>Hello from Home</div>
    <button @click="authStore.logout()">Logout</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuthStore } from "../../stores/authStore";

export default defineComponent({
    setup() {
        const authStore = useAuthStore();

        return { authStore };
    },
});
</script>

<style scoped></style>
