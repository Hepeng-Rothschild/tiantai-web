<template>
    <div></div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    mounted(){
        
        this.$Parse.User.become(this.$route.query.token).then(v =>{
            this.$router.push({path: this.$route.query.path})
        })
    }
}
</script>