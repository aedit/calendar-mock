<template>
  <div class="home">
    <header class="header">
      <div class="header__navigation">
        <button @click="navigateToPrevious">&lt;</button>
        <button @click="navigateToNext">&gt;</button>
      </div>
      <div class="header__dateoptions">
        <button @click="navigateToToday">Today</button>
        <select v-model="viewType">
          <option value="days">Day</option>
          <option value="weeks">Week</option>
          <option value="months">Month</option>
        </select>
      </div>
      <div class="header__create-event">
        <button @click="isCreateEventFormOpen = true">Create Event</button>
      </div>
    </header>
    <div>
      <MonthView v-if="viewType==='months'" :currentDate="currentDate" />
      <WeekView v-else-if="viewType==='weeks'" :currentDate="currentDate" />
      <DayView v-else-if="viewType==='days'" :currentDate="currentDate" />
    </div>
    <CreateEventForm v-if="isCreateEventFormOpen"></CreateEventForm>
  </div>
</template>

<script>
import CreateEventForm from '@/components/CreateEvent.vue';
import MonthView from '@/components/MonthView.vue';
import WeekView from '@/components/WeekView.vue';
import DayView from '@/components/DayView.vue';
import moment from 'moment';

export default {
  name: 'Home',
  data() {
    return {
      viewType: 'weeks',
      isCreateEventFormOpen: false,
      currentDate: moment().local(),
    };
  },
  mounted() {
    this.currentDate = moment().local();
  },
  components: {
    CreateEventForm, MonthView, WeekView, DayView,
  },
  methods: {
    navigateToPrevious() {
      this.currentDate = this.currentDate.clone().subtract(1, this.viewType);
    },
    navigateToNext() {
      this.currentDate = this.currentDate.clone().add(1, this.viewType);
    },
    navigateToToday() {
      this.currentDate = moment();
    },
  },
};
</script>

<style lang="scss">
button{
      border: 1px solid black;
      border-radius: 10px;
      padding: 0.2rem 0.5rem;
      background: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

.header{
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  &__navigation{
    display: flex;
    gap: 0.5rem;
    button{
      border: 1px solid black;
      border-radius: 10px;
      padding: 0.2rem 0.5rem;
      background: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__dateoptions{
    display: flex;
    gap: 1rem
  }

  &__create-event{
    button{
      border-color: #45a8e4;
      background: #45a8e4;
      color: white;
    }
  }
}
</style>
