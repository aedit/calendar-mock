<template>
  <div class="create-event-form">
    <div class="create-event-form__inner">
      <div>
        <label for="name" class="mr-s">Event Name: </label>
        <input type="text" v-model="eventData.name" />
      </div>
      <div>
        <span class="mr-s">Event Type: </span>
        <span>
          <input class="mr-s" type="radio" v-model="eventData.type" value="ALL" />
          <label class="mr-s">All Day Event</label>
          <input class="mr-s" type="radio" v-model="eventData.type" value="STANDARD" />
          <label class="mr-s">Standard Event</label>
        </span>
      </div>
      <div>
        <label class="mr-s" for="">Event Day: </label>
        <input type="date" v-model="eventData.date" />
      </div>
      <div v-if="eventData.type === 'STANDARD'" class="event-time-inputs">
        <div>
          <label>Event Start Time: </label>
          <input type="time" v-model="eventData.startTime" />
        </div>
        <div>
          <label>Event End Time: </label>
          <input type="time" v-model="eventData.endTime" />
        </div>
      </div>
      <div v-if="validationErrors" class="form-validation-error">Please fill complete form!</div>
      <div class="event-save-button">
        <button @click="saveEventDetails">Save Event</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eventData: {
        name: '',
        type: 'ALL',
        date: '',
        startTime: '',
        endTime: '',
      },
      validationErrors: false,
    };
  },
  methods: {
    saveEventDetails() {
      console.log(this.eventData);
    },
  },
};
</script>

<style lang="scss">
.create-event-form {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #00000099;
  z-index: 100;
  display: flex;
  &__inner {
    background: white;
    margin: 5rem auto;
    height: 500px;
    width: 500px;
    padding: 2rem;
    border-radius: 10px;
    & > div{
      margin: 2rem;
    }

    .event-time-inputs{
      & > div{
        margin: 2rem 0rem;
      }
    }

    .event-save-button{
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
