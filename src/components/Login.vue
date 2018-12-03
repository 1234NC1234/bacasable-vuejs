<template>
    <input type="text" v-model="login" @keyup.enter="logIn()"/>
</template>

<script>
    export default {
        name : 'Login',
        data() {
            return {
                login : ''
            }
        },
        methods : {
            logIn() {
                /** Test propagation via store directement **/
                this.$store.dispatch('getUser', this.login);
            }
        }
    }
</script>