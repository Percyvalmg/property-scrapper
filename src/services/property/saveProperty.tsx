import firebase from "firebase";
import {PropertyEntity} from "./types";
import ResponseCode from "../responseCode";
import {checkIfLoggedIn, propertyCollectionRef} from "./propertyServiceUtility";
import {Response} from "../response";
import {analytics} from "../../firebase";

export const saveProperty = async (user: firebase.User | null, property: PropertyEntity) => {
    await checkIfLoggedIn(user);
    return await trySaveProperty(property, user!);
}

async function trySaveProperty(property: PropertyEntity, user: firebase.User) {
    try {
        await propertyCollectionRef.doc().set({userId: user?.uid, ...property});
        return Response({
            code: ResponseCode.SUCCESS,
            message: `${property.title} have been SAVED successfully!`,
        });
    } catch (e) {
        analytics.logEvent('user_save_property_error', {
            errorMessage: e.message
        })
        return Response({
            code: ResponseCode.ERROR,
            message: e.message,
        });
    }
}
