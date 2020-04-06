import { useState, useEffect } from 'react';


export default () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userNode = document.querySelector('.js-user');

    let userData = {
      id: 0,
      email: null,
    };

    if (userNode && userNode.dataset.user) {
      userData = JSON.parse(userNode.dataset.user);
    }

    setUserData(userData);

  }, []);

  return [userData, setUserData];
}
