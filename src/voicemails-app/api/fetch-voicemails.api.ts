import getRequestParams from "voicemails-app/utils/get-request-params"
import paramsSerializer from 'voicemails-app/utils/params-serializer'
import get from 'lodash/get'
import fetchContactsByIdApi from "./fetch-contacts-by-id"
import { Voicemail } from "types";

interface Ouput {
  voicemails: Voicemail[];
  totalCount: number;
  totalPages: number;
  lastUpdated: string;
}


const fetchVoicemailsApi = async ({
  page,
  voicemailStatus,
  contactId,
  when,
  duration,
  ringGroups,
  assignedTo,
  http
}): Promise<Ouput> => {

  /* 
    default param values
    page = 1
    status = all
    contact = undefined
    when = {value: all, customrange: {start: null, end: null} }
    duration = { min: null, max: null, unit: "MINUTES" }
    ringGroups = []
    se a url for "/" vem populado
    assigned = 6037b7ca1a3e5369c2dc59a2
    se a url for "/all" vem assim
    assigned = {id: ALL, name: null}
  */

  const teste = getRequestParams({
    page,
    voicemailStatus,
    contactId,
    when,
    duration,
    ringGroups,
    assignedTo,
  })

  // default 
  // created_at[gte]: null
  // duration[gte]: null
  // duration[lte]: null
  // order_by: "-date"
  // page: 1
  // per_page: 10
  // user_id: "6037b7ca1a3e5369c2dc59a2"
 debugger
  const response = await http.get('voicemails', {
    params: teste,
    headers: {
      Accept: 'application/hal+json'
    },
    paramsSerializer
  })

  const { total, per_page } = response.data
  const voicemailsRaw = get(response, 'data._embedded.voicemails', [])

  const voicemails = await hydrateWithContacts(voicemailsRaw, http)
  // ?page=1&per_page=10&order_by=-date
  return {
    voicemails: voicemails,
    totalCount: total,
    totalPages: Math.ceil(total / per_page),
    lastUpdated: new Date().toISOString()
  }
}

const hydrateWithContacts = async (voicemails, http) => {
  let contactsById
  const contactIds = voicemails.map(({ contactId }) => contactId)

  try {
    contactsById = await fetchContactsByIdApi({ contactIds, http })
  } catch (e) {
    contactsById = {}
  }

  return voicemails.map(voicemail => {
    const contactById = contactsById[voicemail.contactId]
    const contact = contactById
      ? {
        ...contactById,
        name:
          contactById.name === voicemail.contactPhoneNumber
            ? null
            : contactById.name
      }
      : {
        deleted: true,
        id: null,
        name: null,
        initials: null
      }

    return {
      ...voicemail,
      contact
    }
  })

}

export default fetchVoicemailsApi
