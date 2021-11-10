import Icon from 'components/shared/Icon/Icon';

const FileDownload = ({
  text,
  title,
  classes,
  linkClasses,
  fileName,
  href,
}: {
  text: string;
  title?: string;
  classes?: string;
  linkClasses?: string;
  fileName: string;
  href: string;
}) => {
  return (
    <div className={`wmnds-file-download ${classes}`}>
      <Icon iconName="general-file" className="wmnds-file-download__icon" />
      <div className="wmnds-file-download__desc">
        <a
          href={href}
          title={title || text}
          target="_self"
          className={`wmnds-link wmnds-file-download__link ${linkClasses}`}
          download={fileName}
        >
          {text}
        </a>
      </div>
    </div>
  );
};

export default FileDownload;
