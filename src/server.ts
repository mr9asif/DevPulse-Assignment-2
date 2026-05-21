import app from './app.js';
import config from './config/index.js';
import { initDB } from './db/db.js';

app.listen(config.port, ()=>{
    initDB();
    console.log(`server running on port ${config.port}`)
})