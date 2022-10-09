<template>
    <div class="card">
        <h1 class="card__title">Espace Perso</h1>
        <p class="card__subtitle">Voilà donc qui je suis...</p>
        <p>{{user}} {{user.email}}</p>
        <div class="form-row">
            <button @click="logout()" class="button">
                Déconnexion
            </button>
        </div>
    </div>
</template>
  
<script>

// Pour mapper 
import { mapState } from 'vuex'

// Appel API pour récuperer les infos user
export default {
    name: 'Home',
    mounted: function () {
        // Si userId -1 on retourne sur '/' pour se loger 
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/');
            return;
        }
        // Sinon on récupère les infos du user via index.js -> getUserInfos
        this.$store.dispatch('getUserInfos');
    },
    // Le mappage
    computed: {
        ...mapState({
            user: 'userInfos',
        })
    },
    methods: {
        logout: function () {
            this.$store.commit('logout');
            this.$router.push('/');
        }
    }
}
</script>
  
<style scoped>

</style>>
  