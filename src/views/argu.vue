<template>
  <div>
    {{ params }}
  </div>
</template>

<script>
export default {
  props: {
    params: {
      type: String,
      default: 'lison'
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      console.log(vm)
    })
  },
  beforeRouteUpdate (to, from, next) {
    console.log(to.name, from)
    next()
  }
}
</script>
