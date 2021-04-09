import firebase from "firebase";
import {PropertyEntity, SavedPropertyEntity} from "./types";
import {db} from "../../firebase";
import ResponseCode from "../responseCode";
import {Response} from "../response";

export const propertyCollectionRef = db.collection('Properties');

export const getPropertyId = (property: PropertyEntity | SavedPropertyEntity, user: firebase.User) => {
    return `${user.uid}${property.bedrooms}${property.price}${property.bathrooms}${property.bathrooms}${property.rates}${property.levy}`
    .replace(/ /g, '');
}

export const checkIfLoggedIn = (user: firebase.User | null) => {
    if (!user) {
        return Response({
            code: ResponseCode.SUCCESS,
            message: 'You need to login in order for you to save your property data',
        });
    }
}

