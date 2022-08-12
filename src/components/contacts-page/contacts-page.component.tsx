import { AppHeader } from "components/app/App"
import useContacts, { useContact } from "react-query/contacts"

const ContactsPage = () => {
    const {data} = useContacts()
    console.log('contacts result -', data)
    return (<div>
        <AppHeader />
        ContactsPage
        <div>
            {JSON.stringify(data)}    
        </div>
        <Teste />
    </div>)
}

const Teste = () => {
    const data = useContact("61d60793d782fd001df203ef")
    return (
        <div>
            Contact Single
            {JSON.stringify(data)}
        </div>
    )
}

export default ContactsPage
