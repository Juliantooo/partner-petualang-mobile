import { Toast } from "native-base";

const notificationColor = {
  success: '#10b981',
  error: '#ef4444',
  warning: '#fdba74'
}


const notification = {
  success: (message, duration = 1000) => {
    Toast.show({
      description: message,
      duration,
      placement: 'bottom',
      style: {
        backgroundColor: notificationColor['success'],
        elevation: 500,
        color: '#fff',
        marginBottom: 15,
      },
      fontSize: 10
    });
  },
  error: (message, duration = 1000) => {
    Toast.show({
      description: message,
      duration,
      placement: 'bottom',
      style: {
        backgroundColor: notificationColor['error'],
        elevation: 500,
        color: '#fff',
        marginBottom: 15,
      },
      fontSize: 10
    });
  },
}

export default notification