const BusinessModel = [
    {
        key : "b2b",
        value: "Business to Business (B2B)",
    },
    {
        key : "b2b2c",
        value: "Business to Business to Consumer (B2B2C)",
    },
    {
        key : "b2c",
        value: "Business to Consumer (B2C)",
    },
    {
        key : "b2g",
        value: "Business to Government (B2G)",
    },
    {
        key : "c2c",
        value: "Customer to Customer (C2C)",
    },
  ]

  const getBusinessModelById = (item) => {      
    const obj = BusinessModel.find(x => x.key === item);
    if (obj)
        return obj.value;
  };

  export {
    BusinessModel,
    getBusinessModelById
  };
  