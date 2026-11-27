const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="card-ak p-4 p-md-5 h-100">
      <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-primary)', marginBottom: '20px' }}>
        "{testimonial.text}"
      </p>
      <div className="d-flex align-items-center gap-3">
        {testimonial.imageUrl && (
          <img
            src={testimonial.imageUrl}
            alt={testimonial.name}
            width="44"
            height="44"
            style={{ borderRadius: '50%', objectFit: 'cover' }}
            loading="lazy"
          />
        )}
        <div>
          <div style={{ fontWeight: 600, fontSize: '15px' }}>{testimonial.name}</div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{testimonial.role || 'Verified Client'}</div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
