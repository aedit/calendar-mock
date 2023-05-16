<template>
  <div class="week-view column-view">
    <div class="week-view__row">
      <div />
      <div class="time-row">
        <div v-for="(day, idx) in days" :key="'week-day-' + idx" class="time-row__day">
          <div>{{ day }}</div>
          <div>{{ getDateText(idx).date }}</div>
          <div>
            <span
              v-for="(event, index) in getDayEvents(idx).ALL"
              :key="index"
              class="event-chip event-chip--allday"
              :title="event.name"
            >
              {{ event.name }}
            </span>
          </div>
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
          <div class="events-presentation">
            <span
              v-for="(event, index) in getDayEvents(day - 1).STANDARD"
              :key="'standard-' + index"
              class="event-chip event-chip--standard"
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
    },
    getHourString(hour) {
      if (hour < 12) return `${hour} AM`;
      if (hour === 12) return `${hour} PM`;
      if (hour === 24) return '';
      return `${hour % 12} PM`;
    },
    getDayEvents(column) {
      const { key } = this.getDateText(column);
      return this.$store.getters.eventMap[key] ?? {};
    },
    getFirstDate(now) {
      const start = now.startOf('week');
      return start;
    },
    getDateText(col) {
      const dt = this.firstDate?.clone?.().add?.(col, 'days');
      return { date: dt?.date(), key: dt?.format('YYYY-MM-DD') };
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

.column-view{
  .event-chip {
        max-width: 90%;
        border-radius: 5px;
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 0.8rem;
        padding: 0.2rem;
        &--allday {
          color: white;
          background: rgb(230, 124, 115);
        }

        &--standard {
          border: 1px solid rgb(230, 124, 115);
        }
      }
}

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
.empty-tiles {
  border-left: 1px solid #444;
  border-top: 1px solid #444;
  height: 3rem;
}
</style>
