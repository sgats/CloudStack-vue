<template>
  <div>
    <packagepush :env="env" :app_name="app_name"></packagepush>
    <br />
    <restartexpansion :env="env" :app_name="app_name"></restartexpansion>
  </div>
</template>

<script>
  import packagepush from './PackagePush'
  import restartexpansion from './RestartExpansion'

  export default {
    name: 'AppDetail',
    components: {
      packagepush,
      restartexpansion,
    },
    computed: {
      env() {
        return this.$route.params.env
      },
      app_name() {
        return this.$route.params.app_name
      },
    },
    // created() {
    //   this.$route.meta.title = this.app_name + '应用详情'
    // },
  }
</script>

<style scoped></style>
