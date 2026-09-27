// Synthetic data created only for the InduBench SA prototype.
// All companies and results are fictional.

export const kpiDefinitions = [
  {
    key: "productivity",
    label: "Productivity",
    dimension: "Operational Performance",
    unit: "%",
    direction: "Higher is better",
    weight: 25,
    target: 85,
  },
  {
    key: "quality",
    label: "Quality Rate",
    dimension: "Quality Performance",
    unit: "%",
    direction: "Higher is better",
    weight: 25,
    target: 95,
  },
  {
    key: "delivery",
    label: "On-Time Delivery",
    dimension: "Customer and Service Performance",
    unit: "%",
    direction: "Higher is better",
    weight: 20,
    target: 92,
  },
  {
    key: "energy",
    label: "Energy Efficiency",
    dimension: "Sustainability Performance",
    unit: "%",
    direction: "Higher is better",
    weight: 15,
    target: 82,
  },
  {
    key: "safety",
    label: "Safety Compliance",
    dimension: "People and Safety Performance",
    unit: "%",
    direction: "Higher is better",
    weight: 15,
    target: 95,
  },
];

export const syntheticIndustryData = {
  Manufacturing: [
    {
      company: "Manufacturing Company A",
      productivity: 78,
      quality: 92,
      delivery: 86,
      energy: 74,
      safety: 90,
    },
    {
      company: "Manufacturing Company B",
      productivity: 84,
      quality: 95,
      delivery: 90,
      energy: 79,
      safety: 95,
    },
    {
      company: "Manufacturing Company C",
      productivity: 88,
      quality: 97,
      delivery: 93,
      energy: 85,
      safety: 98,
    },
    {
      company: "Manufacturing Company D",
      productivity: 81,
      quality: 94,
      delivery: 89,
      energy: 78,
      safety: 93,
    },
  ],

  Automotive: [
    {
      company: "Automotive Company A",
      productivity: 86,
      quality: 96,
      delivery: 91,
      energy: 80,
      safety: 96,
    },
    {
      company: "Automotive Company B",
      productivity: 89,
      quality: 98,
      delivery: 95,
      energy: 85,
      safety: 99,
    },
    {
      company: "Automotive Company C",
      productivity: 83,
      quality: 95,
      delivery: 90,
      energy: 78,
      safety: 94,
    },
    {
      company: "Automotive Company D",
      productivity: 91,
      quality: 99,
      delivery: 96,
      energy: 87,
      safety: 98,
    },
  ],

  Logistics: [
    {
      company: "Logistics Company A",
      productivity: 80,
      quality: 91,
      delivery: 89,
      energy: 73,
      safety: 91,
    },
    {
      company: "Logistics Company B",
      productivity: 85,
      quality: 94,
      delivery: 93,
      energy: 78,
      safety: 95,
    },
    {
      company: "Logistics Company C",
      productivity: 88,
      quality: 96,
      delivery: 95,
      energy: 82,
      safety: 97,
    },
    {
      company: "Logistics Company D",
      productivity: 82,
      quality: 93,
      delivery: 91,
      energy: 76,
      safety: 93,
    },
  ],

  Construction: [
    {
      company: "Construction Company A",
      productivity: 73,
      quality: 89,
      delivery: 82,
      energy: 70,
      safety: 84,
    },
    {
      company: "Construction Company B",
      productivity: 79,
      quality: 93,
      delivery: 87,
      energy: 75,
      safety: 90,
    },
    {
      company: "Construction Company C",
      productivity: 84,
      quality: 95,
      delivery: 91,
      energy: 80,
      safety: 94,
    },
    {
      company: "Construction Company D",
      productivity: 77,
      quality: 92,
      delivery: 85,
      energy: 73,
      safety: 88,
    },
  ],

  "Food Processing": [
    {
      company: "Food Processing Company A",
      productivity: 76,
      quality: 94,
      delivery: 87,
      energy: 75,
      safety: 92,
    },
    {
      company: "Food Processing Company B",
      productivity: 82,
      quality: 97,
      delivery: 91,
      energy: 81,
      safety: 96,
    },
    {
      company: "Food Processing Company C",
      productivity: 86,
      quality: 98,
      delivery: 94,
      energy: 84,
      safety: 98,
    },
    {
      company: "Food Processing Company D",
      productivity: 80,
      quality: 96,
      delivery: 90,
      energy: 79,
      safety: 95,
    },
  ],
};

const metrics = kpiDefinitions.map((kpi) => kpi.key);

function calculateAverage(companies, metric) {
  const total = companies.reduce(
    (sum, company) => sum + company[metric],
    0
  );

  return Number((total / companies.length).toFixed(1));
}

function calculateMedian(companies, metric) {
  const values = companies
    .map((company) => company[metric])
    .sort((a, b) => a - b);

  const middle = Math.floor(values.length / 2);

  if (values.length % 2 === 0) {
    return Number(
      ((values[middle - 1] + values[middle]) / 2).toFixed(1)
    );
  }

  return values[middle];
}

function findTopPerformer(companies, metric) {
  return Math.max(
    ...companies.map((company) => company[metric])
  );
}

export function calculateIndustryStatistics(industry) {
  const companies =
    syntheticIndustryData[industry] ||
    syntheticIndustryData.Manufacturing;

  const averages = {};
  const medians = {};
  const topPerformers = {};

  metrics.forEach((metric) => {
    averages[metric] = calculateAverage(companies, metric);
    medians[metric] = calculateMedian(companies, metric);
    topPerformers[metric] = findTopPerformer(companies, metric);
  });

  return {
    industry,
    numberOfCompanies: companies.length,
    averages,
    medians,
    topPerformers,
  };
}

