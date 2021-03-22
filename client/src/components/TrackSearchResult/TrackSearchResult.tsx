interface Props {
  track: any;
  chooseTrack(track: any): any;
}
export const TrackSearchResult: React.FC<Props> = ({ track, chooseTrack }) => {
  const handlePlay = () => {
    chooseTrack(track);
  };
  return (
    <div className="track">
      <img
        src={track.albumUrl}
        className="track__image"
        onClick={handlePlay}
      ></img>
      <div className="track__details">
        <div className="track__details__title">{track.title}</div>
        <div className="track__details__artist">{track.artist}</div>
      </div>
    </div>
  );
};
