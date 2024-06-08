# API: Rick and Morty Character 

## Contents

1. [Install](#install)
2. [Migrations](#migrations)
2. [Start](#start)
3. [Test](#test)


## Folder structure
```
src/
│
├── graphql/
│   ├── resolvers/
│   │   ├── rickAndMortyResolver.ts
│   │   └── index.ts
│   ├── types/
│   │   ├── index.ts
│   │   └── rickAndMorty.ts
│
├── services/
│   └── rickAndMortyService.ts
├── packages.json
└── readme.md
```


## Install

To install run this command ```npm install```

## Migrations
Usa Sequelize CLI para crear una migración y un archivo de semilla.

```sequelize migration:create --name create-character-table```
```sequelize seed:create --name initial-characters```

```sequelize db:migrate```
```sequelize db:seed:all```


## Start 

To start run this command ```npm start```

## Test 

To run test use this command `npm test`
To run coverage test use this command `npm run test:coverage`

To open coverage file that content `open coverage/lcov-report/index.html`



## Description

The candidate must develop an API that allows performing searches for Rick
and Morty characters, using the Rick and Morty (see link at the end of the
presentation) public API implementing graphql. The API must be able to cache
search results to improve performance. The characters must also be able to be
stored in a relational database.

## Requirements
1. ✅ Create an API using Express and GraphQL that allows searching for Rick and Morty characters.

2. ✅ Create query that allows filtering of characters by:
    ○ Status
        ```
        query Characters($gender: String) {
            characters(gender: $gender) {
                name
                status
                gender
                origin {
                name
                }
            }
        }

        {
           "gender": "female"
        }
        ```

    ○ Species
    ○ Gender
    ○ Name
    ○ Origin


3. ✅ Connect the API to a relational database, using the ORM sequelize (see link at the end of the presentation) and the database setup has to be done by migrations (e.g. MySQL or PostgreSQL) to store the character information.
4. ✅ Implement connection to Redis to cache search results and improve performance.
5. 🔲 Do an initial relational database population with 15 of the Rick and Morty api characters.
6. ✅ Make a middleware that prints by console the information that you consider relevant for each request.

7. 🔲 (Optional) Make a cron job that runs every 12 hours and updates the database characters if there is any change in that character.

8. ✅ (Optional) Implement a method decorator that prints via console the time it takes to execute the query.
9. (Optional) Implement unit tests to the character search query.
10. ✅ (Optional) Use TypeScript for the development of the project.
11. ✅ (Optional) Apply software design patterns.


## Deliverables

1. ✅ Project source code in a Git repository (can be GitHub).
2. ERD diagram of the database
3. ✅ (Optional) Swagger documentation for api consumption.
4. 🔲 Documentation explaining how to run the application and how to use the API (can be a README file in the repository or a Wiki in the same repository).


## Evaluation criteria 

1. Compliance with requirements.
2. Code quality (structure, readability, comments, etc.).
3. Appropriate use of the mentioned technologies.