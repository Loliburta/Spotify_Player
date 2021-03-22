import { Container } from "react-bootstrap";
const clientId = "460e0082754a4cff92321bf34b9e05b0";
const redirectUri = "http://localhost:3000";
const scope =
  "streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;
export const Login = () => {
  return (
    <Container className="container">
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login With Spotify
      </a>
    </Container>
  );
};
