import { Link } from 'react-router-dom';
import Icon from 'components/shared/Icon/Icon';
import s from './ErrorPage.module.scss';

function ErrorPage({ type }: { type?: string }) {
  return (
    <div>
      <h1>Stop unavailable</h1>
      <div className="wmnds-col-md-2-3 wmnds-bg-white wmnds-p-lg">
        <div className={`wmnds-grid wmnds-grid--spacing-2-md ${s.nowrap}`}>
          <div className="wmnds-col-auto">
            <Icon iconName="general-warning-circle" className={s.icon} />
          </div>
          <div className="wmnds-col-auto">
            <p className="wmnds-m-b-none">
              It appears that this {type || 'stop'} doesn&rsquo;t exist or is currently unavailable.
              Please try again later or <Link to="/">search for another {type || 'stop'}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
