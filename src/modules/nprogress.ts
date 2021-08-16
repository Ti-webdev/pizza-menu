import NProgress from 'nprogress'
import { UserModule } from '~/types'

export const install: UserModule = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach((to, from) => { if (to.path !== from?.path) NProgress.start() })
    router.afterEach((to, from) => { if (to.path !== from?.path) NProgress.done() })
  }
}
