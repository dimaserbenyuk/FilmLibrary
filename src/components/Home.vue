<template lang="pug">
  .content-wrapper
    section
      .container
        h1.ui-title-1 Home
        input(
          type="text"
          placeholder="What we will Watch?"
          v-model="taskTitle"
          @keyup.enter="newTask"
        )
        textarea(
        type="text"
        v-model="taskDescription"
          @keyup.enter="newTask"
        )
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
              span.button-close
            .task-item__content
              .task-item__header
                .ui-checkbox(
                  type='checkbox'
                  v-model="task.completed"
                )
              span.ui-title-3 {{task.title}}
            .task-item__body
              p.ui-text-regular {{task.description}}

</template>

<script>
  export default {
    data() {
      return {
        taskTitle: '',
        taskDescription: '',
        whatWatch: 'Film',
        taskId: 3,
        tasks: [
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
    },
    method: {
      newTask() {
        this.tasks.push({
          id: this.taskId,
          title: this.taskTitle,
          description: this.taskDescription,
          whatWatch: this.whatWatch,
          completed: false,
          editing: false
        })
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

  .task-item__info
    display flex
    align-items center
    justify-content space-between
    margin-bottom 20px
    .button-close
      width 20px
      height @width

  .task-item__header
    display flex
    align-items center
    margin-bottom 18px
    .ui-checkbox-wrapper
      margin-right 8px
    .ui-title-3
      margin-bottom 0


</style>
