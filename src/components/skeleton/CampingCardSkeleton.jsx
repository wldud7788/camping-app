export const CampingCardSkeleton = () => {
  return (
    <div className="camping_card">
      <div>
        <div className="camping_imgbox"></div>
        <div className="camping_info">
          <h2 className="skeleton_name"></h2>
          <p className="skeleton_addr"></p>
          <p className="skeleton_intro"></p>
          <span className="induty"></span>
        </div>
      </div>
    </div>
  );
};
