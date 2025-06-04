import fs from 'fs';
import path from 'path';
import process from 'process';
import Sequelize from 'sequelize';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToFileURL = url.pathToFileURL;

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const configPath = path.resolve(__dirname, '../config/config.json');
const configFile = fs.readFileSync(configPath, 'utf-8');
const config = JSON.parse(configFile)[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const files = fs.readdirSync(__dirname).filter(file =>
  file.indexOf('.') !== 0 &&
  file !== basename &&
  file.slice(-3) === '.js' &&
  !file.endsWith('.test.js')
);

for (const file of files) {
  const modelPath = path.join(__dirname, file);
  // converte caminho absoluto em file:// URL
  const modelUrl = pathToFileURL(modelPath).href;
  const { default: modelDefiner } = await import(modelUrl);
  const model = modelDefiner(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
