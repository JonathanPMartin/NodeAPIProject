
import test from 'ava'
import Accounts from '../modules/accounts.js'
import Files from '../modules/files.js'
const dbName ='website.db'
test('REGISTER : register and log in with a valid account', async test => {
	test.plan(1)
	const account = await new Accounts() // no database specified so runs in-memory
	try {
		await account.register('doej', 'password', 'doej@gmail.com')
	  const login = await account.login('doej', 'password')
		test.is(login, true, 'unable to log in')
	} catch(err) {
		test.fail('error thrown')
	} finally {
		account.close()
	}
})

test('REGISTER : register a duplicate username', async test => {
	test.plan(1)
	const account = await new Accounts()
	try {
		await account.register('doej', 'password', 'doej@gmail.com')
		await account.register('doej', 'password', 'doej@gmail.com')
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'username "doej" already in use', 'incorrect error message')
	} finally {
		account.close()
	}
})

test('REGISTER : error if blank username', async test => {
	test.plan(1)
	const account = await new Accounts()
	try {
		await account.register('', 'password', 'doej@gmail.com')
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'missing field', 'incorrect error message')
	} finally {
		account.close()
	}
})

test('REGISTER : error if blank password', async test => {
	test.plan(1)
	const account = await new Accounts()
	try {
		await account.register('doej', '', 'doej@gmail.com')
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'missing field', 'incorrect error message')
	} finally {
		account.close()
	}
})

test('REGISTER : error if blank email', async test => {
	test.plan(1)
	const account = await new Accounts()
	try {
		await account.register('doej', 'password', '')
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'missing field', 'incorrect error message')
	} finally {
		account.close()
	}
})

test('REGISTER : error if duplicate email', async test => {
	test.plan(1)
	const account = await new Accounts()
	try {
		await account.register('doej', 'password', 'doej@gmail.com')
		await account.register('bloggsj', 'newpassword', 'doej@gmail.com')
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'email address "doej@gmail.com" is already in use', 'incorrect error message')
	} finally {
		account.close()
	}
})

test('LOGIN    : invalid username', async test => {
	test.plan(1)
	const account = await new Accounts()
	try {
		await account.register('doej', 'password', 'doej@gmail.com')
		await account.login('roej', 'password')
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'username "roej" not found', 'incorrect error message')
	} finally {
		account.close()
	}
})

