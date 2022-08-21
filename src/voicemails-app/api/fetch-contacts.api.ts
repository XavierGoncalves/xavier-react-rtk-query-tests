import { stringify } from 'qs'
import get from 'lodash/get'
import pick from 'lodash/pick'
import omitBy from 'lodash/omitBy'
import isNil from 'lodash/isNil'
import { AxiosInstance } from 'axios'
import { perPage } from 'contacts-app/constants/constants'
import { VoicemailUseContact } from 'types'

interface FetchContactsApiInput {
  http: AxiosInstance;
  searchQuery: string | null;
}

interface FetchContactsApiOutput {
  contacts: VoicemailUseContact[]
  total: number;
}

export const fetchContactsApi = async ({
  http,
  searchQuery
}: FetchContactsApiInput): Promise<FetchContactsApiOutput> => {
  const query = {
    page: 1,
    per_page: 20,
    sort: "name",
    'name.loose': searchQuery
  }

  const result = await http.get(
    `/callbar/contacts?${stringify(omitBy(query, isNil))}`
  )

  const contacts = get(result, 'data._embedded.contacts', []).map(
    presentContact
  )
  const total = get(result, 'data.matched', 0)

  return { contacts, total }
}

interface FetchContactApiInput {
  id: string;
  http: AxiosInstance;
}

export const fetchContactApi = async ({ id, http }: FetchContactApiInput): Promise<VoicemailUseContact | undefined> => {
  const result = await http.get(`/callbar/contacts/${id}`)

  const contact = presentContact(get(result, 'data.contact'))

  return contact
}

const presentContact = contact => ({
  ...pick(contact, ['id', 'name']),
  phones: get(contact, 'phones', []).map(phone => phone.number)
})
