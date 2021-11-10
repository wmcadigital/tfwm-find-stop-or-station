const Loader = ({ text, size }: { text?: string; size?: 'small' | 'large' }) => {
  return (
    <div className="wmnds-col-1">
      <div
        className={`wmnds-loader${size ? ` wmnds-loader--${size}` : ''}`}
        role="alert"
        aria-live="assertive"
      >
        <p className="wmnds-loader__content">Content is loading...</p>
      </div>
      {text && <p className="wmnds-h4 wmnds-text-align-center">{text}</p>}
    </div>
  );
};

export default Loader;
