import { createStore } from 'vuex'

const axios = require('axios');

// Configuration de l'url de base
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/auth/'
});

let user = localStorage.getItem('user');
// Si le user est vide est = à ci-dessous
if (!user) {
  user = {
    userId: -1,
    token: '',
  };
} else {
  // Sinon on le parse dans le user et on définit le headers de l'aut token
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    };
  }
}

// Créer une nouvelle instance
const store = createStore({
  // State status
  state: {
    status: '',
    user: user,
    userInfos: {
      _id: '',
      pseudo: '',
      email: '',
      // token: '',
    },
  },

  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },

    // Au moment du log on vient vérifier le tokens
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = user.token;
      // On stock le user dans le localStorage
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },

    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },

    logout: function (state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.removeItem('user');
    }
  },

  // Action Login mettre dans userInfos les infos de l'utilisateur
  actions: {
    login: ({ commit }, userInfos) => {
      // Le loading temps de chargement 
      commit('setStatus', 'loading');

      // Une promesse de façon async
      return new Promise((resolve, reject) => {
        instance.post('/login', userInfos)

          // Si c'est ok on créer
          .then(function (response) {
            // Le loading temps de chargement 
            commit('setStatus', '');
            commit('logUser', response.data);
            resolve(response);
          })
          // Sinon on reject
          .catch(function (error) {
            // Le loading temps de chargement 
            commit('setStatus', 'error_login');
            reject(error);
          });
      });
    },

    createAccount: ({ commit }, userInfos) => {
      // Le loading temps de chargement 
      commit('setStatus', 'loading');

      return new Promise((resolve, reject) => {

        commit;
        instance.post('/signup', userInfos)

          .then(function (response) {
            commit('setStatus', 'created');
            resolve(response);
          })
          .catch(function (error) {
            commit('setStatus', 'error_create');
            reject(error);
          });
      });
    },

    // Les infos du user
    getUserInfos: ({ commit }) => {
      instance.get('/')

        .then(function (response) {
          commit('userInfos', response.data);

        })
        .catch(function () {
        });
    }
  }
})

export default store;