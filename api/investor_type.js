const InvestorType = [
    {
        id : "angel",
        name: "Angel",
    },
    {
        id : "corporate_vc",
        name: "Corporate VC",
    },
    {
        id : "crowdfunding_platform",
        name: "Crowdfunding Platform",
    },
    {
        id : "government_linked",
        name: "Government Linked",
    },
    {
        id : "private_equity",
        name: "Private Equity",
    },
    {
        id : "venture_capital",
        name: "Venture Capital",
    },
  ]

  const getInvestorTypeById = (item) => {      
    const obj = InvestorType.find(x => x.id === item);
    if (obj)
        return obj.name;
  };

  export {
    InvestorType,
    getInvestorTypeById
  };
  