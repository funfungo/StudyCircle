import cloudbase from '@cloudbase/js-sdk'

const env = import.meta.env.VITE_CLOUDBASE_ENV
const region = import.meta.env.VITE_CLOUDBASE_REGION || 'ap-shanghai'
const accessKey = import.meta.env.VITE_CLOUDBASE_ACCESS_KEY

let _app = null

function getApp() {
  if (!_app) {
    if (!env || !accessKey) {
      throw new Error(
        '请在 .env 文件中配置 VITE_CLOUDBASE_ENV 和 VITE_CLOUDBASE_ACCESS_KEY'
      )
    }
    _app = cloudbase.init({
      env,
      region,
      accessKey,
      auth: { detectSessionInUrl: true },
    })
  }
  return _app
}

export function getCloudbaseDb() {
  return getApp().database()
}

export function getCloudbaseAuth() {
  return getApp().auth
}
