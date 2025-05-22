const LookingAt =  [
    {
        key : "finding_incubators_or_accelerators",
        value: "Finding Incubators or Accelerators",
    },
    {
        key : "finding_investees",
        value: "Finding Investees",
    },
    {
        key : "finding_investors",
        value: "Finding Investors",
    },
    {
        key : "finding_mentees",
        value: "Finding Mentees",
    },
    {
        key : "finding_mentors",
        value: "Finding Mentors",
    },
    {
        key : "partnerships_with_corporates",
        value: "Partnerships with Corporates",
    },
    {
        key : "partnerships_with_intermediaries",
        value: "Partnerships with Intermediaries",
    },
    {
        key : "partnerships_with_startups",
        value: "Partnerships with Startups",
    },
  ]

  const getLookingAtById = (item) => {   
    
    const obj = LookingAt.find(x => x.key === item.key);
    
    if (obj)
        return obj.value;
  };

  export {
    LookingAt,
    getLookingAtById
  };
  