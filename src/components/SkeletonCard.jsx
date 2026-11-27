const SkeletonCard = () => {
  return (
    <div className="card-ak overflow-hidden h-100">
      <div className="skel" style={{ paddingBottom: '66.667%' }} />
      <div className="p-4">
        <div className="skel mb-3" style={{ height: '14px', width: '40%' }} />
        <div className="skel mb-2" style={{ height: '22px', width: '75%' }} />
        <div className="skel mb-2" style={{ height: '14px', width: '100%' }} />
        <div className="skel" style={{ height: '14px', width: '65%' }} />
      </div>
    </div>
  );
};

export default SkeletonCard;
