import {PropertyTable, PropertyTableEmpty, PropertyTableRow} from "../components/table";
import React, {useEffect, useState} from "react";
import {useAuth} from "../services/auth";
import {Footer, Header} from "../components/shared";
import {PropertyImportForm} from "../components/forms";
import {Link} from "react-router-dom";
import {PropertyEntity, SavedPropertyEntity} from "../services/property/types";
import {Button, ButtonGroup} from "react-bootstrap";
import {deletePropertyCollection, getPropertyCollection, savePropertyCollection,} from "../services/property";
import {ResponseCode} from '../services'

type HomeProps = {}

const Home: React.FC<HomeProps> = ({}) => {
    const localStorageData = localStorage.getItem("propertyData");
    const [propertyCollection, setPropertyCollection] = useState<PropertyEntity[]>(localStorageData ? JSON.parse(localStorageData) : []);
    const [savedPropertyCollection, setSavedPropertyCollection] = useState<SavedPropertyEntity[]>([])
    const {currentUser, handleSignOut} = useAuth();

    const hasSavedProperty = savedPropertyCollection.length > 0;
    const hasLocalProperty = propertyCollection.length > 0;
    const hasProperty = hasSavedProperty || hasLocalProperty;
    const hasMoreThanOneLocalProperty = propertyCollection.length > 1;
    const hasMoreThanOneSavedProperty = savedPropertyCollection.length > 1;

    useEffect(() => {
        if (currentUser) {
            getPropertyCollection(currentUser)
            .then(response => {
                if (response.data.length > 0) setSavedPropertyCollection(response.data)
            })
        }
    }, [currentUser, setSavedPropertyCollection, setPropertyCollection]);


    useEffect(() => {
        localStorage.setItem("propertyData", JSON.stringify(propertyCollection));
    }, [propertyCollection, setPropertyCollection]);

    return (
        <>
            <Header>
                <>
                    {currentUser ? (
                        <Button
                            variant={"link"}
                            onClick={async () => {
                                console.log('Logging out')
                                const response = await handleSignOut();
                                setSavedPropertyCollection([])
                                alert(response.message);
                            }}
                        >
                            Logout
                        </Button>
                    ) : (
                        <Link className={"btn btn-link"} to={"/Login"}>
                            Login
                        </Link>
                    )}
                </>
            </Header>

            <div className={'d-flex justify-content-end pr-4'} style={{backgroundColor: "#3d4349"}}>
                <ButtonGroup>
                    {hasLocalProperty && hasMoreThanOneLocalProperty &&
                    <>
                        <Button variant={'link'} onClick={async () => {
                            const response = await savePropertyCollection(currentUser, propertyCollection);
                            if (response.code === ResponseCode.SUCCESS) {
                                setPropertyCollection([])
                                getPropertyCollection(currentUser)
                                .then(response => {
                                    if (response.data.length > 0) setSavedPropertyCollection(response.data)
                                })
                            }
                            alert(response.message);
                        }}>Save All</Button>
                        <Button variant={'link'} onClick={() => {
                            setPropertyCollection([]);
                            alert(`${propertyCollection.length} All items have been removes successfully`);
                        }}>Remove All</Button>
                    </>
                    }
                    {hasMoreThanOneSavedProperty &&
                    <>
                        <Button variant={'link'} onClick={async () => {
                            const response = await deletePropertyCollection(currentUser, savedPropertyCollection);
                            if (response.code === ResponseCode.SUCCESS) {
                                setSavedPropertyCollection([])
                            }
                            alert(response.message);
                        }}>Delete All</Button>
                    </>
                    }
                </ButtonGroup>

                <PropertyImportForm
                    propertyCollection={propertyCollection}
                    setPropertyCollection={setPropertyCollection}
                />
            </div>

            <PropertyTable
                childrenArray={
                    (hasProperty) &&
                    savedPropertyCollection.map((property: PropertyEntity, index) => (
                        <PropertyTableRow
                            key={index}
                            property={property}
                            setPropertyData={setPropertyCollection}
                            propertyData={propertyCollection}
                            index={index}
                            savedPropertyData={savedPropertyCollection}
                            setSavedPropertyData={setSavedPropertyCollection}
                        />
                    )).concat(
                        propertyCollection.map((property: PropertyEntity, index) => (
                            <PropertyTableRow
                                key={index}
                                property={property}
                                setPropertyData={setPropertyCollection}
                                propertyData={propertyCollection}
                                index={index}
                                savedPropertyData={savedPropertyCollection}
                                setSavedPropertyData={setSavedPropertyCollection}
                            />
                        ))
                    )
                }
            >
                <PropertyTableEmpty/>
            </PropertyTable>
            <Footer/>
        </>
    );
};

export default Home;
