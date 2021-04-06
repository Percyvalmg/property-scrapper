import {Footer, Header, PropertyImportForm, PropertyTable, PropertyTableEmpty, PropertyTableRow,} from "../components";
import {PropertyEntity} from "../types";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {useAuth} from "../services/AuthProvider";

type HomeProps = {}
const Home: React.FC<HomeProps> = ({}) => {
    const localStorageData = localStorage.getItem("propertyData");
    const [propertyCollection, setPropertyCollection] = useState<PropertyEntity[]>(localStorageData ? JSON.parse(localStorageData) : []);
    const {currentUser, handleSignOut} = useAuth();

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

                    {currentUser ? (
                        <Button
                            variant={"primary"}
                            onClick={async () => {
                                console.log('Logging out')
                                const response = await handleSignOut();
                                alert(response.message);
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
