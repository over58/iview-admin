const git = require('git-rev')
const fs = require('fs')
const path = require('path')

git.log(function(res) {
  let data = res.map(item => {
    return {
      commit_id: item[0],
      commit_message: item[1],
      create_time: item[2]
    }
  }).filter(item => {
    let msg = item.commit_message.trim();
    return msg !== "test" && msg !== "update";
  })
  fs.writeFileSync(
    path.join(__dirname, "../src/data/record.js"),
    `'use strict';\n\n module.exports = ${JSON.stringify(data)}`,
    {
      encoding: "utf8"
    }
  );
})