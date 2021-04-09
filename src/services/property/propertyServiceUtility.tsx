import firebase from "firebase";
import {db} from "../../firebase";
import ResponseCode from "../responseCode";
import {Response} from "../response";

export const propertyCollectionRef = db.collection('Properties');

export const checkIfLoggedIn = (user: firebase.User | null) => {
    if (!user) {
        return Response({
            code: ResponseCode.SUCCESS,
            message: 'You need to login in order for you to save your property data',
        });
    }
}

