const placesRequestAdapter = (request) => {
  const query = {
    keyword: request.query,
    rankby: request.sortBy
  }

  if (request.sortBy !== 'distance') {
    query.radius = request.distance
  }

  if (request.nextPageToken) {
    query.pagetoken = request.nextPageToken
  } else {
    query.location = request.location || { lat: null, lng: null }
  }

  return query
}

const placeRequestAdapter = (request) => ({
  placeId: request.placeId,
  location: request.location || { lat: null, lng: null }
})

export { placesRequestAdapter, placeRequestAdapter }
