import { database } from '../database.js';
import { ObjectId } from 'mongodb';

export const getShows = (req, res) => {
    database.collection('Shows').aggregate([
      {
        $lookup: {
          from: "Actors",
          localField: "topActors.actor_id",
          foreignField: "_id",
          as: "topActors",
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          numberOfSeasons: 1,
          firstEpisodeYear: 1,
          topActors: {
            $map: {
              input: '$topActors',
              as: 'actor',
              in: { name: '$$actor.name' },
            },
          },
        },
      },
    ]).toArray()
        .then((lol) => {
          res.json(lol);
          })
        .catch(e => {
          console.dir(e, {depth: null})
          
          res.send(`<h1>Erorr: Actor Insert Failed</h1>
            <a href='https://musical-carnival-p7pgrw6766rh69r5-3000.app.github.dev/'>Back</a>`)
        })
  }


export const postShows = (req, res)=> {
    // TODO
    let topActorsIds = typeof req.body.checkActor == 'string' ? [req.body.checkActor] : Array.isArray(req.body.checkActor) ? req.body.checkActor : [];

    let showsDocument = {
        title: req.body.title,
        numberOfSeasons: Number(req.body.seasons),
        firstEpisodeYear: Number(req.body.year),
        topActors: topActorsIds.map(ids => {return {actor_id: ObjectId.createFromHexString(ids)}})
      }
    
      database.collection('Shows').insertOne(showsDocument)
      .then(() => {
        res.send(`<h1>Success: Show Inserted</h1>
          <a href='https://musical-carnival-p7pgrw6766rh69r5-3000.app.github.dev/'>Back</a>`)
        })
      .catch(e => {
        console.dir(e, {depth: null})
        
        res.send(`<h1>Error: Show Inserted Failed</h1>
          <a href='https://musical-carnival-p7pgrw6766rh69r5-3000.app.github.dev/'>Back</a>`)
      })
  }