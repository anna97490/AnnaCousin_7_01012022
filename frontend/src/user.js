import instance from 'axios';

let user = localStorage.getItem('user');

if (!user) {
  user = {
    id: -1,
    token: '',
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    };
  }
}

export default user;
