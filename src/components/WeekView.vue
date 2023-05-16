<template>
  <div class="week-view">
    <div class="week-view__row">
      <div />
      <div class="time-row">
        <div v-for="(day, idx) in days" :key="'week-day-' + idx" class="time-row__day">
          {{ day }}
        </div>
      </div>
    </div>
    <div class="week-view__row">
      <div class="time-line-wrap">
        <div class="time-line" v-for="hour in 24" :key="`time-line-${hour}`">
          {{ getHourString(hour) }}
        </div>
      </div>
      <div class="time-row">
        <div class="time-row__day" :key="`day-${day}`" v-for="day in 7">
          <div class="empty-tiles" v-for="hour in 24" :key="`hour-${hour}`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentDate: {
      type: Object,
      default: () => new Date(),
    },
  },
  data() {
    return {
      firstDate: null,
      weeksToShow: 6,
      days: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    };
  },
  methods: {
    getHourString(hour) {
      if (hour < 12) return `${hour} AM`;
      if (hour === 12) return `${hour} PM`;
      if (hour === 24) return '';
      return `${hour % 12} PM`;
    },
  },
};
</script>

<style lang="scss">
.week-view {
  padding: 0 1rem;
  height: calc(100vh - 10rem);
  &__row {
    display: grid;
    grid-template-columns: 6rem 1fr;
    .time-line-wrap {
      padding: 1rem 0 0.4rem;
    }
    .time-line {
      font-size: 0.6rem;
      color: #888;
      height: 3rem;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
    }

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

      &__day {
        flex: 1;
        position: relative;
        max-width: calc(100% / 7);
        text-align: center;

        .empty-tiles {
          border-left: 1px solid #444;
          border-top: 1px solid #444;
          height: 3rem;
        }
      }
    }
  }
}
</style>
