import firebase from "firebase";
import {SavedPropertyEntity} from "./types";
import ResponseCode from "../responseCode";
import {checkIfLoggedIn, getPropertyId, propertyCollectionRef} from "./propertyServiceUtility";
import {db} from "../../firebase";
import {Response} from "../response";

export const deletePropertyCollection = async (user: firebase.User | null, propertyCollection: SavedPropertyEntity[]) => {
    await checkIfLoggedIn(user);
    if (propertyCollection.length === 0) return Response({
        code: ResponseCode.SUCCESS,
        message: 'There are no properties to delete',
    });
    return await tryDeletePropertyCollection(user!, propertyCollection)
}

async function tryDeletePropertyCollection(user: firebase.User, propertyCollection: SavedPropertyEntity[]) {
    try {
        const batch = db.batch()
        propertyCollection.forEach((property) => {
            batch.delete(propertyCollectionRef.doc(getPropertyId(property)));
        });

        await batch.commit()
        return Response({
            code: ResponseCode.SUCCESS,
            message: `${propertyCollection.length} properties have been DELETED successfully!`,
        });
    } catch (e) {
        return Response({
            code: ResponseCode.ERROR,
            message: e.message,
        });
    }
}
