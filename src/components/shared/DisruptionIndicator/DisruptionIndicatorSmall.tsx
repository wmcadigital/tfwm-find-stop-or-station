import Icon from 'components/shared/Icon/Icon';

type DisruptionIndicatorSmallProps = {
  className?: string;
  iconLeft: string;
  severity?: 'high' | 'veryHigh' | 'Major';
  text?: string;
};

const DisruptionIndicatorSmall = ({
  className,
  iconLeft,
  severity,
  text,
}: DisruptionIndicatorSmallProps) => {
  let iconRightName;
  let disruptedClass;
  let disruptionText;
  // Removed the if statement - Icon now showing.
  // Do a switch on the disruption severity, then map the type and iconRightName to the correct vars
  switch (severity) {
    // Severe disruption (veryHigh)
    case 'veryHigh':
      iconRightName = 'warning-triangle';
      disruptedClass = 'severe';
      disruptionText = 'Severe';
      break;
    // Major disruption (high)
    case 'high':
    case 'Major':
      iconRightName = 'warning-triangle';
      disruptedClass = 'error';
      disruptionText = 'Major';
      break;
    // Minor disruption (normal)
    default:
      iconRightName = 'warning-circle';
      disruptedClass = 'warning';
      disruptionText = 'Minor';
      break;
  }

  return (
    <span
      className={`wmnds-disruption-indicator-small ${
        disruptedClass ? `wmnds-disruption-indicator-small--${disruptedClass}` : ''
      } ${className}`}
    >
      <span className="wmnds-screenreaders-only">{disruptionText} disruption</span>
      <Icon iconName={iconLeft} className="wmnds-disruption-indicator-small__icon" />
      {text && <strong>{text}</strong>}
      <Icon
        iconName={`general-${iconRightName}`}
        className="wmnds-disruption-indicator-small__icon"
      />
    </span>
  );
};

export default DisruptionIndicatorSmall;
