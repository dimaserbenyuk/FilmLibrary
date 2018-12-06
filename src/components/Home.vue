<template lang="pug">
  .content-wrapper
    section
      .container
        h1.ui-title-1 Add new {{ whatWatch }}
        form(@submit.prevent="onSubmit")
          //! Task header
          .header
            input(
            type="text"
            id="title"
            placeholder="What we will watch?"
            v-model="taskTitle"
            style="margin-right: 12px;"
            )
            select(v-model="whatWatch" style="max-width: 230px;")
              option(
              v-for="option in options"
                :key="option.title"
                  :value="option.title"
              ) {{ option.title }}
          textarea(
          type="text"
          v-model="taskDescription"
            @keyup.enter="newTask"
          )

          //* TOTAL TIME FOR WHAT WATCH
          .total-time
            //* Film Time
            .time-film(v-if="whatWatch === 'Film'")
              span.time-title Hours
              input.time-input(
              type="number"
              v-model="filmHours"
              )
              span.time-title Minutes
              input.time-input(
              type="number"
              v-model="filmMinutes"
              )
              p {{ filmTime }}

            //* Serial Time
            .time-serial(v-if="whatWatch === 'Serial'")
              span.time-title How many season?
              input.time-input(
              type="number"
              v-model="serialSeason"
              )
              span.time-title How many series?
              input.time-input(
              type="number"
              v-model="serialSeries"
              )
              span.time-title How long is one series? (minutes)
              input.time-input(
              type="number"
              v-model="serialSeriesMinutes"
              )
              p {{ serialTime }}

            //* Course Time
            .time-course(v-if="whatWatch === 'Course'")
              span.time-title Average Hours
              input.time-input(
              type="number"
              v-model="courseHours"
              )
              span.time-title Average Minutes
              input.time-input(
              type="number"
              v-model="courseMinutes"
              )
              p {{ courseTime }}

            //* Read
            .time-book(v-if="whatWatch === 'Book'")
              span.time-title How many pages?
              input.time-input(
              type="number"
              v-model="pages"
              )
              p {{ readTime }}

          // TAG LIST

          // Add New Tag Button
          .tag-list.tag-list--add
            .ui-tag__wrapper(
            @click="tagMenuShow = !tagMenuShow"
            )
              .ui-tag
                span.tag-title Add New
                span.button-close(
                :class="{ active: !tagMenuShow }"
                )

          // Show Menu Input
          transition(name="fade")
            .tag-list.tag-list--menu(
            v-if="tagMenuShow"
            )
              input.tag-add--input(
              type="text"
              placeholder="New tag"
              v-model="tagTitle"
                @keyup.enter="newTag"
              )
              .button.button-default(
              @click="newTag"
              ) Send

          // Show All Tags
          .tag-list
            transition-group(
            enter-active-class="animated fadeInRight"
            leave-active-class="animated fadeOutDown"
            )
              .ui-tag__wrapper(
              v-for="tag in tags"
                :key="tag.title"
              )
                .ui-tag(
                @click="addTagUsed(tag)"
                  :class="{used: tag.use}"
                )
                  span.tag-title {{ tag.title }}
                  span.button-close

          // SUBMIT
          .button-list
            button.button.button--round.button-primary(
            type="submit"
              :disabled="submitStatus === 'PENDING'"
            ) Send

</template>

