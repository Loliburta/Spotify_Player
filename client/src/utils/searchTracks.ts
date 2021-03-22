import SpotifyWebApi from "spotify-web-api-node";

const smallestAlbumImage = (track: SpotifyApi.TrackObjectFull) => {
  return track.album.images.reduce((smallest, image) => {
    if (image.height! < smallest.height!) return image;
    return smallest;
  }, track.album.images[0]);
};

const mapSearchResults = (res: { body: any }) => {
  return res.body.tracks.items.map((track: SpotifyApi.TrackObjectFull) => {
    return {
      artist: track.artists[0].name,
      title: track.name,
      uri: track.uri,
      albumUrl: smallestAlbumImage(track).url,
    };
  });
};

export const searchTracks = (
  spotifyApi: SpotifyWebApi,
  search: string,
  setSearchResults: any
) => {
  spotifyApi.searchTracks(search).then((res) => {
    setSearchResults(mapSearchResults(res));
  });
};
