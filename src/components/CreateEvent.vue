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
          <select v-model="eventData.startTime">
            <option v-for="option in timeOptions" :key="option">{{ option }}</option>
          </select>
        </div>
        <div>
          <label>Event End Time: </label>
          <select v-model="eventData.endTime">
            <option v-for="option in timeOptions" :key="option">{{ option }}</option>
          </select>
        </div>
      </div>
      <div v-if="validationErrors" class="form-validation-error">Please fill complete form!</div>
      <div class="event-save-button">
        <button @click="saveEventDetails">Save Event</button>
      </div>
      <button @click="closeForm" class="close-button">X</button>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

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
      timeOptions: [],
    };
  },
  beforeMount() {
    this.generateTimeOptions();
  },
  methods: {
    generateTimeOptions() {
      const arr = Array.from(Array(24).keys()).reduce((ar, e) => {
        let el = e;
        if (e < 10) el = `0${e}`;
        ar.push(`${el}:00`, `${el}:15`, `${el}:30`, `${el}:45`);
        return ar;
      }, []);
      this.timeOptions = arr;
    },
    saveEventDetails() {
      const evt = {};
      if (!this.eventData.name || !this.eventData.date || !this.eventData.type
      || (this.eventData.type === 'STANDARD' && (!this.eventData.startTime || !this.eventData.endTime))) {
        this.validationErrors = true;
        return;
      }
      evt.name = this.eventData.name;
      evt.type = this.eventData.type;
      let startTime = '';
      let endTime = '';
      if (this.eventData.type === 'ALL') {
        startTime = '00:00';
        endTime = '23:59';
      } else {
        startTime = this.eventData.startTime;
        endTime = this.eventData.endTime;
      }
      evt.startTime = moment(`${this.eventData.date} ${startTime}`, 'YYYY-MM-DD hh:mm');
      evt.endTime = moment(`${this.eventData.date} ${endTime}`, 'YYYY-MM-DD hh:mm');
      this.$store.dispatch('addEvent', evt);
      this.closeForm();
    },
    closeForm() {
      this.resetForm();
      this.$emit('closeForm');
    },
    resetForm() {
      this.$set(this, 'eventData', {
        name: '',
        type: 'ALL',
        date: '',
        startTime: '',
        endTime: '',
      });
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
    position: relative;
    background: white;
    margin: 5rem auto;
    height: 500px;
    width: 500px;
    padding: 2rem;
    border-radius: 10px;
    & > div{
      margin: 2rem;
    }
    .form-validation-error{
      color: red;
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

    .close-button{
      position: absolute;
      right: 5px;
      top: 5px;
    }
  }
}
</style>
