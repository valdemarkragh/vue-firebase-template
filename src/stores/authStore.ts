import { defineStore } from "pinia";
import router from "../router";
import { auth } from "../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

const getUserFromStorage = () => {
    if (
        Object.keys(window.localStorage).filter((item) =>
            item.startsWith("firebase:authUser")
        )[0] !== null
    ) {
        return JSON.parse(
            localStorage.getItem(
                Object.keys(window.localStorage).filter((item) =>
                    item.startsWith("firebase:authUser")
                )[0]
            ) as string
        );
    }

    return null;
};

export const useAuthStore = defineStore("authStore", {
    state: () => ({
        user: getUserFromStorage(),
        error: null,
        loading: true,
    }),
    actions: {
        async login({ email, password }: { email: string; password: string }) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (error: any) {
                this.error = error.message;
                return;
            }

            this.user = auth.currentUser;
            this.error = null;
        },
        async loginWithGoogle(callbackUrl: string = "/") {
            const googleProvider = new GoogleAuthProvider();
            await signInWithPopup(auth, googleProvider);
            router.push(callbackUrl);
        },
        async logout() {
            await signOut(auth);
            this.user = null;
        },
        async register({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
            } catch (error: any) {
                this.error = error.message;
                return;
            }

            this.user = auth.currentUser;
            this.error = null;
        },
        async listenToAuthChange() {
            auth.onAuthStateChanged(async (user: any) => {
                if (user === null) {
                    this.user = null;
                    router.push("/login");
                } else {
                    this.user = user;
                }

                this.loading = false;
            });
        },
    },
});
