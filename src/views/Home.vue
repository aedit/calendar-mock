<template>
  <div class="home">
    <header class="header">
      <div class="header__navigation">
        <button>&lt;</button>
        <button>&gt;</button>
      </div>
      <div class="header__dateoptions">
        <button>Today</button>
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
      Calendar View
    </div>
    <CreateEventForm v-if="isCreateEventFormOpen"></CreateEventForm>
  </div>
</template>

<script>
import CreateEventForm from '@/components/CreateEvent.vue';

export default {
  name: 'Home',
  data() {
    return {
      viewType: 'months',
      isCreateEventFormOpen: false,
    };
  },
  components: { CreateEventForm },
  methods: {

  },
};
</script>

<style lang="scss">
.header{
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 2rem;
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
