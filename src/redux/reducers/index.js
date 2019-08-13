const initialState = {
  subscribed: false,
  notifications: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATION_STREAM_OPEN':
      return { ...state, notifications: action.notifications, subscribed: true };

    case 'NOTIFICATION_STREAM_CLOSE':
      return { ...state, subscribed: false };

    case 'NOTIFICATION_STREAM_EVENT': {
      let notifications = [...state.notifications];
      notifications.unshift(action.notification);
      return { ...state, notifications };
    }

    case 'READ_NOTIFICATION': {
      let notifications = [...state.notifications];
      const index = notifications.findIndex(n => n.uuid === action.uuid);
      if (index >= 0) {
        notifications.splice(index, 1);
      }
      return { ...state, notifications };
    }

    default:
      return state;
  }
};