import firebase from "firebase";
import {SavedPropertyEntity} from "./types";
import ResponseCode from "../responseCode";
import {checkIfLoggedIn, propertyCollectionRef} from "./propertyServiceUtility";
import {Response} from "../response";

export const deleteProperty = async (user: firebase.User | null, property: SavedPropertyEntity) => {
    await checkIfLoggedIn(user);
    return await tryDeleteProperty(property);
}

async function tryDeleteProperty(property: SavedPropertyEntity) {
    try {
        await propertyCollectionRef.doc(property.id).delete()
        return Response({
            code: ResponseCode.SUCCESS,
            message: `${property.title} have been DELETED successfully!`,
        });
    } catch (e) {
        return Response({
            code: ResponseCode.ERROR,
            message: e.message,
        });
    }
}
