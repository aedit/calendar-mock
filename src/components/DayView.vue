<template>
  <div class="day-view column-view">
    <div class="day-view__row">
      <div></div>
      <div class="time-row">
        <div class="time-row__day">
          <div>{{ getDay() }}</div>
          <div>{{ getDate().date }}</div>
          <span
            v-for="(event, index) in getEvents().ALL"
            :key="index"
            class="event-chip event-chip--allday"
            :title="event.name"
          >
            {{ event.name }}
          </span>
        </div>
      </div>
    </div>
    <div class="day-view__row">
      <div class="time-line-wrap">
        <div class="time-line" v-for="hour in 24" :key="`time-line-${hour}`">
          {{ getHourString(hour) }}
        </div>
      </div>
      <div class="time-row">
        <div class="time-row__day">
          <div class="events-presentation">
            <span
              v-for="(event, index) in getEvents().STANDARD"
              :key="index"
              class="event-chip event-chip--standard"
              :style="getComputedStyle(event, getDate().key, index)"
              :title="event.name"
            >
              {{ event.name }}
            </span>
          </div>

          <div class="empty-tiles" v-for="hour in 24" :key="`hour-${hour}`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    currentDate: {
      type: Object,
      default: () => new Date(),
    },
  },
  data() {
    return {
      days: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    };
  },
  methods: {
    getEvents() {
      const { key } = this.getDate();
      return this.$store.getters.eventMap[key] ?? {};
    },
    getDate() {
      const now = this.currentDate.clone();
      return { date: now?.date(), key: now?.format('YYYY-MM-DD') };
    },
    getDay() {
      const now = this.currentDate.clone();
      const end = now.format('ddd');
      return end;
    },
    getHourString(hour) {
      if (hour < 12) return `${hour} AM`;
      if (hour === 12) return `${hour} PM`;
      if (hour === 24) return '';
      return `${hour % 12} PM`;
    },
    getComputedStyle(event, format, index) {
      return {
        top: `${(3 * moment(event.startTime).diff(moment(format, 'YYYY-MM-DD'), 's')) / 3600}rem`,
        height: `${(3 * moment(event.endTime).diff(event.startTime, 's')) / 3600}rem`,
        left: `${(index * 20) || 2}%`,
        width: `${90 - (index * 20)}%`,
        zIndex: index,
      };
    },
  },
};
</script>

<style lang="scss">
.day-view {
  width: 100%;
  height: calc(100vh - 10rem);
  &__row {
    display: grid;
    grid-template-columns: 6rem 1fr;
    &:nth-child(1) {
      min-height: 4rem;
    }
    &:nth-child(2) {
      height: 98%;
      overflow-y: auto;
    }
    .time-row {
      display: flex;
      padding: 0.4rem;
      overflow: hidden;
      .event-chip {
        max-width: 90%;
        border-radius: 5px;
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 0.8rem;
        padding: 0.2rem;
        overflow: hidden;
      }
      &__day {
        flex: 1;
        position: relative;
        // max-width: calc(100% / 7);

        .events-presentation {
          padding-right: 5px;
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          .event-chip {
            position: absolute;
          }
        }
      }
    }
  }
}
</style>
