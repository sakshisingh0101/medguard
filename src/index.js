import dotenv from 'dotenv'
;
import {app} from './app.js'



dotenv.config({path:'./.env'})
import dbconnect from './db/index.js';
dbconnect()
.then(()=>{
  app.on('error',(error)=>{
    console.log("Error :: " ,error);
    throw error;
  })
  const port=process.env.PORT||8000
  app.listen(port,()=>{
    console.log(`The App is listening on ${port}`)
  })
})
.catch((error)=>{
    console.log('Error ',error);
})
