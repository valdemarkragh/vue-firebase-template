<template>
    <div>Hello from Home</div>
    <button @click="authStore.logout()">Logout</button>
    <h2>Add some data..</h2>
    <input type="text" v-model="title" />
    <button @click="dataStore.addData(title)">Add data</button>
    <div v-if="!dataStore.loading && dataStore.data.length > 0">
        <div v-for="data in dataStore.data" :key="data.title">
            <p>{{ data.title }}</p>
            <button @click="dataStore.removeData(data.docId)">Delete</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useAuthStore } from "../../stores/authStore";
import { useDataStore } from "../../stores/dataStore";

export default defineComponent({
    setup() {
        const authStore = useAuthStore();
        const dataStore = useDataStore();
        const title = ref<string>("");

        return { authStore, dataStore, title };
    },
});
</script>

<style scoped></style>
