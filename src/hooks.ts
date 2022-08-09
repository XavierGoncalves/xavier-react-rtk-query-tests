import { useState, useEffect } from 'react'
import HttpClient from './titanium/common/http.client';

export function useCurrentUser() {
  const [user, setUser] = useState()

  useEffect(() => {
    async function updateUser() {
        const { data } = await HttpClient.getInstance().get('users/me');
        setUser(data);
    }

    updateUser();
  }, []);

  return user
}
