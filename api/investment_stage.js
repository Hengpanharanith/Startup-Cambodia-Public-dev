const InvestmentStage = [
    {
        id : "pre_seed",
        name: "Pre-seed",
    },
    {
        id : "seed",
        name: "Seed",
    },
    {
        id : "pre_series_a",
        name: "Pre-series A",
    },
    {
        id : "series_a",
        name: "Series A",
    },
    {
        id : "series_b",
        name: "Series B",
    },
    {
        id : "series_c",
        name: "Series C",
    },
  ]

  const getInvestmentStageById = (item) => {      
    const obj = InvestmentStage.find(x => x.id === item);
    if (obj)
        return obj.name;
  };

  const getInvestmentObjectById = (item) => {
      const obj = InvestmentStage.find(x => x.id === item);
      if (obj)
          return obj;
  }

  export {
    InvestmentStage,
    getInvestmentStageById,
    getInvestmentObjectById

  };
