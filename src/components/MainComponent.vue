<template>
    <div class="main-container">
        <div v-if="!getUsersLogin" class="logIn">
            <span>
                Please log-in
            </span>
            <Login/>
        </div>
        <div v-else class="main-mail-container">
            <div class="mail-display">
                <Side class="side" @changeEmailType='setMailType' :user="getLoggedUser()"></Side>
                <div class="content">
                    <Mail class="mail" v-for="mail in getUsersMails()" @changeEmailType='updateEmailState(mail)' :key="mail.value" :mail="mail" :mode="mailType"/>
                </div>
            </div>
            <div>
                <MailEditor/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Login from './Login.vue'
import Mail from './Mail.vue'
import MailEditor from './MailEditor.vue'
import Side from './Side.vue'

export default {
    name: 'MainComponent',
    components : { Login, Mail, MailEditor, Side },
    data: function() {
        return {
            mailType : 'received'
        }
    },
    methods: {
        ...mapGetters(['getLoggedUser']),
        getUsersMails() {
            if(this.getUsersLogin){
                return this.getMails(this.mailType);
            }else{
                return [];
            }
        },
        setMailType(event) {
            this.mailType = event
        },
        updateEmailState(mail) {
            this.$store.dispatch('setEmailRead', mail);
        },
    },
    computed: {
        ...mapGetters(['getMails', 'getUsersLogin'])
    },
    watch : {
        getUsersLogin() {
            this.$store.dispatch('retrieveMails');
        }
    }
}
</script>

<style>
    .side {
        width: 15%;
        display: inline;
        height: 100%;
        float: left;
    }
    .main-mail-container {
        height : 100%;
    }
    .mail-display {
        height : 80%;
    }
    .content {
        text-align: left;
        width: 80%;
        display: inline-block;
        height: 100%;
        overflow: scroll
    }
    .logIn span, .logIn Login {
        display : block;
    }
    .mail {
        border: 1px solid black;
        margin-bottom: 5px;
    }
    html, body, .main-container {
        height : 100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height : 100%;
    }
</style>