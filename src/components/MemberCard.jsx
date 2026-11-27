const MemberCard = ({ member }) => {
  return (
    <div className="card-ak p-4 text-center h-100">
      <div className="mx-auto mb-3" style={{ width: '112px' }}>
        <div className="img-1x1">
          <img src={member.imageUrl} alt={member.name} loading="lazy" />
        </div>
      </div>
      <h5 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: '4px' }}>
        {member.name}
      </h5>
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: 0 }}>
        {member.role}
      </p>
    </div>
  );
};

export default MemberCard;
