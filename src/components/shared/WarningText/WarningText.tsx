import Icon from 'components/shared/Icon/Icon';

const WarningText = ({
  children,
  iconClasses,
  classes,
  iconName = 'general-info',
}: {
  iconName?: string;
  children: React.ReactNode;
  classes?: string;
  iconClasses?: string;
}) => {
  return (
    <div className={`wmnds-warning-text wmnds-m-b-md ${classes}`}>
      <Icon iconName={iconName} className={`wmnds-warning-text__icon ${iconClasses}`} />
      {children}
    </div>
  );
};

export default WarningText;
