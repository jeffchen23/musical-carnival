import { database } from '../database.js';

export const postActors = (req, res)=> {
    // TODO
    let actorDocument = {
        name: req.body.actorName,
      }
    
      database.collection('Actors').insertOne(actorDocument)
      .then(() => {
        res.send(`<h1>Success: Actor Inserted</h1>
                  <a href='https://musical-carnival-p7pgrw6766rh69r5-3000.app.github.dev/'>Back</a>`)
        })
      .catch(e => {
        console.dir(e, {depth: null})
        res.send(`<h1>Erorr: Actor Insert Failed</h1>
          <a href='https://musical-carnival-p7pgrw6766rh69r5-3000.app.github.dev/'>Back</a>`)
      })

}