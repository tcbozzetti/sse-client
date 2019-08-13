import axios from 'axios';

let source;

export function subscribe() {
  return async (dispatch) => {
    const listeners = {
      recent: ({ data }) => {
        const notifications = JSON.parse(data);
        dispatch({ type: 'NOTIFICATION_STREAM_OPEN', notifications });
      },
      notification: ({ data }) => {
        const notification = JSON.parse(data);
        dispatch({ type: 'NOTIFICATION_STREAM_EVENT', notification });
      },
    };

    if (source) {
      source.close();
    }
    source = new EventSource(`http://localhost:3001/subscribe?userId=1`);

    const keys = Object.keys(listeners);
    for (let i = 0; i < keys.length; i += 1) {
      source.addEventListener(keys[i], listeners[keys[i]], false);
    }

    source.onerror = () => {
      dispatch({ type: 'NOTIFICATION_STREAM_CLOSE' });
    };
  };
}

export function read(notification) {
  return (dispatch) => {
    dispatch({
      type: 'READ_NOTIFICATION',
      uuid: notification.uuid,
    });

    axios(`http://localhost:3001/read?uuid=${notification.uuid}&timestamp=${notification.timestamp}`, {
      method: 'POST',
    });
  };
}

export function unsubscribe() {
  return async (dispatch) => {
    if (source) {
      source.close();
      dispatch({ type: 'NOTIFICATION_STREAM_CLOSE' });
    }
  };
}