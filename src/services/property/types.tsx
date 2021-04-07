export type PropertyEntity = {
    image: string | undefined;
    images: string[] | undefined;
    title: string | undefined;
    price: string | undefined;
    location: string | undefined;
    bedrooms: string | undefined;
    bathrooms: string | undefined;
    floorSize: string | undefined;
    levy: string | undefined;
    parking: string | undefined;
    rates: string | undefined;
}

export type SavedPropertyEntity = {
    image: string | undefined;
    images: string[] | undefined;
    title: string | undefined;
    price: string | undefined;
    location: string | undefined;
    bedrooms: string | undefined;
    bathrooms: string | undefined;
    floorSize: string | undefined;
    levy: string | undefined;
    parking: string | undefined;
    rates: string | undefined;
    userId: string
}

export type PropertyCollection = {
    propertyData: PropertyEntity[]
    setPropertyData: (data: PropertyEntity[]) => void
}



