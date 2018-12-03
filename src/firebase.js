import {initializeApp, database} from 'firebase'

var config = {
    apiKey: "XXXXXXXXXX",
    authDomain: "prez-vue.firebaseapp.com",
    databaseURL: "https://prez-vue.firebaseio.com",
    projectId: "prez-vue",
    storageBucket: "prez-vue.appspot.com",
    messagingSenderId: "249639062931"
  };
initializeApp(config)
export default {
    database : database()
}