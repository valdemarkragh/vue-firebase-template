# Firebase template for Vue 3

#### This repository includes a starter template for using firebase auth and firestore with vite, vue 3, pinia and typescript.

## Get started

Login on [Firebase](https://console.firebase.google.com/u/0/) and add a new project.

Follow the instructions and copy the firebase config information.

Add a .env file in the root of the cloned repository, and add the credentials in the file like so:

```
VITE_FIREBASE_API_KEY={Insert api key}
VITE_FIREBASE_AUTHDOMAIN={Insert authdomain}
VITE_FIREBASE_PROJECTID={Insert projectid}
VITE_FIREBASE_STORAGEBUCKET={Insert storagebucket}
VITE_FIREBASE_MESSAGINGSENDERID={Insert messagingsenderid}
VITE_FIREBASE=APPID={Insert appid}
```

Next, go to the firebase console and activate the **authentication module** and **cloud firestore module**

When activating the authentication module make sure to activate the google and email/password providers.

Once the modules are setup in firebase, you can open the repository in a new terminal.

Inside the terminal go ahead and write:

```
npm install
```

Once the packages are installed, you can do:

```
npm run start
```

You should now be able to login and logout with the googleprovider, and add some testdata to the firestore :)
