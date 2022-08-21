import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHttpClient } from "titanium/common/context/http.context";
import updateVoicemailApi from "voicemails-app/api/update-voicemail.api";

interface UpdateVoicemailInput {
    voicemailId: string;
    contactId?: string;
    userId?: string;
    voicemailStatus?: string;
}

const useUpdateVoicemailMutation = () => {
    const queryClient = useQueryClient()
    const http = useHttpClient()
    const mutation = useMutation(updateVoicemailApi, {
        onSuccess: () => {
            queryClient.invalidateQueries(["voicemails", "list"]);
            queryClient.invalidateQueries(["assignedUsers", "list"]);
        },
    });
    return {
        ...mutation,
        updateVoicemailSync: ({ voicemailId, contactId, voicemailStatus, userId }: UpdateVoicemailInput) => mutation.mutate({ voicemailId, contactId, voicemailStatus, userId, http }),
        updateVoicemailAsync: ({ voicemailId, contactId, voicemailStatus, userId }: UpdateVoicemailInput) => mutation.mutateAsync({ voicemailId, contactId, voicemailStatus, userId, http })
        // mutation.mutateAsync(playerId, { onSuccess }),
    };
};

export default useUpdateVoicemailMutation
