import tokenGenerator from "./token.generator";

export const createToken = (atlasSdk, scopes) => tokenGenerator.initialize(
    () => atlasSdk.authorization.getAccessToken({ scopes })
);
