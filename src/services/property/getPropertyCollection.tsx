import firebase from "firebase";
import {SavedPropertyEntity} from "./types";
import ResponseCode from "../responseCode";
import {checkIfLoggedIn, propertyCollectionRef} from "./propertyServiceUtility";
import {Response} from "../response";
import {analytics} from "../../firebase";

export const getPropertyCollection = async (user: firebase.User | null,) => {
    await checkIfLoggedIn(user);
    return tryGetPropertyCollection(user!)
}

async function tryGetPropertyCollection(user: firebase.User) {
    try {
        let propertyCollection: SavedPropertyEntity[] = [];
        const snapShot = await propertyCollectionRef.where('userId', '==', user?.uid).get()
        snapShot.docs.forEach(property => {
            propertyCollection.push({...property.data(), id: property.id} as unknown as SavedPropertyEntity)
        })
        return Response({
            code: ResponseCode.SUCCESS,
            message: 'Data successfully retrieved ',
            data: propertyCollection
        });
    } catch (e) {
        analytics.logEvent('user_get_property_error', {
            errorMessage: e.message
        })
        return Response({
            code: ResponseCode.ERROR,
            message: e.message,
            data: []
        });
    }
}
