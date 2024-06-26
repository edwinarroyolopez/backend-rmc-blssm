# API: Rick and Morty Character 

## Contents

1. [Install](#install)
2. [Env Setup](#env-setup)
3. [Migrations](#migrations)
4. [Start](#start)
5. [Test](#test)
6. [UseApi](#useapi)


## Folder structure
```
backend-rmc-blssm/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── redisClient.ts
│   ├── graphql/
│   │   ├── resolvers/
│   │   │   ├── index.ts
│   │   │   ├── characterResolver.ts
│   │   ├── types/
│   │   │   ├── index.ts
│   │   │   ├── characterType.ts
│   ├── models/
│   │   ├── Character.ts
│   ├── services/
│   │   ├── charactersService.ts
│   ├── middleware/
│   │   ├── loggingMiddleware.ts
│   ├── cron/
│   │   ├── cronJob.ts
│   ├── __tests__/
│   │   ├── charactersService.test.ts
│   ├── index.ts
├── migrations/
│   ├── 001-initial-characters.ts
├── seeders/
│   ├── 001-initial-characters.js
├── .env
├── .gitignore
├── jest.config.js
├── package.json
├── tsconfig.json
└── swaggerOptions.js
```


## Install
**Node Version:** *v18.18.2* 
To install run this command ```npm install```

## Env Setup 
1. Replace ```backend-rmc-blssm/src/config/config-example.json``` by ```backend-rmc-blssm/src/config/config.json``` and set your database configuration

1. Replace ```backend-rmc-blssm/.env-example``` by ```backend-rmc-blssm/.env``` and set your database configuration


## Migrations

To generate migrations run this command ```sequelize db:migrate```

To insert seeds run this command  ```sequelize db:seed:all```

## Start 

To start run this command ```npm start```

## Test 

To run test use this command `npm test`

To run coverage test use this command `npm run test:coverage`

To open coverage file that content `open coverage/lcov-report/index.html`

**Coverage Status:** *97.46% covered* 


## UseApi 

### Swagger API

Enter this link [Api Docs Swagger](http://localhost:3000/api-docs/)
- Queries Swagger - Filter by:
    - Status

        ```    
        {
            "query": "query Characters($status: String) {  characters(status: $status) {    id    name    status gender species origin {name} } }",
            "variables": {"status":"alive"}
        }
        ```


    - Species

        ```    
        {
            "query": "query Characters($species: String) {  characters(species: $species) {    id    name    status gender species origin {name} } }",
            "variables": {"species":"human"}
        }
        ```

    - Gender
        ```    
        {
            "query": "query Characters($gender: String) {  characters(gender: $gender) { id    name  status gender species origin {name} } }",
            "variables": {"gender":"male"}
        }
        ``` 


    - Name
        ```    
        {
            "query": "query Characters($name: String) {  characters(name: $name) { id    name  status gender species origin {name} } }",
            "variables": {"name":"Aqua Rick"}
        }
        ```

    - Origin
        ```    
        {
            "query": "query Characters($originName: String) {  characters(origin: $originName) { id    name  status gender species origin {name} } }",
            "variables": {"originName":"Earth"}
        }
        ```



## Use Api - Studio Apollo Graphql

Enter this link [Studio Apollo Graphql](http://localhost:3000/graphql), press *Query your server* 



## Description

The candidate must develop an API that allows performing searches for Rick
and Morty characters, using the Rick and Morty (see link at the end of the
presentation) public API implementing graphql. The API must be able to cache
search results to improve performance. The characters must also be able to be
stored in a relational database.

## Requirements
1. ✅ Create an API using Express and GraphQL that allows searching for Rick and Morty characters.

2. ✅ Create query that allows filtering of characters by:
    - Status
    - Species
    - Gender
    - Name
    - Origin


3. ✅ Connect the API to a relational database, using the ORM sequelize (see link at the end of the presentation) and the database setup has to be done by migrations (e.g. MySQL or PostgreSQL) to store the character information.
4. ✅ Implement connection to Redis to cache search results and improve performance.
5. ✅ Do an initial relational database population with 15 of the Rick and Morty api characters.
6. ✅ Make a middleware that prints by console the information that you consider relevant for each request.
7. ✅ (Optional) Make a cron job that runs every 12 hours and updates the database characters if there is any change in that character.
8. ✅ (Optional) Implement a method decorator that prints via console the time it takes to execute the query.
9. ✅ (Optional) Implement unit tests to the character search query.
10. ✅ (Optional) Use TypeScript for the development of the project.
11. ✅ (Optional) Apply software design patterns.


## Deliverables

1. ✅ Project source code in a Git repository (can be GitHub).
2. ✅ ERD diagram of the database
 ```
┌──────────────────────────────┐
│          Character           │
├──────────────────────────────┤
│ id        : INTEGER (PK)     │
│ name      : STRING           │
│ status    : STRING           │
│ species   : STRING           │
│ type      : STRING           │
│ gender    : STRING           │
│ origin    : JSONB            │
│ location  : JSONB            │
│ image     : STRING           │
│ episode   : ARRAY(STRING)    │
│ url       : STRING           │
│ created   : STRING           │
└──────────────────────────────┘
 ```
3. ✅ (Optional) Swagger documentation for api consumption.
4. ✅ Documentation explaining how to run the application and how to use the API (can be a README file in the repository or a Wiki in the same repository).


## Evaluation criteria 

1. Compliance with requirements.
2. Code quality (structure, readability, comments, etc.).
3. Appropriate use of the mentioned technologies.