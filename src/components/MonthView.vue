<template>
  <div class="month-view">
    <div
      v-for="row in weeksToShow"
      :key="'week-row-' + row"
      class="weeks-row"
      :class="{ 'first-row': row === 1 }"
    >
      <div class="border">
        <div v-for="borderCell in 7" :key="'border-' + borderCell" class="border-cell"></div>
      </div>
      <div class="day">
        <div
          v-for="textCell in 7"
          :key="'day-' + textCell"
        >
          {{getCalendarLabel(row, textCell)}}
        </div>
      </div>
      <div v-if="row > 1" class="events-presentation">
        <div v-for="eventCell in 7" :key="'event-'+eventCell">
          EventChip
          EventChip
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
  mounted() {
    const now = this.currentDate;
    if (now) this.init(now.clone());
  },
  methods: {
    init(now) {
      this.firstDate = this.getFirstDate(now.clone());
      this.weeksToShow = now.endOf('month').week() - now.startOf('month').week() + 2;
    },
    getFirstDate(now) {
      const start = now.startOf('month');
      start.subtract(start.day(), 'days');
      return start;
    },
    getCalendarLabel(row, column) {
      if (row === 1) {
        return this.days[column - 1];
      }
      return 12;
    },
  },
};
</script>

<style lang="scss">
.month-view {
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;

  .weeks-row {
    position: relative;
    min-height: 100px;
    border-right: 1px solid #444;
    border-bottom: 1px solid #444;
    &.first-row {
      height: 2rem;
      min-height: 2rem;
    }
    & > * {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;

      & > * {
        min-width: calc(100% / 7);
      }
    }
    .border > * {

    border-left: 1px solid #444;
  }
    .day > *, .events-presentation > *{
      padding: 0.5rem;
    }
    .events-presentation > * {
      padding-top: 1.6rem;
    }
  }

}
</style>