<script>
  import { required } from 'vuelidate/lib/validators'
  export default {
    data () {
      return {
        submitStatus: null,
        taskTitle: '',
        taskDescription: '',
        options: [
          {title: 'Film', count: 0},
          {title: 'Serial', count: 0},
          {title: 'Course', count: 0},
          {title: 'Book', count: 0}
        ],
        whatWatch: 'Film',
        // Total Time
        totalTime: 0,
        // Film
        filmHours: 1,
        filmMinutes: 30,
        // Serial
        serialSeason: 1,
        serialSeries: 11,
        serialSeriesMinutes: 40,
        // Course
        courseHours: 8,
        courseMinutes: 30,
        // Book
        pages: 320,
        // Tags
        tagTitle: '',
        tagMenuShow: false,
        tagsUsed: []
      }
    },
    validations: {
      taskTitle: {
        required
      }
    },
    methods: {
      // Add New Tag
      newTag () {
        if (this.tagTitle === '') {
          return
        }
        const tag = {
          title: this.tagTitle,
          use: false
        };
        this.$store.dispatch('newTag', tag);
        // Reset
        this.tagTitle = ''
      },
      // Add Used Tag
      addTagUsed (tag) {
        tag.use = !tag.use;
        if (tag.use) {
          this.tagsUsed.push({
            title: tag.title
          })
        } else {
          this.tagsUsed.splice(tag.title, 1)
        }
      },
      // Submit NEW TASK
      onSubmit () {
        this.$v.$touch();
        if (this.$v.$invalid) {
          console.log('ERROR');
          this.submitStatus = 'ERROR'
        } else {
          // Vaild
          console.log('SEND');
          this.submitStatus = 'PENDING';
          // Firebase waiting
          setTimeout(() => {
            this.submitStatus = 'OK'
          }, 500);
          // Time
          let time;
          if (this.whatWatch === 'Film') {
            time = this.filmTime
          } else {
            time = this.serialTime
          }
          // Task
          const task = {
            title: this.taskTitle,
            description: this.taskDescription,
            whatWatch: this.whatWatch,
            time,
            tags: this.tagsUsed,
            completed: false,
            editing: false
          };
          this.$store.dispatch('newTask', task);
          // Reset
          this.taskTitle = '';
          this.taskDescription = '';
          // Reset $v (validate)
          this.$v.$reset();
          // Reset for Tags
          this.tagMenuShow = false;
          this.tagsUsed = [];
          this.tagTitle = '';
          for (let i = 0; i < this.tags.length; i++) {
            this.tags[i].use = false
          }
        }
      },
      // Total Time
      getHoursAndMinutes (minutes) {
        let hours = Math.trunc(minutes / 60);
        let min = minutes % 60;
        return hours + ' Hours ' + min + ' Minutes'
      }
    },
    computed: {
      tags () {
        return this.$store.getters.tags
      },
      // Total Time
      filmTime () {
        let min = (this.filmHours * 60) + (this.filmMinutes *1);
        return this.getHoursAndMinutes(min)
      },
      serialTime () {
        let min = this.serialSeason * this.serialSeries * this.serialSeriesMinutes;
        return this.getHoursAndMinutes(min)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .header
    display: flex
  //
  // Options
  //
  .option-list
    display flex
    align-items center
    margin-bottom 20px
    .what-watch--radio
      margin-right 12px
    input
      margin-bottom 0
    label
      margin-right 20px
      margin-bottom 0
      &:last-child
        margin-right 0
  //
  // Total time
  //
  .total-time
    margin-bottom 20px
  .time-title
    display block
    margin-bottom 6px
  .time-input
    max-width 80px
    margin-right 10px
  //
  // Tags
  //
  .tag-list
    margin-bottom 20px
  // Tag Menu Show
  .tag-list--menu
    display flex
    justify-content space-between
    align-items center
  // New Tag Input
  .tag-add--input
    margin-bottom 0
    margin-right 10px
    height 42px

      //////////////////
  .ui-tag
    &.used
      background-color: #444ce0
      color #fff
      .button-close
        &:before,
        &:after
          background-color: #fff
    .button-close
      &.active
        transform: rotate(45deg)
        ////////////////////
  // Tag Menu Show
  .tag-list--menu
    display flex
    justify-content space-between
    align-items center
  // New Tag Input
  .tag-add--input
    margin-bottom 0
    margin-right 10px
    height 42px
  //
  // Total Time
  //
  .total-time
    p
      margin-bottom 6px
    span
      margin-right 16px
    .task-input
      max-width 80px
      margin-bottom 28px
      margin-right 10px
  .button-list
    display flex
    justify-content flex-end
  //
  // Validate
  //
  .form-item
    .error
      display none
      margin-bottom 8px
      font-size 13.4px
      color #fc5c65
    &.errorInput
      .error
        display block
  input
    &.error
      border-color #fc5c65
</style>
