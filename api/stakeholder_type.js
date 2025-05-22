const StakeholderType = [
    {
        id: "academic-institution",
        name: "Academic Institution",

    },
    {
        id: "co-working-space",
        name: "Co-working Space",

    },
    {
        id: "community-and-association",
        name: "Community and Association",

    },
    {
        id: "corporate",
        name: "Corporate",

    },
    {
        id: "development-partner",
        name: "Development Partner",

    },
    {
        id: "government-institution",
        name: "Government Institution",

    },
    {
        id: "incubator-and-accelerator",
        name: "Incubator and Accelerator",

    },
    {
        id: "media",
        name: "Media",

    },

    {
        id: "service-provider",
        name: "Service Provider",

    }
]

const getStakeholderById = (item) => {
    const obj = StakeholderType.find(x => x.id === item);
    if (obj)
        return obj.name;
};


export {
    StakeholderType,
    getStakeholderById

}

