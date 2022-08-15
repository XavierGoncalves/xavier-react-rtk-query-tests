import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import createContact from "contacts-app/api/create-contact.api"
import deleteContact from "contacts-app/api/delete-contact.api"
import fetchContact from "contacts-app/api/fetch-contact.api"
import { Contact } from "contacts-app/api/fetch-contacts.api"
import updateContact from "contacts-app/api/update-contact.api"
import { ROOT_URL, VIEW_CONTACT_URL } from "contacts-app/constants/url.constants"
import useAppUrlParams from "contacts-app/hooks/use-search-params"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useAtlasSdk } from "titanium/common/context/atlas.context"
import { useHttpClient } from "titanium/common/context/http.context"

export const useGetContact = () => {
    const http = useHttpClient()
    const { contactId } = useAppUrlParams()
    return useQuery(['contact', { contactId }], () => fetchContact(
        contactId,
        http
    ))
}

export const useUpdateContact = () => {
    const http = useHttpClient()
    const atlasSdk = useAtlasSdk()
    const [t] = useTranslation()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const mutation = useMutation(updateContact, {
        onSuccess(data: Contact) {
            //send toastr
            atlasSdk.toast.show({
                type: atlasSdk.toast.types.SUCCESS,
                title: t('notifications.update.success'),
                message: t('notifications.update.success.message'),
                dismissible: true,
                dismissDelay: atlasSdk.toast.delays.SHORT
            })
            queryClient.invalidateQueries(['contact', { contactId: data.id }])
            navigate(VIEW_CONTACT_URL.replace(':contactId', data.id))
        },
        onError(error, variables, context) {
            //send toastr
            atlasSdk.toast.show({
                type: atlasSdk.toast.types.DANGER,
                title: t('notifications.update.failed.title'),
                message: t('notifications.update.invalid'),
                dismissible: true,
                dismissDelay: atlasSdk.toast.delays.SHORT
            })
        },
    });
    return {
        ...mutation,
        updateContactSync: (contact: Contact) => mutation.mutate({ contact, http }),
        updateContactAsync: (contact: Contact) =>
            mutation.mutateAsync({ contact, http }),
    };
}

export const useCreateContact = () => {
    const http = useHttpClient()
    const atlasSdk = useAtlasSdk()
    const [t] = useTranslation()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const mutation = useMutation(createContact, {
        onSuccess() {
            //send toastr
            atlasSdk.toast.show({
                type: atlasSdk.toast.types.SUCCESS,
                title: t('notifications.create.success'),
                message: t('notifications.create.success.message'),
                dismissible: true,
                dismissDelay: atlasSdk.toast.delays.SHORT
            })
            queryClient.invalidateQueries(['contacts', 'list'])
            navigate(ROOT_URL)
        },
        onError() {
            //send toastr
            atlasSdk.toast.show({
                type: atlasSdk.toast.types.DANGER,
                title: t('notifications.create.failed.title'),
                message: t('notifications.create.failed.message'),
                dismissible: true,
                dismissDelay: atlasSdk.toast.delays.SHORT
            })
        },
    });
    return {
        ...mutation,
        createContactSync: (contact: Contact) => mutation.mutate({ contact, http }),
        createContactAsync: (contact: Contact) =>
            mutation.mutateAsync({ contact, http }),
    };
}

export const useDeleteContact = () => {
    const http = useHttpClient()
    const atlasSdk = useAtlasSdk()
    const [t] = useTranslation()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const mutation = useMutation(deleteContact, {
        onSuccess() {
            //send toastr
            atlasSdk.toast.show({
                type: atlasSdk.toast.types.SUCCESS,
                title: t('notifications.delete.success'),
                message: t('notifications.delete.success.message'),
                dismissible: true,
                dismissDelay: atlasSdk.toast.delays.SHORT
            })
            queryClient.invalidateQueries(['contacts', 'list'])
            navigate(ROOT_URL)
        },
        onError() {
            //send toastr
            atlasSdk.toast.show({
                type: atlasSdk.toast.types.DANGER,
                title: t('notifications.delete.failed.title'),
                message: t('notifications.delete.failed.message'),
                dismissible: true,
                dismissDelay: atlasSdk.toast.delays.SHORT
            })
        },
    });
    return {
        ...mutation,
        deleteContactSync: (contactId: string) => mutation.mutate({ contactId, http }),
        deleteContactAsync: (contactId: string) =>
            mutation.mutateAsync({ contactId, http }),
    };
}

