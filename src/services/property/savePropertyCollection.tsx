import firebase from "firebase";
import {PropertyEntity} from "./types";
import ResponseCode from "../responseCode";
import {db} from "../../firebase";
import {checkIfLoggedIn, propertyCollectionRef} from "./propertyServiceUtility";
import {Response} from "../response";

export const savePropertyCollection = async (user: firebase.User | null, propertyCollection: PropertyEntity[]) => {
    await checkIfLoggedIn(user);
    if (propertyCollection.length === 0) return Response({
        code: ResponseCode.SUCCESS,
        message: 'you have not added any items to the table',
    });
    return await trySavePropertyCollection(user!, propertyCollection)
}

async function trySavePropertyCollection(user: firebase.User, propertyCollection: PropertyEntity[]) {
    try {
        const batch = db.batch()
        propertyCollection.forEach((property) => {
            batch.set(propertyCollectionRef.doc(), {userId: user?.uid, ...property});
        });
        await batch.commit()
        return Response({
            code: ResponseCode.SUCCESS,
            message: `${propertyCollection.length} properties have been SAVED successfully!`,
        });
    } catch (e) {
        return Response({
            code: ResponseCode.ERROR,
            message: e.message,
        });
    }
}
