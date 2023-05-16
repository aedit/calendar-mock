import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [
      {
        name: 'Random Event fdsjfdsnjfnds dsfjndsjk',
        type: 'STANDARD', // ALL/STANDARD
        startTime: moment().subtract(3, 'hours'),
        endTime: moment().subtract(120, 'minutes'),
      },
      {
        name: 'Random Event fjndjgnfdgjdfsnjkf',
        type: 'STANDARD', // ALL/STANDARD
        startTime: moment().add(1, 'day').subtract(3, 'hours'),
        endTime: moment().add(1, 'day').subtract(2, 'hours'),
      },
      {
        name: 'Random Event 3 dfdsknafaksdn',
        type: 'ALL', // ALL/STANDARD
        startTime: moment().subtract(1, 'day').startOf('day'),
        endTime: moment().subtract(1, 'day').endOf('day'),
      },
      {
        name: 'Random Event 4 dfdsknafaksdn',
        type: 'STANDARD', // ALL/STANDARD
        startTime: moment().subtract(1, 'day').add(8, 'hours'),
        endTime: moment().subtract(1, 'day').endOf('day'),
      },
    ],
  },
  mutations: {
    addEvent({ events }, evt) {
      events.push(evt);
    },
  },
  actions: {
    addEvent({ commit }, evt) {
      commit('addEvent', evt);
    },
  },
  modules: {
  },
});
