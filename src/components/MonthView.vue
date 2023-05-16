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
        <div v-for="textCell in 7" :key="'day-' + textCell">
          {{ row === 1 ? days[textCell - 1] : getCalendarLabel(row, textCell).date }}
        </div>
      </div>
      <div v-if="row > 1" class="events-presentation">
        <div v-for="eventCell in 7" :key="'event-' + eventCell">
          <div v-if="getTotalEventsForDay(row, eventCell) > 3">
            <span
              v-for="(event, idx) in getTwoEventsForDay(row, eventCell)"
              :key="idx"
              class="event-chip"
              :class="[event.type === 'ALL' ? 'event-chip--allday' : 'event-chip--standard']"
              :title="event.name"
            >
              {{ event.name }}
            </span>
            <span style="font-size: 0.8rem"
              >{{ getTotalEventsForDay(row, eventCell) - 2 }} More Events</span
            >
          </div>
          <template v-else>
            <span
              class="event-chip event-chip--allday"
              v-for="(event, idx) in getAllEventsForDay(row, eventCell).ALL"
              :key="'all-day-' + idx"
              :title="event.name"
            >
              {{ event.name }}
            </span>
            <span
              class="event-chip event-chip--standard"
              v-for="(event, idx) in getAllEventsForDay(row, eventCell).STANDARD"
              :key="'standard-' + idx"
              :title="event.name"
            >
              {{ event.name }}
            </span>
          </template>
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
  watch: {
    currentDate: {
      deep: true,
      handler(newVal) {
        this.init(newVal.clone());
      },
    },
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
    // get both standard and all day event for each day in the view
    getAllEventsForDay(row, column) {
      const { key } = this.getCalendarLabel(row, column);
      console.log(this.$store.getters.eventMap[key]);
      return this.$store.getters.eventMap[key] ?? {};
    },
    getCalendarLabel(row, column) {
      const dt = this.firstDate?.clone?.().add?.((row - 2) * 7 + (column - 1), 'days');
      return {
        date: dt?.date() === 1 ? `${dt?.format('MMM')} ${dt?.date()}` : dt?.date(),
        key: dt?.format('YYYY-MM-DD'),
      };
    },
    getTotalEventsForDay(row, eventCell) {
      const allday = this.getAllEventsForDay(row, eventCell).ALL?.length || 0;
      const standard = this.getAllEventsForDay(row, eventCell).STANDARD?.length || 0;
      return allday + standard;
    },
    getTwoEventsForDay(row, eventCell) {
      const alldayEvents = this.getAllEventsForDay(row, eventCell).ALL || [];
      const standardEvents = this.getAllEventsForDay(row, eventCell).STANDARD || [];
      const events = [];
      if (alldayEvents.length && standardEvents.length) {
        events.push(alldayEvents[0], standardEvents[0]);
      } else if (alldayEvents.length) {
        events.push(alldayEvents[0], alldayEvents[1]);
      } else events.push(standardEvents[0], standardEvents[1]);
      return events;
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
    .day > *,
    .events-presentation > * {
      padding: 0.5rem;
    }
    .events-presentation > * {
      padding-top: 1.6rem;

      .event-chip {
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 0.8rem;
        padding: 0.2rem;
        border-radius: 5px;
        margin-bottom: 0.2rem;
      }
    }
  }
}
</style>
