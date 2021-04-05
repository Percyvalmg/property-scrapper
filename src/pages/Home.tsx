import {Footer, Header, PropertyImportForm, PropertyTable, PropertyTableEmpty, PropertyTableRow,} from "../components";
import {PropertyEntity} from "../types";
import React, {useEffect, useState} from "react";
import firebase from "firebase/app";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

const Home = () => {
    const [user, setUser] = useState<firebase.User | null>(null);
    const localStorageData = localStorage.getItem("propertyData");
    const [propertyCollection, setPropertyCollection] = useState<PropertyEntity[]>(localStorageData ? JSON.parse(localStorageData) : []);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("Auth Status Changed!", user);
                setUser(user);
            }
            console.log("Auth Status Changed!", user);
        });

        return unsubscribe();
    }, [user, setUser]);

    useEffect(() => {
        localStorage.setItem("propertyData", JSON.stringify(propertyCollection));
    }, [propertyCollection, setPropertyCollection]);

    return (
        <>
            <Header>
                <>
                    <PropertyImportForm
                        propertyCollection={propertyCollection}
                        setPropertyCollection={setPropertyCollection}
                    />

                    {user ? (
                        <Button
                            variant={"primary"}
                            onClick={() => {
                                firebase
                                .auth()
                                .signOut()
                                .then(() => setUser(null));
                            }}
                        >
                            Logout
                        </Button>
                    ) : (
                        <Link className={"btn btn-primary"} to={"/Login"}>
                            Login
                        </Link>
                    )}
                </>
            </Header>

            <PropertyTable
                childrenArray={
                    propertyCollection.length > 0 &&
                    propertyCollection.map((property: PropertyEntity, index) => (
                        <PropertyTableRow
                            key={index}
                            property={property}
                            setPropertyData={setPropertyCollection}
                            propertyData={propertyCollection}
                            index={index}
                        />
                    ))
                }
                children={<PropertyTableEmpty/>}
            />

            <Footer/>
        </>
    );
};

export default Home;
