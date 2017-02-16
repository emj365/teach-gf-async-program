const SPEED_X = 60
const MS = 1
const SECOND_IN_MS = 1000 * MS
const MINUTE_IN_MS = 60 * SECOND_IN_MS / SPEED_X

const TASKS = [
  { name: '淘米', needMinutes: '3',  block: true,  priority: 1 },
  { name: '洗菜', needMinutes: '5',  block: true,  priority: 3 },
  { name: '煮饭', needMinutes: '30', block: false, priority: 2 },
  { name: '抄菜', needMinutes: '10', block: true,  priority: 5 },
  { name: '炖汤', needMinutes: '20', block: false, priority: 4 }
]

let startTime

const produce = function (taskName) {
  let request = require('request');
  let comsumeTaskName

  switch (taskName) {
    case '煮饭': {
      comsumeTaskName = '吃饭'
      break
    }
    case '抄菜': {
      comsumeTaskName = '吃菜'
      break
    }
    case '炖汤': {
      comsumeTaskName = '喝汤'
      break
    }
    default: {
      return
    }
  }

  let options = {
    uri: 'http://localhost:3000/consume',
    method: 'POST',
    json: {
      "taskName": comsumeTaskName
    }
  }

  console.log(`发号施令：${comsumeTaskName}`)
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(`MJ回复: ${body}`)
      if (body === '知道了（Wǒ zài máng)') {
        throw new Error('我不干了!')
      }
    }
  })
}

const log = function (taskName) {
  console.log(`${taskName} done after ${
    parseInt((new Date().getTime() - startTime.getTime()) / SECOND_IN_MS)
  } seconds.`)
  produce(taskName)
}

// simulate block in JS
const doBlockTask = function (taskName, needMinutes) {
  const now = new Date().getTime()
  while (new Date().getTime() < now + needMinutes * MINUTE_IN_MS) {
    /* do nothing */
  }

  log(taskName)
}

const doNonBlockTask = function (taskName, needMinutes) {
  setTimeout(function () {
    log(taskName)
  }, needMinutes * MINUTE_IN_MS)
}

const exec = function () {
  startTime = new Date()
  console.log(`start exec at ${startTime.toString()}`)
  const tasks = require('lodash').sortBy(TASKS, ['priority'])
  for (task of tasks) {
    if (task.block) {
      doBlockTask(task.name, task.needMinutes)
    } else {
      doNonBlockTask(task.name, task.needMinutes)
    }
  }
}

exec()
