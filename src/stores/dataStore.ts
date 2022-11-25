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
import { Unsubscribe } from "firebase/auth";

const dataStoreRef = collection(db, "dataStore");

interface IData {
    docId: string;
    title: string;
}

interface IState {
    data: IData[];
    loading: boolean;
    unSubscriber: Unsubscribe | null;
}

export const useDataStore = defineStore("dataStore", {
    state: () =>
        ({
            data: [] as IData[],
            loading: false,
            unSubscriber: null,
        } as IState),
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
        async listenToData(user: any) {
            if (!user && this.unSubscriber != null) {
                this.unSubscriber();
            }

            if (!user) return;

            this.loading = true;

            const listQuery = query(
                dataStoreRef,
                where("userId", "==", user.uid)
            );

            this.unSubscriber = onSnapshot(listQuery, (querySnapshot) => {
                this.data = [];

                querySnapshot.forEach((doc) => {
                    const { title } = doc.data() as IData;
                    this.data.push({ title, docId: doc.id });
                });
            });

            this.loading = false;
        },
    },
});
