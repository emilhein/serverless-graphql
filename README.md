# Use the api

Do an 
```js
npm install
npm start
```

Examples:
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