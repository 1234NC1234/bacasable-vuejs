<template>
    <div>
        <div>
            <img :src="user.url" alt="MDN">
        </div>
        <div>{{user.name}}</div>
        <a @click="$emit('changeEmailType','received')">inbox</a>
        <a @click="$emit('changeEmailType','sent')">sent</a>
    </div>
</template>

<script>
export default {
    name: 'Side',
    data: function() {
        return {
        }
    },
    props: [
        'user',
    ]
}
</script>

<style>
a {
    border: 1px solid #ccc!important;
    width: 100%;
    display: block;
    text-align : center;
}
img {
    border-radius: 50%;
    width: 70px;
    display:block;
    margin: 0 auto;
}
.userName {
    text-align : center;
}
</style>