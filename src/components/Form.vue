<template>
  <form action="submit">
    <label for="day" :class="{errorLabel: dayError.error}">Day</label>
    <input id="day" :class="{error: dayError.error}" type="number" v-model="day" placeholder="DD" min="1" max="31">
    <label for="month" :class="{errorLabel: monthError.error}">Month</label>
    <input id="month" :class="{error: monthError.error}" type="number" v-model="month" placeholder="MM" min="1" max="12">
    <label for="Year" :class="{errorLabel: yearError.error}">Year</label>
    <input id="year" :class="{error: yearError.error}" type="number" v-model="year" placeholder="YYYY">
  </form>
  <div class="error-wrapper">
    <p v-show="dayError.error" class="day-error">{{dayError.text}}</p>
    <p v-show="monthError.error" class="month-error">{{monthError.text}}</p>
    <p v-show="yearError.error" class="year-error">{{yearError.text}}</p>
    <p v-show="formError.error" class="form-error">{{formError.text}}</p>
  </div>
  <button @click="$emit('submitForm', day, month, year)">
    <img src="../assets/icon-arrow.svg">
  </button>
</template>

<script>
  export default {
    data() {
      return {
        day: '',
        month: '',
        year: ''
      }
    },
    props: ['dayError', 'monthError', 'yearError', 'formError']
  }
</script>

<style scoped>
  
</style>
