const sleep = (ms = 0) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve , ms)
  })
} 
module.exports = {
  sleep
}