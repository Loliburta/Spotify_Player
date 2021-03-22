import { useState, useEffect, useCallback } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { useAuth } from "../../utils/useAuth";
import { TrackSearchResult } from "../TrackSearchResult/TrackSearchResult";
import { Container, Form } from "react-bootstrap";
import { Player } from "../Player/Player";
import { searchTracks } from "../../utils/searchTracks";
import { debounce } from "lodash";

interface Props {
  code: string;
}
const clientId = "";
const spotifyApi = new SpotifyWebApi({
  clientId,
});
export const Dashboard: React.FC<Props> = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any>([]);
  const [playingTrack, setPlayingTrack] = useState();

  const setTrackUri = (playingTrack: any) => {
    if (playingTrack) {
      return playingTrack.uri;
    }
  };

  const chooseTrack = (track: any) => {
    setPlayingTrack(track);
  };
  const debouncedSearchTracks = useCallback(
    debounce(
      (search) => searchTracks(spotifyApi, search, setSearchResults),
      300
    ),
    []
  );
  useEffect(() => {
    if (!accessToken) {
      return;
    }
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);
  useEffect(() => {
    if (!accessToken || !search) {
      return setSearchResults([]);
    }
    setSearchResults([]);
    debouncedSearchTracks(search);
  }, [search, accessToken]);

  return (
    <Container className="dashboard test-border">
      <Form.Control
        spellCheck="false"
        autoComplete="off"
        id="form-control"
        className="navbar test-border"
        type="search"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></Form.Control>
      <div className="song-list flex-grow-1 test-border">
        {searchResults
          ? searchResults.map((track: SpotifyApi.TrackObjectFull) => (
              <TrackSearchResult
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
              />
            ))
          : null}
      </div>
      <Player accessToken={accessToken} trackUri={setTrackUri(playingTrack)} />
    </Container>
  );
};
