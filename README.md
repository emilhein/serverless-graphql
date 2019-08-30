##### Demo: https://w7lo1gta9h.execute-api.eu-west-1.amazonaws.com/dev/graphql

## Get started

This project uses the serverless framework and you should therefore install this globally (and setup credentials if you wish to deploy the project)

Create a file called ".env" in the root of the project and populate it with the following:

```
JWT_SECRET=SOME_RANDOM_SECRET
```

To run a local server do the following:

```js
npm install
npm run dev
```

## Examples:

```js
query {  movies {
    title
    year
    rating
    actors {
      name
      birthday
      country
      directors {
        name
        birthday
        country
      }
    }
  }
}

### NOTE
In other to use the `scoutbase_rating` field you must include a header called "authorization" with a valid jwt token ("Bearer XXXXX"), that you can recieve by calling the mutations "login" or "createUser"
query {
  movies {
    scoutbase_rating
    title
    rating
    actors {
      name
      directors {
        country
      }
    }
  }
}



mutation {
  createUser(username: "user", password: "pass") {
    token
    user {
      id
      name
    }
  }
}

mutation {
  login(username: "user", password: "pass") {
    token
    user {
      id
      name
    }
  }
}

```

## Deployment

```
npm run deploy
```
