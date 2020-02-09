const postgresDBLocal = {
	user: 'postgres',
	host: 'localhost',
	database: 'sofia_new_fennix_dev',
	password: 'postgres',
	port: 5432,
};

const postgresDBDev = {
	user: 'postgres',
	host: '45.25.128.244',
	database: 'dvignite_dev',
	password: 'DvPGSQL12',
	port: 5432,
	max: 1000,
};
const postgresSofiaDev = {
	user: 'postgres',
	host: '45.25.128.244',
	database: 'dvignite_dev',
	password: 'DvPGSQL12',
	port: 5432,
	max: 1000,
};

const TCPBeneficiaryPORT = '3100';
const TCPELockPORT = '3150';
const SocketLocPORT = '3180';

module.exports = {
	postgresDBLocal,
	postgresDBDev,
	postgresSofiaDev,
	SocketLocPORT,
	TCPBeneficiaryPORT,
	TCPELockPORT,
};
