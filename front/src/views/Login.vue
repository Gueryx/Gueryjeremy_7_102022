<template>
    <div class="card">

        <div class="card__logo">
            <img src="../../public/images/icon-left-font-monochrome-black.png" alt="logo entreprise">
        </div>
        <!-- En mode Login -->
        <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>

        <!-- En mode Inscription -->
        <h1 class="card__title" v-else>Inscription</h1>

        <!-- Au click on vient switch sur Signup -->
        <p class="card__subtitle" v-if="mode == 'login'">Tu n'as pas encore de compte ? <span class="card__action"
                @click="switchToCreateAccount()">Créer un compte</span></p>

        <!-- Au click on vient switch sur Login -->
        <p class="card__subtitle" v-else>Tu as déjà un compte ? <span class="card__action" @click="switchToLogin()">Se
                connecter</span></p>

        <div class="form-row" v-if="mode == 'create'">
            <input v-model="pseudo" class="form-row__input" type="text" placeholder="Pseudo" />
        </div>
        <div class="form-row">
            <input v-model="email" class="form-row__input" type="text" placeholder="Adresse mail" />
        </div>
        <div class="form-row">
            <input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe" />
        </div>

        <!-- En mode login et que le status n'est pas bon, erreur -->
        <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
            Adresse mail et/ou mot de passe invalide
        </div>

        <!-- En mode create et que le status n'est pas bon, = erreur -->
        <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
            Adresse mail déjà utilisée
        </div>
        <div class="form-row">

            <!-- Si le champ est vide alors message d'erreur -->
            <button @click="login()" class="button" :class="{'button--disabled' : !validatedFields}"
                v-if="mode == 'login'">
                <!-- Au changement de status Loader-->
                <span v-if="status == 'loading'">Connexion en cours...</span>
                <span v-else>Connexion</span>
            </button>

            <!-- Si le champ est vide alors message d'erreur -->
            <button @click="createAccount()" class="button" :class="{'button--disabled' : !validatedFields}" v-else>
                <!-- Si on est entrain de charger -->
                <span v-if="status == 'loading'">Création en cours...</span>
                <span v-else>Créer mon compte</span>
            </button>

        </div>
    </div>
</template>
  
<script>

import { mapState } from 'vuex'

export default {
    name: 'Login',
    // déclaration des datas
    data: function () {
        //  En mode login
        return {
            mode: 'login',
            email: '',
            password: '',
            pseudo: '',
        }
    },
    mounted: function () {
        if (this.$store.state.user.userId != -1) {
            this.$router.push('/home');
            return;
        }
    },

    computed: {
        // Champs validés
        validatedFields: function () {
            // Si notre mode est 'create' il faut que
            if (this.mode == 'create') {
                if (this.email != "" && this.pseudo != "" && this.password != "") {
                    return true;
                } else {
                    return false;
                }
            } else {
                // Sinon en mode de départ 'Login'
                if (this.email != "" && this.password != "") {
                    return true;
                } else {
                    return false;
                }
            }
        },
        // Récup du state status
        ...mapState(['status'])
    },

    methods: {
        // Les méthodes pour switch entre les mode, login/create
        switchToCreateAccount: function () {
            this.mode = 'create';
        },

        switchToLogin: function () {
            this.mode = 'login';
        },

        // Si il se log est que ça fonctionne, redirection vers la page /home
        login: function () {
            const self = this;
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password,
            }).then(function () {
                self.$router.push('/home');
            }, function (error) {
                console.log(error);
            })
        },

        createAccount: function () {
            const self = this;
            this.$store.dispatch('createAccount', {
                pseudo: this.pseudo,
                email: this.email,
                password: this.password,
            }).then(function () {
                // ça nous log automatiquement
                self.login();
            }, function (error) {
                console.log(error);
            })
        },
    }
}
</script>
  
<style scoped>
.form-row {
    display: flex;
    margin: 16px 0px;
    gap: 16px;
    flex-wrap: wrap;
}

.form-row__input {
    padding: 8px;
    border: none;
    border-radius: 8px;
    background: #f2f2f2;
    font-weight: 500;
    font-size: 16px;
    flex: 1;
    min-width: 100px;
    color: black;
}

.form-row__input::placeholder {
    color: #aaaaaa;
}
</style>>