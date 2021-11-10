import { useState } from 'react';
import Icon from 'components/shared/Icon/Icon';
import s from './Accordion.module.scss';

const Accordion = ({
  id,
  summary,
  children,
}: {
  id: string;
  summary: React.ReactNode;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`wmnds-accordion${isOpen ? ' wmnds-is--open' : ''}`}>
      <button
        aria-controls={id}
        className="wmnds-accordion__summary-wrapper"
        aria-expanded={isOpen}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={`${s.summary} wmnds-accordion__summary`}>{summary}</div>
        <Icon iconName="general-expand" className="wmnds-accordion__icon" />
        <Icon
          iconName="general-minimise"
          className="wmnds-accordion__icon wmnds-accordion__icon--minimise"
        />
      </button>
      <div className="wmnds-accordion__content" id={id}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
