/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [
      {
        name: 'Random Event 1 fdsjfdsnjfnds dsfjndsjk',
        type: 'STANDARD', // ALL/STANDARD
        startTime: moment().subtract(3, 'hours'),
        endTime: moment().subtract(120, 'minutes'),
      },
      {
        name: 'Random Event 2 fjndjgnfdgjdfsnjkf',
        type: 'STANDARD', // ALL/STANDARD
        startTime: moment().add(1, 'day').subtract(3, 'hours'),
        endTime: moment().add(1, 'day').subtract(2, 'hours'),
      },
      {
        name: 'Random Event 6 fjndjgnfdgjdfsnjkf',
        type: 'ALL', // ALL/STANDARD
        startTime: moment().add(1, 'day').startOf('day'),
        endTime: moment().add(1, 'day').endOf('day'),
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
        startTime: moment().subtract(1, 'day').startOf('day').add(8, 'hours'),
        endTime: moment().subtract(1, 'day').endOf('day'),
      },
      {
        name: 'Random Event 5 dfdsknafaksdn dsfsdf',
        type: 'STANDARD', // ALL/STANDARD
        startTime: moment().subtract(1, 'day').startOf('day').add(2, 'hours'),
        endTime: moment().subtract(1, 'day').startOf('day').add(5, 'hours'),
      },
    ],
  },
  getters: {
    // return events in the format 'YYYY-MM-DD' : {ALL: [], STANDARD: []}
    eventMap({ events }) {
      return events.reduce((obj, el) => {
        const { startTime, endTime } = el;
        const temp = moment(startTime).startOf('day');
        while (temp.isBefore(endTime) || temp.isSame(endTime)) {
          const key = temp.format('YYYY-MM-DD');
          if (!obj[key]) {
            obj[key] = { ALL: [], STANDARD: [] };
          }
          obj[key][el.type].push(el);
          temp.add(1, 'days');
        }
        return obj;
      }, {});
    },
  },
  mutations: {
    addEvent({ events }, evt) {
      events.push(evt);
    },
    initaliseEvents({ events }) {
      if (localStorage.getItem('calendar-events')) {
        events.push(...JSON.parse(localStorage.getItem('calendar-events')));
      } else events = [];
    },
    updateLocalStorage({ events }) {
      localStorage.setItem('calendar-events', JSON.stringify(events));
    },
  },
  actions: {
    addEvent({ commit }, evt) {
      commit('addEvent', evt);
      commit('updateLocalStorage');
    },
  },
});
