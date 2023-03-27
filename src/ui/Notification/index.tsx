import React, {useRef} from 'react';
import './index.scss';
import styled from "styled-components";
interface NotificationProps {
  shouldDisplay: boolean,
  icon?: React.ReactNode,
  title: string,
  subtitle?: string,
  type: 'error' | 'default'
}

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 14px;
  margin-bottom: 10px;
  font-weight: 600;
`

const Notification = (props: NotificationProps) => {
  const {icon, subtitle, title, shouldDisplay, type} = props;
  return (
    <div
      className={`notification ${shouldDisplay ? "shown" : ""}`}
      style={{borderTop: `7px solid ${type === 'error' ? '#fd3566' : '#20D083FF'}`}}
    >
      <TitleWrapper>
        {icon}
        <div className={"notification-title"}>
          {title}
        </div>
      </TitleWrapper>
      <div className={"notification-body"}>
        {subtitle}
      </div>
    </div>
  );
};

export default Notification;