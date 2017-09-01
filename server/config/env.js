// LOCAL DEV VARIABLES
let env = {
	NODE_ENV: 'development',
	PORT: process.$env.port || 3000,
	DBPROTOCOL: 'mongodb',
	DBUSERNAME: 'student',
	DBPASSWORD: 'student',
	DBHOST: 'ds064198.mlab.com:64198',
	DBNAME: 'kanban',
	SERVERNAME: 'dev-server'
}

// mongodb://<dbuser>:<dbpassword>@ds064198.mlab.com:64198/kanban

// MAPS env TO ACTUAL ENVIRONMENT
Object.keys(env).forEach(v => {
	process.env[v] = process.env[v] || env[v]
})


// MongoDb Connection String Builder
env.CONNECTIONSTRING = `${env.DBPROTOCOL}://${env.DBUSERNAME}:${env.DBPASSWORD}@${env.DBHOST}/${env.DBNAME}`
process.env.CONNECTIONSTRING = env.CONNECTIONSTRING

exports = env