test('LOGIN    : invalid password', async test => {
	test.plan(1)
	const account = await new Accounts()
	try {
		await account.register('doej', 'password', 'doej@gmail.com')
		await account.login('doej', 'bad')
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'invalid password for account "doej"', 'incorrect error message')
	} finally {
		account.close()
	}
})
test('ALL :error if invald  userid given', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	try {
		await files.all(1)

		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'expected string for userid not number')
	} finally {
		files.close()
	}
})
test('ALL :error if no userid given', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	try {
		await files.all()

		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'expected string for userid not undefined')
	} finally {
		files.close()
	}
})
test('ADD :error if no data given', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	try {
		await files.add()

		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message,'Cannot read property \'uid\' of undefined')
	} finally {
		files.close()
	}
})
test('ADD :error if invald data type given for uid', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	const data={
		uid: 2,
		uploadname: 'steve',
		filetype: '.txt',
		file: 'dumbyfile.txt',
		filesize: '1000',
		des: ' dumby description of a non existent file'
	}
	try {
		await files.add(data)

		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message,'string is expected for uid not number')
	} finally {
		files.close()
	}
})
test('ADD :error if invald data type given for uploadname', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	const data={
		uid: '2',
		uploadname: null,
		filetype: '.txt',
		file: 'dumbyfile.txt',
		filesize: '1000',
		des: ' dumby description of a non existent file'
	}
	try {
		await files.add(data)

		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message,'string is expected for uploadname not object')
	} finally {
		files.close()
	}
})
test('ADD :error if invald data type given for filetype', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	const data={
		uid: '2',
		uploadname: 'dumby upload',
		filetype: null,
		file: 'dumbyfile.txt',
		filesize: '1000',
		des: ' dumby description of a non existent file'
	}
	try {
		await files.add(data)

		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message,'string is expected for filetype not object')
	} finally {
		files.close()
	}
})
test('ADD :error if invald data type given for file', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	const data={
		uid: '2',
		uploadname: 'dumby upload',
		filetype: '.txt',
		file: null,
		filesize: '1000',
		des: ' dumby description of a non existent file'
	}
	try {
		await files.add(data)

		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message,'string is expected for file not object')
	} finally {
		files.close()
	}
})
test('ADD :error if invald data type given for filesize', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	const data={
		uid: '2',
		uploadname: 'dumby upload',
		filetype: '.txt',
		file: 'dumbyfile.txt',
		filesize: null,
		des: ' dumby description of a non existent file'
	}
	try {
		await files.add(data)

		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message,'string is expected for filesize not object')
	} finally {
		files.close()
	}
})
test('ADD :error if invald data type given for des', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	const data={
		uid: '2',
		uploadname: 'dumby upload',
		filetype: '.txt',
		file: 'dumbyfile.txt',
		filesize: '1000',
		des: null
	}
	try {
		await files.add(data)

		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message,'string is expected for des not object')
	} finally {
		files.close()
	}
})
test('ADD :error if ino data is given for des', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	const data={
		uid: '2',
		uploadname: 'dumby upload',
		filetype: '.txt',
		file: 'dumbyfile.txt',
		filesize: '1000',

	}
	try {
		await files.add(data)

		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message,'string is expected for des not undefined')
	} finally {
		files.close()
	}
})
test('ADD :error if ino data is given for filesize', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	const data={
		uid: '2',
		uploadname: 'dumby upload',
		filetype: '.txt',
		file: 'dumbyfile.txt',
		des: ' dumby description of a non existent file'
	}
	try {
		await files.add(data)

		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message,'string is expected for filesize not undefined')
	} finally {
		files.close()
	}
})
test('ADD :error if ino data is given for file', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	const data={
		uid: '2',
		uploadname: 'dumby upload',
		filetype: '.txt',
		filesize: '1000',
		des: ' dumby description of a non existent file'
	}
	try {
		await files.add(data)

		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message,'string is expected for file not undefined')
	} finally {
		files.close()
	}
})
test('ADD :error if ino data is given for filetype', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	const data={
		uid: '2',
		uploadname: 'dumby upload',
		file: 'dumbyfile.txt',
		filesize: '1000',
		des: ' dumby description of a non existent file'
	}
	try {
		await files.add(data)

		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message,'string is expected for filetype not undefined')
	} finally {
		files.close()
	}
})
test('ADD :error if ino data is given for uploadname', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	const data={
		uid: '2',
		filetype: '.txt',
		file: 'dumbyfile.txt',
		filesize: '1000',
		des: ' dumby description of a non existent file'
	}
	try {
		await files.add(data)

		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message,'string is expected for uploadname not undefined')
	} finally {
		files.close()
	}
})
test('ADD :error if ino data is given for uid', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	const data={
		uploadname: 'dumby upload',
		filetype: '.txt',
		file: 'dumbyfile.txt',
		filesize: '1000',
		des: ' dumby description of a non existent file'
	}
	try {
		await files.add(data)

		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message,'string is expected for uid not undefined')
	} finally {
		files.close()
	}
})
test('DELETE:  error if no id given', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	try {
		await files.delete()
		test.fail('error not thrown')
	}catch(err) {
		test.is(err.message,'type of id is expected to be string not undefined')
	}finally{
		files.close()
	}
})
test('DELETE: error if int id given', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	try {
		await files.delete(1)
		test.fail('error not thrown')
	}catch(err) {
		test.is(err.message,'type of id is expected to be string not number')
	}finally{
		files.close()
	}
})
test('ROW: error if no id given', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	try {
		await files.row()
		test.fail('error not thrown')
	}catch(err) {
		test.is(err.message,'type of id is expected to be string not undefined')
	}finally{
		files.close()
	}
})
test('ROW: error if int id given', async test => {
	test.plan(1)
	const files= await new Files(dbName)
	try {
		await files.row(1)
		test.fail('error not thrown')
	}catch(err) {
		test.is(err.message,'type of id is expected to be string not number')
	}finally{
		files.close()
	}
})
