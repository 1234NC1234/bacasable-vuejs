<template>
    <div class="mail-editor-container">
        <div class="header">
            <input type="text" v-model="to" placeholder="to"/>
            <input type="text" v-model="title" placeholder="title"/>
        </div>
        <div>
            <textarea v-model="content" placeholder="content"/>
        </div>
        <div>
            <button @click="sendMail">Send Mail</button>
        </div>
    </div>
</template>

<script>
    export default {
        name : "MailEditor",
        data : function() {
            return {
                to : '',
                title : '',
                content : ''
            }
        },
        methods : {
            sendMail() {
                const mail = { "to" : this.to, "title" : this.title, "content" : this.content }
                this.$store.dispatch('sendMail', mail);
                this.to = '';
                this.title = '';
                this.content = '';
            }
        }
    }
</script>

<style>
    .header {
        width : 100%;
        display : block;
    }

    .header input {
        display : block;
        width : 100%;
    }

    .mail-editor-container {
        height : 100%;
    }

    textarea {
        width : 100%;
    }
</style>