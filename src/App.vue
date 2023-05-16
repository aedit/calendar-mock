<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.mr-s {
  margin-right: 0.5rem;
}

.event-chip {
  &--allday {
    color: white;
    background: rgb(230, 124, 115);
  }

  &--standard {
    background: white;
    border: 2px solid rgb(230, 124, 115);
    color: rgb(230, 124, 115);
  }
}
</style>
