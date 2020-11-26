
import fs from 'fs-extra'
let data ="test"
fs.writeFile('Output.txt', data, (err) =>{
  if(err) throw err
})