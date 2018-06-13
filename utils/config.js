

//环境
let envPool = {
  dev: {
    name: "dev",
    apiUrl : "http://localhost:8888"
  },
  test: {
    name: "test"
  }
}

const env = envPool.dev
//api地址
const apiUrl = env.apiUrl;

module.exports = {
  apiUrl: apiUrl,
  env: env,
  envPool: envPool
}