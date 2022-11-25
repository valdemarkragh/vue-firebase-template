<template>
    <div>
        <h1>Login page</h1>
        <button @click="authStore.loginWithGoogle()">Login with google</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuthStore } from "../../stores/authStore";

export default defineComponent({
    setup() {
        const authStore = useAuthStore();

        return {
            authStore,
        };
    },
});
</script>

<style scoped></style>
