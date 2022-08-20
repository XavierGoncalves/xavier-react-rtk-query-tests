import get from 'lodash/get'

const fetchPhones = async ({ page = 0, perPage = 10, http }) => {
  const response = await http.get('numbers', {
    params: {
      page,
      per_page: perPage
    }
  })

  const phones = get(response, 'data._embedded.phone_numbers', []).map(
    presentPhone
  )
  const totalPhones = get(response, 'data.total')

  return { data: phones, total: totalPhones }
}

const presentPhone = phone => ({
  id: phone.id,
  number: phone.phone_number,
  name: phone.friendly_name
})

export default fetchPhones
