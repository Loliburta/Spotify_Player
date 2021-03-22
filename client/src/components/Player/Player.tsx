import SpotifyPlayer from "react-spotify-web-playback";

interface Props {
  accessToken: any;
  trackUri: any;
}

export const Player: React.FC<Props> = ({ accessToken, trackUri }) => {
  if (!accessToken) {
    return null;
  }
  return (
    <div className="spotify-player">
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        uris={trackUri ? [trackUri] : []}
        styles={{
          bgColor: "rgb(40, 40, 40)",
          color: "rgb(120,120,120)",
          sliderTrackColor: "rgb(120,120,120)",
          trackNameColor: "white",
          activeColor: "rgb(180,180,180)",
          sliderHeight: 8,
        }}
        initialVolume={0.5}
      />
    </div>
  );
};
