const setupCollections = database => {

    let showCollection = database.createCollection('Shows',{ validator: {
        $jsonSchema: {
            // TODO: validation schema for show documents
            bsonType: 'object',
            required: ['title', 'numberOfSeasons', 'firstEpisodeYear', 'topActors'],
            properties: {
                title: {
                    bsonType: 'string',
                    minLength: 2,
                    maxLength: 30,
                    description: "must be a string between 2 and 30 characters"
                },
                numberOfSeasons: {
                    bsonType: 'int',
                    minimum: 1,
                    description: 'must be an integer greater than or equal to 1'
                },
                firstEpisodeYear: {
                    bsonType: 'int',
                    minimum: 1900,
                    maximum: 2100,
                    description: 'must be an integer between 1900 and 2100'
                },
                topActors: {
                    bsonType: 'array',
                    items: {
                        bsonType: 'object',
                        required: ['actor_id'],
                        properties: {
                            actor_id: {
                                bsonType: 'objectId',
                                description: 'must be a valid ObjectId referencing an actor'
                              }
                        },
                        description: 'must be a valid ObjectId referencing an actor'
                    },
                    description: 'must be an vaild array of actors object'
                },
            }
        }
    }});
    let actorCollection = database.createCollection('Actors',{ validator: {
        $jsonSchema: {
            // TODO: validation schema for actor documents
            bsonType: 'object',
            required: ['name'],
            properties: {
                name: {
                    bsonType: 'string',
                    minLength: 1,
                    maxLength: 30,
                    description: "must be a string between 1 and 30 characters"
                }
            }
        }
    }});

    return Promise.all([showCollection, actorCollection]);
}

export default setupCollections;