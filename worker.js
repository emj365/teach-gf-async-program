const SPEED_X = 60
const MS = 1
const SECOND_IN_MS = 1000 * MS
const MINUTE_IN_MS = 60 * SECOND_IN_MS / SPEED_X

var app = require('express')()
var bodyParser = require('body-parser')
app.use(bodyParser.json())

let busy = false

app.post('/consume', function (req, res) {
  let needMinutes
  let { taskName } = req.body
  switch(taskName) {
    case '吃饭': {
      needMinutes = 5
      break
    }
    case '吃菜': {
      needMinutes = 5
      break
    }
    case '喝汤': {
      needMinutes = 5
      break
    }
    default: {
      res.send('干嘛？')
    }
  }

  if (busy) {
    res.send(`知道了（Wǒ zài máng)`)
    return
  }

  console.log(`start task ${taskName}`)
  busy = true
  setTimeout(() => {
    busy = false
    console.log(`${taskName} done`)
  }, needMinutes * MINUTE_IN_MS)
  res.send(`遵命`)
})

app.listen(3000, function () {
  console.log('有什么好吃的发到 3000 端口!')
})