const recommendationActions = {
  productivity: {
    low: [
      "Review daily output and identify small production delays.",
      "Check whether employees are following standard working methods.",
    ],
    medium: [
      "Conduct a bottleneck analysis on the production process.",
      "Measure machine downtime and identify frequent stoppages.",
      "Review staff allocation and production scheduling.",
    ],
    high: [
      "Complete a full process and workflow study.",
      "Investigate major machine downtime and maintenance problems.",
      "Review staffing levels, training and standard operating procedures.",
      "Develop a formal productivity improvement plan.",
    ],
  },

  quality: {
    low: [
      "Monitor defects more frequently.",
      "Review inspection records and recurring quality problems.",
    ],
    medium: [
      "Use a Pareto chart to identify the main defect categories.",
      "Conduct root-cause analysis on repeated defects.",
      "Review inspection and quality-control procedures.",
    ],
    high: [
      "Start a formal corrective-action programme.",
      "Analyse defects using Pareto and root-cause analysis.",
      "Review supplier material quality and process controls.",
      "Provide refresher quality training to employees.",
    ],
  },

  delivery: {
    low: [
      "Monitor delayed orders and record the reasons for delays.",
      "Review the daily production and delivery schedule.",
    ],
    medium: [
      "Review production scheduling and order priorities.",
      "Investigate supplier and material delays.",
      "Measure lead time at each important process stage.",
    ],
    high: [
      "Redesign the production and delivery planning process.",
      "Investigate major supplier, transport and material delays.",
      "Introduce regular order-progress monitoring.",
      "Develop a recovery plan for delayed customer orders.",
    ],
  },

  energy: {
    low: [
      "Monitor monthly energy use and identify unnecessary consumption.",
      "Switch off equipment when it is not being used.",
    ],
    medium: [
      "Conduct a basic energy audit.",
      "Inspect equipment for inefficient energy use.",
      "Introduce shutdown procedures for idle machines.",
    ],
    high: [
      "Complete a detailed energy-efficiency assessment.",
      "Identify high-consumption machines and processes.",
      "Repair or replace inefficient equipment where possible.",
      "Set monthly energy-reduction targets.",
    ],
  },

  safety: {
    low: [
      "Review safety inspection findings.",
      "Remind employees about safe working procedures.",
    ],
    medium: [
      "Increase workplace safety inspections.",
      "Review PPE compliance and employee safety training.",
      "Record and investigate near-miss incidents.",
    ],
    high: [
      "Conduct a complete workplace safety audit.",
      "Correct serious unsafe conditions immediately.",
      "Provide compulsory safety refresher training.",
      "Develop and monitor a formal corrective-action plan.",
    ],
  },
};

const industryActions = {
  Manufacturing:
    "Review production-line performance, equipment use and standard work.",

  Automotive:
    "Review workstation balance, component availability and line stoppages.",

  Logistics:
    "Review warehouse flow, loading times and transport planning.",

  Construction:
    "Review site planning, equipment scheduling and material availability.",

  "Food Processing":
    "Review production yield, hygiene controls and process conditions.",
};

function determinePriority(gap) {
  if (gap <= -10) {
    return {
      priority: "High",
      level: "high",
      shortTermIncrease: 5,
    };
  }

  if (gap <= -5) {
    return {
      priority: "Medium",
      level: "medium",
      shortTermIncrease: 4,
    };
  }

  if (gap < 0) {
    return {
      priority: "Low",
      level: "low",
      shortTermIncrease: 2,
    };
  }

  return {
    priority: "Performing well",
    level: "good",
    shortTermIncrease: 0,
  };
}

export function generateRecommendation(
  metric,
  result,
  benchmark,
  industry
) {
  const definition = kpiDefinitions.find(
    (kpi) => kpi.key === metric
  );

  const gap = Number((result - benchmark).toFixed(1));
  const priorityInformation = determinePriority(gap);

  if (gap >= 0) {
    return {
      metric,
      label: definition?.label || metric,
      dimension: definition?.dimension || "",
      result,
      benchmark,
      gap,
      priority: "Performing well",
      improvementNeeded: 0,
      shortTermTarget: result,
      finalTarget: Math.max(result, benchmark),
      actions: [
        "Maintain the current level of performance.",
        "Continue monitoring this KPI every reporting period.",
        "Document and share the practices producing the good result.",
      ],
    };
  }

  const shortTermTarget = Math.min(
    benchmark,
    result + priorityInformation.shortTermIncrease
  );

  const metricActions =
    recommendationActions[metric]?.[priorityInformation.level] || [];

  const industryAction =
    industryActions[industry] ||
    industryActions.Manufacturing;

  return {
    metric,
    label: definition?.label || metric,
    dimension: definition?.dimension || "",
    result,
    benchmark,
    gap,
    priority: priorityInformation.priority,
    improvementNeeded: Math.abs(gap),
    shortTermTarget: Number(shortTermTarget.toFixed(1)),
    finalTarget: benchmark,
    actions:
  metric === "productivity"
    ? [industryAction, ...metricActions]
    : metricActions,
  };
}

export function generateCompanyRecommendations(
  companyResults,
  industryStatistics,
  industry
) {
  return metrics
    .map((metric) =>
      generateRecommendation(
        metric,
        Number(companyResults[metric] || 0),
        industryStatistics.averages[metric],
        industry
      )
    )
    .filter((recommendation) => recommendation.gap < 0)
    .sort((a, b) => a.gap - b.gap);
}

export function calculateWeightedScore(companyResults) {
  const totalScore = kpiDefinitions.reduce((total, kpi) => {
    const result = Number(companyResults[kpi.key] || 0);
    return total + result * (kpi.weight / 100);
  }, 0);

  return Number(totalScore.toFixed(1));
}