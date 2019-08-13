import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'

import { subscribe, unsubscribe, read } from './redux/actions';

const Page = styled.div`
  height: 100vh;
  background-color: #101010;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5% 12%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
`;

const Label = styled.div`
  font-size: 32px;
  color: #D0D0D0;
`;

const Status = styled.div`
  font-size: 14px;
  color: #D0D0D0;
`;

const Notification = styled.div`
  margin-bottom: 12px;
  padding: 12px;
  color: #D0D0D0;
  background-color: rgba(255,255,255,0.05);
  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    background-color: rgba(255,255,255,0.06);
    box-shadow: 5px 5px 20px 0px rgba(0,0,0,0.75);
  }
`;

const Title = styled.div`
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: bold;
  color: #D0D0D0;
`;

const Message = styled.div`
  font-size: 14px;
  color: #D0D0D0;
`;

const Footer = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #D0D0D0;
`;

const mapStateToProps = (state) => {
  return {
    subscribed: state.subscribed,
    notifications: state.notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    subscribe: () => dispatch(subscribe()),
    unsubscribe: () => dispatch(unsubscribe()),
    read: (notification) => dispatch(read(notification)),
  };
};

class App extends Component {
  componentDidMount() {
    this.props.subscribe();
  }

  componentWillUnmount() {
    this.props.unsubscribe();
  }

  readNotification = (notification) => {
    this.props.read(notification);
  }

  render() {
    const { notifications, subscribed } = this.props;

    return (
      <Page>
        <Container>
          <Header>
            <Label>Notifications</Label>
            <Status>{ subscribed ? 'CONNECTED' : 'DISCONNECTED' }</Status>
          </Header>
          {
            notifications.slice(0, 5).map((notification) => (
              <Notification key={notification.uuid} onClick={() => this.readNotification(notification)}>
                <Title>{notification.title}</Title>
                <Message>{notification.message}</Message>
              </Notification>
            ))
          }
          { notifications.length > 5 && (<Footer>{`${notifications.length - 5} more...`}</Footer>) }
          { notifications.length === 0 && (<Footer>You have no notifications...</Footer>) }
        </Container>
      </Page>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);