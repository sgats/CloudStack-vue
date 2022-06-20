import { casUrl, casLogoutUrl } from '@/config'

export function casLogin(redirect = '/') {
  const hrefUrl =
    casUrl +
    '?service=' +
    escape(
      window.location.protocol +
        '//' +
        window.location.hostname +
        ':' +
        window.location.port +
        '/login' +
        '?redirect=' +
        redirect
    )
  window.location.replace(hrefUrl)
}

export function casLogout(redirect = '/') {
  const hrefUrl =
    casLogoutUrl +
    '?service=' +
    escape(
      window.location.protocol +
        '//' +
        window.location.hostname +
        ':' +
        window.location.port +
        redirect
    )
  window.location.replace(hrefUrl)
}
