
import fs from 'fs-extra'
const data ='test'
fs.writeFile('Output.txt', data, (err) => {
	if(err) throw err
})
