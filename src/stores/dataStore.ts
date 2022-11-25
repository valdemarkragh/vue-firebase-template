import { useAuthStore } from "./authStore";
import { defineStore } from "pinia";
import { db } from "../firebase";
import {
    collection,
    doc,
    setDoc,
    query,
    where,
    onSnapshot,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";

const dataStoreRef = collection(db, "dataStore");

interface IData {
    userId: string;
    title: string;
}

export const useDataStore = defineStore("dataStore", {
    state: () => ({
        data: [] as IData[],
        error: null,
        loading: true,
        listeningToData: false,
    }),
    actions: {
        async addData(title: string) {
            const authStore = useAuthStore();

            await setDoc(doc(dataStoreRef), {
                userId: authStore.user.uid,
                title,
            });
        },
        async removeData(docId: string) {
            await deleteDoc(doc(db, "dataStore", docId));
        },
        async updateData(docId: string, title: string) {
            await updateDoc(doc(db, "dataStore", docId), {
                title,
            });
        },
        async listenToData() {
            const authStore = useAuthStore();

            const listQuery = query(
                dataStoreRef,
                where("userId", "==", authStore.user.uid)
            );

            onSnapshot(listQuery, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc);
                });
                // querySnapshot.forEach((doc) => {
                //     const { title, todos } = doc.data() as IData[];
                //     this.lists.push({
                //         docId: doc.id,
                //         title,
                //         todos,
                //         activeTodos: todos.filter((todo) => !todo.completed)
                //             .length,
                //     });
                // });

                // if (!this.currList) return;

                // this.currList = this.lists.find(
                //     (list) => list.docId == this.currList.docId
                // ) as TodoListType;
            });

            this.listeningToData = true;
            this.loading = false;
        },
    },
});
