<template>
    <p class="output year-result"><span>{{year}}</span>years</p>
    <p class="output"><span>{{month}}</span>months</p>
    <p class="output"><span>{{day}}</span>days</p>
  </template>
  
<script>
    export default {
        props: ['day', 'month', 'year']
    }
  </script>
  
  <style scoped>
    
  </style>
  