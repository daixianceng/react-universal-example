import 'dotenv/config';
import run from './run';

run(require('./runServer.js').default).catch(err => {
  console.error(err.stack);
  process.exit(1);
});
