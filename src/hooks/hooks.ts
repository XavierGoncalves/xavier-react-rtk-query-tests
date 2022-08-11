import { useState, useEffect } from 'react'
import { useHttpClient } from 'titanium/common/context/http.context';

export function useCurrentUser() {
  const httpClient = useHttpClient()
  const [user, setUser] = useState()

  useEffect(() => {
    async function updateUser() {
        const { data } = await httpClient.get('users/me');
        setUser(data);
    }

    updateUser();
  }, [httpClient]);

  return user
}
