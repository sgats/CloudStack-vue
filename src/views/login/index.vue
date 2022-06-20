<template>
  <div></div>
</template>

<script>
  import { isPassword } from '@/utils/validate'

  export default {
    name: 'Login',
    data() {
      return {
        loading: false,
        redirect: null,
        ticket: null,
      }
    },
    watch: {
      $route: {
        handler(route) {
          this.redirect = (route.query && route.query.redirect) || '/'
        },
        immediate: true,
      },
    },
    created() {
      this.ticket = this.getUrlAllParam('ticket')

      this.loading = true
      this.$store
        .dispatch('user/validateTicket', this.ticket)
        .then(() => {
          const routerPath =
            this.redirect === '/404' || this.redirect === '/401'
              ? '/'
              : this.redirect
          this.$router.push(routerPath).catch(() => {})
          this.loading = false
        })
        .catch((err) => {
          // console.log(err)
          this.loading = false
          this.$router.push('/401')
        })
    },
    methods: {
      getUrlAllParam(...args) {
        if (args.length === 0) return undefined
        const url = decodeURIComponent(window.location.href)
        const reg =
          args.length === 1
            ? new RegExp(`[&?]${args[0]}=([^&%#]+)`)
            : new RegExp(`[&?](?:${args.join('|')})=([^&%#]+)`)
        const matchArray = url.match(reg)
        return matchArray === null ? undefined : matchArray[1]
      },
    },
  }
</script>

<style lang="scss" scoped></style>
