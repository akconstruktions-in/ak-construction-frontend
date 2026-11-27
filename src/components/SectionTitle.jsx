const SectionTitle = ({ title, subtitle, centered = false }) => {
  return (
    <div className={`mb-5 ${centered ? 'text-center' : ''}`}>
      {subtitle && <span className="section-label">{subtitle}</span>}
      <h2 className="section-heading">{title}</h2>
    </div>
  );
};

export default SectionTitle;
