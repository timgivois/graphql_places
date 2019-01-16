# GraphQL Places
Example repository implementing GraphQL+Yoga+Prisma to serve as a backend that retrieves and caches places from Google Places API. It has the ability to save favorite places.

## How to run the project?
### Requirements
- Node 10
- Yarn or npm
- Redis
- Prisma Database

### Installation
1. Clone the repository:
```
git clone https://github.com/timgivois/graphql_places
```
2. Install dependencies:
```
yarn
```

### Test
GraphQL Places uses Jest as framework for testing:
```
yarn jest
```

### Run
1. Before running the project, you should copy the `.env.example` to `.env` and add the required environment values:
```
cp .env.example .env
```
2. For running the project, you may use start script:
```
yarn start
```
3. Visit http://localhost:4000/ for GraphQL Playground or you can use other clients like Insomnia.

4. If it's your first time, you'll have to login with signUp mutation:
```
  mutation {
    signup(
      data: {
        email: "something+12@example.com"
        password: "qwertyqwert"
        name: "Someone cool"
      }
    ) {
      token
    }
  }
```

You'll receive a token, add in the HTTP Headers of GraphQL Playground:
```
  {
    "Authorization": "the-token"
  }
```

5. For getting places, you can use the following `getPlaces` query:
```
  query {
    getPlaces(
      location: { lat: 19.416607, lng: -99.160510 }
      query: "bar"
      sortBy: prominence
      distance: 1000
    ) {
      places {
        id
        location {
          lat
          lng
        }
        name
        distance
      }
    }
  }
```
You may see that if you run the query again in the same or a location that is close (see the `REDIS_NEAR_TRESHOLD` .env value) it will be faster.

6. For saving your favorite places, you can use the `addFavorite` mutation:
```
  mutation {
    addFavorite(placeId: "ChIJbb_ztDCuEmsRDkHndQ8nmV0") {
      place {
        id
        location {
          lat
          lng
        }
        name
      }
    }
  }
```

7. For querying your favorite places you can use the following query:
```
  query {
    getFavorites(
      sortBy: distance
      sortType: desc
      location: { lat: -33.86141, lng: 151.206455 }
    ) {
      place {
        id
        rating
        location {
          lat
          lng
        }
        distance
      }
      createdAt
    }
  }
```
Remember that some attributes maybe optional and required. In GraphQL schema required attributes are marked with `!`. In this case, you can query for favorites with a location, and sort by distance. But location is an optional argument, if you don't pass it to GraphQL you'll still be able to receive your favorites places but you won't be able to sort by distance.


As final notes, check the schema/docs in the right. You can modify the arguments of the query/mutation and check how the system will work.
