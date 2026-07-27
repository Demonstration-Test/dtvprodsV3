export function ViewfinderFrame() {
  return (
    <div aria-hidden="true" className="viewfinder-frame">
      <span className="viewfinder-frame__corner viewfinder-frame__corner--tl" />
      <span className="viewfinder-frame__corner viewfinder-frame__corner--tr" />
      <span className="viewfinder-frame__corner viewfinder-frame__corner--bl" />
      <span className="viewfinder-frame__corner viewfinder-frame__corner--br" />
      <span className="viewfinder-frame__focus" />
    </div>
  );
}
