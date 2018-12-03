<template>
    <div :class="{ toRead: !mail.isRead }">
        <div class="headers" v-on:click='click()'>
            <div>
                {{getReceivedSent}}
            </div>
        </div>
        <div v-if="isClicked" class="content">
            {{mail.content}}
        </div>
    </div>
</template>

<script>
    export default {
      name: 'Mail',
      data: function() {
        return {
            isClicked : false
        }
      },
      props: [
        'mail',
        'mode'
      ],
      methods: {
        click() {
            this.isClicked = !this.isClicked;
            if(this.mode === 'received' && !this.isRead){
                /** Test propagation via event **/
                this.$emit('changeEmailType')
            }
        }
      },
      computed: {
        isSent() {
            return this.mode === 'sent'
        },
        getReceivedSent() {
            const receivedFrom = this.mail.mode === 'sent' ? `Sent to ${this.mail.to}` : `Received from ${this.mail.from}`;
            return `${receivedFrom} ${this.mail.date} : ${this.mail.title}`;
        }
      },
    }

</script>

<style>
.headers > div {
    display:inline;
}

.toRead {
    background-color : green;
}

</style>
