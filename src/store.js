import Vue from 'vue'
import Vuex from 'vuex'
import firebase from './firebase'
import uuidv4 from 'uuid/v4';
import moment from 'moment';

Vue.use(Vuex)
Vue.use(firebase)
Vue.use(uuidv4)
Vue.use(moment)


/**
TAKE A LOOK TO MODEL_FIREBASE.PNG
**/

export default new Vuex.Store({
    state: {
        originalMails : [],
        mails : { sent : [], received : [] },
        user: {login : '', name : '', url : ''}
    },
    mutations: {
        processMails : (state, mailSnapshot) => {
            state.mails.sent = [];
            state.mails.received = [];
            state.originalMails = [];

            mailSnapshot.forEach(x => {
                const entry = x.val();
                state.originalMails.push(Object.assign({},entry));
                if (entry.from === state.user.login) {
                    state.mails.sent.push(entry);
                } else {
                    state.mails.received.push(entry);
                }
            });

            const sortByDate = (mail1, mail2) => mail2.date - mail1.date;
            const toMoment = (x) => {
                x.date = moment(x.date).fromNow();
                return x;
            };

            state.mails.sent.sort(sortByDate).map(toMoment);
            state.mails.received.sort(sortByDate).map(toMoment);
        },
        logIn : (state, userSnapshot) => {
            const user = userSnapshot.val();
            state.user = {login : user.login, name : user.name, url : user.url};
        }
    },
    getters: {
        getOriginalMails : (state) => state.originalMails,
        getMails: (state)  => (type) => state.mails[type],
        getLoggedUser : (state) => state.user,
        getUsersLogin : (state) => state.user.login,
    },
    actions: {
        retrieveMails ({ state, commit }) {
            const loggedUser = state.user.login;
            firebase.database.ref('mails/' + loggedUser).on("value", function(snapshot) {
                commit('processMails', snapshot)
            });
        },
        sendMail({ state }, mail) {
            const uuidFrom = uuidv4();
            const uuidTo = uuidv4();
            mail.from = state.user.login;
            mail.date = new Date().getTime();

            firebase.database.ref('mails/'+ mail.from + '/' + uuidFrom).set(Object.assign({isRead: true, key : uuidFrom}, mail));
            firebase.database.ref('mails/'+ mail.to + '/' + uuidTo).set(Object.assign({isRead: false, key : uuidTo}, mail));
        },
        getUser({ commit }, login) {
            firebase.database.ref('users/' + login).once("value").then(function(snapshot) {
                commit('logIn', snapshot)
            });
        },
        setEmailRead({state}, mail) {
            const mailToUpdate = state.originalMails.find(x => x.key == mail.key);
            mailToUpdate.isRead = true;

            firebase.database.ref('mails/' + state.user.login + '/'+ mail.key).update(mailToUpdate);
        }
    }
})
