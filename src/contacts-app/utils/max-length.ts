import { TEXT_INPUT_MAX_LENGTH } from "contacts-app/components/contact-form/ContactForm"

const maxLength = (message: string) => ({
    maxLength: {
        value: TEXT_INPUT_MAX_LENGTH,
        message
    }
})
export default maxLength
