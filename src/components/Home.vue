<template lang="pug">
  .content-wrapper
    section
      .container
        h1.ui-title-1 Home
    section
      .container
        .task-list
          .task-item(
            v-for="task in tasks"
            :key="task.id"
            :class="{completed: task.completed}"
          )
            .ui-card.ui-card--shadow
              .task-item__info
                span.ui-lable.ui-lable--light {{task.whatWatch}}
                span Total Time:

</template>

<script>
  export default {
    data() {
      return {
       tasks:[
         {
           'id': 1,
           'title': 'GrowthBusters: Hooked on Growth',
           'description': 'I directed this documentary',
           'whatWatch': 'Film',
           'completed': 'false',
           'editing': 'false',
         },
         {
           'id': 2,
           'title': 'Game of thrones',
           'description': 'The winter is coming',
           'whatWatch': 'Serial',
           'completed': 'false',
           'editing': 'false',
         }

       ]
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .task-item
    margin-bottom 20px
    &:last-child
      margin-bottom 0
  .ui-label
    margin-right 8px


</style>
