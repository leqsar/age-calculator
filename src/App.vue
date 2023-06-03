<script setup>
import { def } from '@vue/shared';
import { gsap } from "gsap";
import Form from './components/Form.vue'
import Result from './components/Result.vue'
</script>

<script>
  export default {
    data() {
      return {
        calcDays: '',
        calcMonth: '',
        calcYear: '',
        tweenedYear: 0,
        tweenedMonth: 0,
        tweenedDay: 0,
        dayError: {
          error: false,
          text: ''
        },
        monthError: {
          error: false,
          text: ''
        },
        yearError: {
          error: false,
          text: '',
        },
        formError: {
          error: false,
          text: ''
        }
      }
    },
    methods: {
      calc(day, month, year) {
        //how many time till the next year from year of birth
        const daysTillNext = new Date(year, month, 0).getDate()-day;
        const monthTillNext = 12-month;
        //how many years passed
        const preCalcYears = new Date().getFullYear()-year-1;
        //
        const preCalcMonth = new Date().getMonth();
        const preCalcDays = daysTillNext+new Date().getDate();
        //count months from days
        const pre2CalcMonth = preCalcDays >= 31 ? preCalcMonth+1+monthTillNext : preCalcMonth+monthTillNext;
        //count days sum
        const finalCalcDays = preCalcDays >= 31 ? preCalcDays-31 : preCalcDays;
        const finalCalcYears = pre2CalcMonth >= 12 ? preCalcYears+1 : preCalcYears;
        const finalCalcMonth = pre2CalcMonth >= 12 ? pre2CalcMonth-12 : pre2CalcMonth;
        //set calculated values
        this.calcDays=finalCalcDays;
        this.calcMonth=finalCalcMonth;
        this.calcYear=finalCalcYears;
      },
      formValidate(day, month, year) {
        this.formError.error=false;
        if(day < 1 || day > 31) {
          this.dayError.error=true
          this.dayError.text='Must be a valid day'
        } else {
          this.dayError.error=false
        }

        if(month < 1 || month > 12) {
          this.monthError.error=true
          this.monthError.text='Must be a valid month'
        } else {
          this.monthError.error=false
        }
        
        if(year > new Date().getFullYear()) {
          this.yearError.error=true
          this.yearError.text='Year must  be in the past'
        } else {
          this.yearError.error=false
        }

        if(!this.dayError.error && !this.monthError.error && !this.yearError.error) {
          return true
        } else {
          return false
        }
      },
      formValidateReq(day, month, year){
        if(day && month && year) {
          return true
        }
        if(!day) {
          this.dayError.error=true
          this.dayError.text='The day is required'
        } else {
          this.dayError.error=false
        }
        if(!month) {
          this.monthError.error=true
          this.monthError.text='The month is required'
        } else {
          this.monthError.error=false
        }
        if(!year) {
          this.yearError.error=true
          this.yearError.text='The year is required'
        } else {
          this.yearError.error=false
        }
        return false;
      },
      dateValidate(day, month, year) {
        if(day > new Date(year, month, 0).getDate()) {
          this.formError.error=true
          this.formError.text='The date must be correct'
        } else {
          this.formError.error=false
        }
      },
      setNew(day, month, year) {
        if(this.formValidateReq(day, month, year)) {
          if(this.formValidate(day, month, year)) {
            this.dateValidate(day, month, year);
            if(!this.dayError.error && !this.monthError.error && !this.yearError.error && !this.formError.error) {
              this.calc(day, month, year);
          }
          }
        }
      },
    },
    computed: {
      animatedYear: function() {
        if(this.tweenedYear === 0) {
          return '--';
        }
        return this.tweenedYear.toFixed(0);
      },
      animatedMonth: function() {
        if(this.tweenedMonth === 0) {
          return '--';
        }
        return this.tweenedMonth.toFixed(0);
      },
      animatedDay: function() {
        if(this.tweenedDay === 0) {
          return '--';
        }
        return this.tweenedDay.toFixed(0);
      },
    },
    watch: {
      calcYear: function(newValue) {
        gsap.to(this.$data, { duration: 0.5, tweenedYear: newValue });
      },
      calcMonth: function(newValue) {
        gsap.to(this.$data, { duration: 0.5, tweenedMonth: newValue });
      },
      calcDays: function(newValue) {
        gsap.to(this.$data, { duration: 0.5, tweenedDay: newValue });
      },
    }
  }
</script>

<template>
  <Form @submit-form="setNew" :monthError="monthError" :dayError="dayError" :yearError="yearError" :formError="formError"/>
  <Result :day="animatedDay" :month="animatedMonth" :year="animatedYear"/>
</template>

<style scoped>

</style>
