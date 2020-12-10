import sqlite from 'sqlite-async'
class Files {
	constructor(dbName =':memory:') {
		return(async() => {
			this.db=await sqlite.open(dbName)
			const sql='CREATE TABLE IF NOT EXISTS files(\
        id INTEGER PRIMARY KEY AUTOINCREMENT,\
        userid INTEGER,\
        uploadname TEXT NOT NULL,\
        filetype TEXT NOT NULL,\
        file TEXT NOT NULL,\
        filesize TEXT NOT NULL,\
        description TEXT,\
        FOREIGN KEY(userid) REFERENCES users(id)\
      );'
			await this.db.run(sql)
			return this
		})()
	}
	async add(data) { //adds a new row to the database
		const vals=['uid','uploadname','filetype','file','filesize','des']
		for (const item in vals) {
			if (typeof data[vals[item]]!=='string') {
				throw new Error(`string is expected for ${vals[item]} not ${typeof data[vals[item]]}`)
			}
		}
		const sql=`INSERT INTO files(userid, uploadname, filetype,file,filesize,description)\
    VALUES(${data.uid}, "${data.uploadname}", "${data.filetype}", "${data.file}", "${data.filesize}", "${data.des}")`
		console.log(sql)
		await this.db.run(sql)
		return true
	}
	async all(userid) { //displays all the user uploads
		if (typeof userid==='string') {
			const sql=`SELECT users.user, files.* FROM files, users\
      WHERE files.userid = users.id AND files.userid="${userid}"`
			const files = await this.db.all(sql)
			return files
		}else{
			throw new Error(`expected string for userid not ${typeof userid}`)
		}
	}
	async delete(id) {//deletes the row of infromation where the id==id
		if (typeof id==='string') {
			const sql=`DELETE FROM files\
    WHERE files.id="${id}"`
			await this.db.run(sql)
		}else{
			throw new Error(`type of id is expected to be string not ${typeof id}`)
		}
	}
	async row(id) {//returns the details for the row id
		if (typeof id==='string') {
			const sql=`SELECT files.* FROM files\
     WHERE files.id="${id}"`
			const files = await this.db.all(sql)
			return files
		}else{
			throw new Error(`type of id is expected to be string not ${typeof id}`)
		}
	}
	async close() {//closes the database
		await this.db.close()
	}
}
export default Files
