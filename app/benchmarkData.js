// Synthetic reference data created only for the InduBench SA prototype.
// All companies, organisations and benchmark results are fictional.

// ============================================================
// 1. INDUSTRY-SPECIFIC KPI LIBRARIES
// ============================================================

export const industryKpiDefinitions = {
  Manufacturing: [
    {
      key: "productivity",
      label: "Productivity",
      dimension: "Operational Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 15,
      target: 85,
    },
    {
      key: "quality",
      label: "Quality Rate",
      dimension: "Quality Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 15,
      target: 95,
    },
    {
      key: "oee",
      label: "Overall Equipment Effectiveness (OEE)",
      dimension: "Equipment Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 12,
      target: 85,
    },
    {
      key: "capacityUtilisation",
      label: "Capacity Utilisation",
      dimension: "Operational Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 8,
      target: 85,
    },
    {
      key: "downtimePerformance",
      label: "Downtime Performance",
      dimension: "Maintenance Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 10,
      target: 90,
    },
    {
      key: "scrapPerformance",
      label: "Scrap / Waste Performance",
      dimension: "Quality and Waste Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 8,
      target: 95,
    },
    {
      key: "delivery",
      label: "On-Time Delivery",
      dimension: "Customer and Service Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 10,
      target: 92,
    },
    {
      key: "inventoryPerformance",
      label: "Inventory Performance",
      dimension: "Materials and Inventory Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 7,
      target: 85,
    },
    {
      key: "energy",
      label: "Energy Efficiency",
      dimension: "Sustainability Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 7,
      target: 82,
    },
    {
      key: "safety",
      label: "Safety Compliance",
      dimension: "People and Safety Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 8,
      target: 95,
    },
  ],

  Automotive: [
    {
      key: "productionProductivity",
      label: "Production Productivity",
      dimension: "Operational Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 14,
      target: 88,
    },
    {
      key: "firstPassQuality",
      label: "First-Pass Quality",
      dimension: "Quality Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 14,
      target: 97,
    },
    {
      key: "oee",
      label: "Overall Equipment Effectiveness (OEE)",
      dimension: "Equipment Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 12,
      target: 88,
    },
    {
      key: "cycleTimePerformance",
      label: "Cycle-Time Performance",
      dimension: "Process Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 10,
      target: 90,
    },
    {
      key: "lineUtilisation",
      label: "Line Utilisation",
      dimension: "Production-Line Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 10,
      target: 88,
    },
    {
      key: "downtimePerformance",
      label: "Downtime Performance",
      dimension: "Maintenance Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 10,
      target: 92,
    },
    {
      key: "reworkPerformance",
      label: "Rework Performance",
      dimension: "Quality Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 8,
      target: 96,
    },
    {
      key: "scheduleDelivery",
      label: "Schedule / Delivery Performance",
      dimension: "Customer and Schedule Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 8,
      target: 94,
    },
    {
      key: "energy",
      label: "Energy Efficiency",
      dimension: "Sustainability Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 6,
      target: 85,
    },
    {
      key: "safety",
      label: "Safety Compliance",
      dimension: "People and Safety Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 8,
      target: 97,
    },
  ],

  Logistics: [
    {
      key: "operationalProductivity",
      label: "Operational Productivity",
      dimension: "Operational Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 12,
      target: 88,
    },
    {
      key: "perfectOrder",
      label: "Perfect Order Fulfilment",
      dimension: "Reliability Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 14,
      target: 95,
    },
    {
      key: "delivery",
      label: "On-Time Delivery",
      dimension: "Delivery Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 13,
      target: 95,
    },
    {
      key: "orderAccuracy",
      label: "Order Accuracy",
      dimension: "Quality and Reliability",
      unit: "%",
      direction: "Higher is better",
      weight: 12,
      target: 98,
    },
    {
      key: "cycleTimePerformance",
      label: "Order Fulfilment Cycle-Time Performance",
      dimension: "Responsiveness Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 10,
      target: 90,
    },
    {
      key: "fleetUtilisation",
      label: "Fleet Utilisation",
      dimension: "Asset Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 9,
      target: 85,
    },
    {
      key: "costPerformance",
      label: "Cost per Delivery Performance",
      dimension: "Cost Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 8,
      target: 88,
    },
    {
      key: "emptyRunningPerformance",
      label: "Empty-Running Performance",
      dimension: "Transport Efficiency",
      unit: "%",
      direction: "Higher is better",
      weight: 7,
      target: 90,
    },
    {
      key: "fuelEnergyEfficiency",
      label: "Fuel / Energy Efficiency",
      dimension: "Sustainability Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 7,
      target: 85,
    },
    {
      key: "safety",
      label: "Safety Compliance",
      dimension: "People and Safety Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 8,
      target: 96,
    },
  ],

  Construction: [
    {
      key: "labourProductivity",
      label: "Labour Productivity",
      dimension: "Operational Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 13,
      target: 85,
    },
    {
      key: "schedulePerformance",
      label: "Schedule Performance",
      dimension: "Project Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 13,
      target: 90,
    },
    {
      key: "costPerformance",
      label: "Cost Performance",
      dimension: "Financial Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 12,
      target: 90,
    },
    {
      key: "firstTimeAcceptance",
      label: "Quality / First-Time Acceptance",
      dimension: "Quality Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 11,
      target: 95,
    },
    {
      key: "reworkPerformance",
      label: "Rework Performance",
      dimension: "Quality and Cost Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 9,
      target: 95,
    },
    {
      key: "labourUtilisation",
      label: "Labour Utilisation",
      dimension: "Resource Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 9,
      target: 85,
    },
    {
      key: "equipmentUtilisation",
      label: "Equipment Utilisation",
      dimension: "Asset Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 8,
      target: 85,
    },
    {
      key: "milestoneCompletion",
      label: "Milestone Completion",
      dimension: "Project Delivery Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 9,
      target: 92,
    },
    {
      key: "safety",
      label: "Safety Compliance",
      dimension: "People and Safety Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 10,
      target: 97,
    },
    {
      key: "energyFuelEfficiency",
      label: "Energy / Fuel Efficiency",
      dimension: "Sustainability Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 6,
      target: 82,
    },
  ],

  "Food Processing": [
    {
      key: "productionProductivity",
      label: "Production Productivity",
      dimension: "Operational Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 13,
      target: 87,
    },
    {
      key: "productionYield",
      label: "Production Yield",
      dimension: "Materials Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 12,
      target: 94,
    },
    {
      key: "firstPassQuality",
      label: "First-Pass Quality",
      dimension: "Quality Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 13,
      target: 97,
    },
    {
      key: "oee",
      label: "Overall Equipment Effectiveness (OEE)",
      dimension: "Equipment Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 11,
      target: 85,
    },
    {
      key: "downtimePerformance",
      label: "Downtime Performance",
      dimension: "Maintenance Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 9,
      target: 90,
    },
    {
      key: "wastePerformance",
      label: "Waste / Loss Performance",
      dimension: "Waste and Sustainability Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 9,
      target: 95,
    },
    {
      key: "delivery",
      label: "On-Time Delivery",
      dimension: "Customer and Service Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 9,
      target: 93,
    },
    {
      key: "energy",
      label: "Energy Efficiency",
      dimension: "Sustainability Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 7,
      target: 84,
    },
    {
      key: "processCompliance",
      label: "Food Quality / Process Compliance",
      dimension: "Food Quality and Compliance",
      unit: "%",
      direction: "Higher is better",
      weight: 9,
      target: 98,
    },
    {
      key: "safety",
      label: "Safety Compliance",
      dimension: "People and Safety Performance",
      unit: "%",
      direction: "Higher is better",
      weight: 8,
      target: 97,
    },
  ],
};

// Legacy export used by the current assessment page.
// This will be removed when the new dynamic assessment page is connected.
export const kpiDefinitions =
  industryKpiDefinitions.Manufacturing;

export function getKpiDefinitions(industry) {
  return (
    industryKpiDefinitions[industry] ||
    industryKpiDefinitions.Manufacturing
  );
}

// ============================================================
// 2. SYNTHETIC INDUSTRY REFERENCE DATA
// ============================================================

export const syntheticIndustryData = {
  Manufacturing: [
    {
      company: "Manufacturing Company A",
      productivity: 78,
      quality: 92,
      oee: 73,
      capacityUtilisation: 76,
      downtimePerformance: 79,
      scrapPerformance: 90,
      delivery: 86,
      inventoryPerformance: 74,
      energy: 74,
      safety: 90,
    },
    {
      company: "Manufacturing Company B",
      productivity: 84,
      quality: 95,
      oee: 81,
      capacityUtilisation: 83,
      downtimePerformance: 86,
      scrapPerformance: 94,
      delivery: 90,
      inventoryPerformance: 81,
      energy: 79,
      safety: 95,
    },
    {
      company: "Manufacturing Company C",
      productivity: 88,
      quality: 97,
      oee: 87,
      capacityUtilisation: 89,
      downtimePerformance: 92,
      scrapPerformance: 97,
      delivery: 93,
      inventoryPerformance: 88,
      energy: 85,
      safety: 98,
    },
    {
      company: "Manufacturing Company D",
      productivity: 81,
      quality: 94,
      oee: 78,
      capacityUtilisation: 80,
      downtimePerformance: 84,
      scrapPerformance: 93,
      delivery: 89,
      inventoryPerformance: 79,
      energy: 78,
      safety: 93,
    },
  ],

  Automotive: [
    {
      company: "Automotive Company A",
      productionProductivity: 86,
      firstPassQuality: 96,
      oee: 84,
      cycleTimePerformance: 86,
      lineUtilisation: 84,
      downtimePerformance: 87,
      reworkPerformance: 94,
      scheduleDelivery: 91,
      energy: 80,
      safety: 96,
    },
    {
      company: "Automotive Company B",
      productionProductivity: 89,
      firstPassQuality: 98,
      oee: 89,
      cycleTimePerformance: 91,
      lineUtilisation: 90,
      downtimePerformance: 93,
      reworkPerformance: 97,
      scheduleDelivery: 95,
      energy: 85,
      safety: 99,
    },
    {
      company: "Automotive Company C",
      productionProductivity: 83,
      firstPassQuality: 95,
      oee: 80,
      cycleTimePerformance: 83,
      lineUtilisation: 81,
      downtimePerformance: 84,
      reworkPerformance: 92,
      scheduleDelivery: 90,
      energy: 78,
      safety: 94,
    },
    {
      company: "Automotive Company D",
      productionProductivity: 91,
      firstPassQuality: 99,
      oee: 91,
      cycleTimePerformance: 94,
      lineUtilisation: 92,
      downtimePerformance: 95,
      reworkPerformance: 98,
      scheduleDelivery: 96,
      energy: 87,
      safety: 98,
    },
  ],

  Logistics: [
    {
      company: "Logistics Company A",
      operationalProductivity: 80,
      perfectOrder: 88,
      delivery: 89,
      orderAccuracy: 92,
      cycleTimePerformance: 79,
      fleetUtilisation: 75,
      costPerformance: 76,
      emptyRunningPerformance: 72,
      fuelEnergyEfficiency: 73,
      safety: 91,
    },
    {
      company: "Logistics Company B",
      operationalProductivity: 85,
      perfectOrder: 93,
      delivery: 93,
      orderAccuracy: 96,
      cycleTimePerformance: 85,
      fleetUtilisation: 82,
      costPerformance: 83,
      emptyRunningPerformance: 81,
      fuelEnergyEfficiency: 78,
      safety: 95,
    },
    {
      company: "Logistics Company C",
      operationalProductivity: 88,
      perfectOrder: 97,
      delivery: 95,
      orderAccuracy: 99,
      cycleTimePerformance: 91,
      fleetUtilisation: 88,
      costPerformance: 89,
      emptyRunningPerformance: 87,
      fuelEnergyEfficiency: 82,
      safety: 97,
    },
    {
      company: "Logistics Company D",
      operationalProductivity: 82,
      perfectOrder: 91,
      delivery: 91,
      orderAccuracy: 95,
      cycleTimePerformance: 83,
      fleetUtilisation: 79,
      costPerformance: 80,
      emptyRunningPerformance: 78,
      fuelEnergyEfficiency: 76,
      safety: 93,
    },
  ],

  Construction: [
    {
      company: "Construction Company A",
      labourProductivity: 73,
      schedulePerformance: 78,
      costPerformance: 76,
      firstTimeAcceptance: 88,
      reworkPerformance: 82,
      labourUtilisation: 72,
      equipmentUtilisation: 70,
      milestoneCompletion: 80,
      safety: 84,
      energyFuelEfficiency: 70,
    },
    {
      company: "Construction Company B",
      labourProductivity: 79,
      schedulePerformance: 85,
      costPerformance: 84,
      firstTimeAcceptance: 92,
      reworkPerformance: 89,
      labourUtilisation: 80,
      equipmentUtilisation: 78,
      milestoneCompletion: 86,
      safety: 90,
      energyFuelEfficiency: 75,
    },
    {
      company: "Construction Company C",
      labourProductivity: 84,
      schedulePerformance: 91,
      costPerformance: 90,
      firstTimeAcceptance: 95,
      reworkPerformance: 94,
      labourUtilisation: 86,
      equipmentUtilisation: 85,
      milestoneCompletion: 93,
      safety: 94,
      energyFuelEfficiency: 80,
    },
    {
      company: "Construction Company D",
      labourProductivity: 77,
      schedulePerformance: 83,
      costPerformance: 81,
      firstTimeAcceptance: 91,
      reworkPerformance: 87,
      labourUtilisation: 77,
      equipmentUtilisation: 75,
      milestoneCompletion: 84,
      safety: 88,
      energyFuelEfficiency: 73,
    },
  ],

  "Food Processing": [
    {
      company: "Food Processing Company A",
      productionProductivity: 76,
      productionYield: 88,
      firstPassQuality: 93,
      oee: 74,
      downtimePerformance: 78,
      wastePerformance: 87,
      delivery: 87,
      energy: 75,
      processCompliance: 92,
      safety: 92,
    },
    {
      company: "Food Processing Company B",
      productionProductivity: 82,
      productionYield: 93,
      firstPassQuality: 96,
      oee: 81,
      downtimePerformance: 85,
      wastePerformance: 92,
      delivery: 91,
      energy: 81,
      processCompliance: 96,
      safety: 96,
    },
    {
      company: "Food Processing Company C",
      productionProductivity: 86,
      productionYield: 96,
      firstPassQuality: 98,
      oee: 87,
      downtimePerformance: 91,
      wastePerformance: 96,
      delivery: 94,
      energy: 84,
      processCompliance: 99,
      safety: 98,
    },
    {
      company: "Food Processing Company D",
      productionProductivity: 80,
      productionYield: 91,
      firstPassQuality: 95,
      oee: 79,
      downtimePerformance: 83,
      wastePerformance: 90,
      delivery: 90,
      energy: 79,
      processCompliance: 95,
      safety: 95,
    },
  ],
};

// ============================================================
// 3. INDUSTRY STATISTICS
// ============================================================

function calculateAverage(companies, metric) {
  const total = companies.reduce(
    (sum, company) =>
      sum + Number(company[metric] || 0),
    0
  );

  return Number(
    (total / companies.length).toFixed(1)
  );
}

function calculateMedian(companies, metric) {
  const values = companies
    .map((company) => Number(company[metric] || 0))
    .sort((a, b) => a - b);

  const middle = Math.floor(values.length / 2);

  if (values.length % 2 === 0) {
    return Number(
      (
        (values[middle - 1] + values[middle]) /
        2
      ).toFixed(1)
    );
  }

  return values[middle];
}

function findTopPerformer(companies, metric) {
  return Math.max(
    ...companies.map(
      (company) => Number(company[metric] || 0)
    )
  );
}

export function calculateIndustryStatistics(
  industry
) {
  const selectedIndustry =
    syntheticIndustryData[industry]
      ? industry
      : "Manufacturing";

  const companies =
    syntheticIndustryData[selectedIndustry];

  const definitions =
    getKpiDefinitions(selectedIndustry);

  const metrics = definitions.map(
    (kpi) => kpi.key
  );

  const averages = {};
  const medians = {};
  const topPerformers = {};

  metrics.forEach((metric) => {
    averages[metric] = calculateAverage(
      companies,
      metric
    );

    medians[metric] = calculateMedian(
      companies,
      metric
    );

    topPerformers[metric] =
      findTopPerformer(companies, metric);
  });

  return {
    industry: selectedIndustry,
    numberOfCompanies: companies.length,
    averages,
    medians,
    topPerformers,
  };
}

// ============================================================
// 4. PRIORITY LOGIC
// ============================================================

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

// ============================================================
// 5. RECOMMENDATION LIBRARY
// ============================================================

const metricRecommendationActions = {
  productivity: [
    "Review production attainment against the production plan.",
    "Investigate labour-efficiency losses and production delays.",
    "Review downtime, bottlenecks and standard work.",
  ],

  quality: [
    "Use a Pareto analysis to identify the largest defect categories.",
    "Conduct root-cause analysis on repeated defects.",
    "Review inspection controls and standard operating procedures.",
  ],

  oee: [
    "Separate OEE losses into availability, performance and quality.",
    "Investigate the largest equipment-loss category first.",
    "Review preventive maintenance and production stoppages.",
  ],

  capacityUtilisation: [
    "Compare available capacity with actual output and operating time.",
    "Review unused production capacity and scheduling losses.",
    "Investigate demand, bottlenecks and resource allocation.",
  ],

  downtimePerformance: [
    "Record downtime by cause and duration.",
    "Use Pareto analysis to identify the most frequent stoppages.",
    "Review preventive maintenance and breakdown response times.",
  ],

  scrapPerformance: [
    "Measure scrap and waste by product and process stage.",
    "Identify the main causes of material loss.",
    "Review process settings, material quality and operator methods.",
  ],

  delivery: [
    "Record late orders and identify the main reasons for delay.",
    "Review production, dispatch and delivery scheduling.",
    "Monitor lead time and order progress regularly.",
  ],

  inventoryPerformance: [
    "Review stock-outs, excess inventory and obsolete stock.",
    "Compare inventory levels with actual usage.",
    "Review replenishment rules and inventory-control methods.",
  ],

  energy: [
    "Measure energy consumption against useful output.",
    "Identify high-consumption equipment and processes.",
    "Set energy-reduction targets and monitor them regularly.",
  ],

  safety: [
    "Review failed safety inspections and open corrective actions.",
    "Investigate incidents and near misses.",
    "Monitor safety training, PPE compliance and corrective-action closure.",
  ],

  productionProductivity: [
    "Compare actual production with the production plan.",
    "Review labour use, line losses and output constraints.",
    "Investigate downtime and production bottlenecks.",
  ],

  firstPassQuality: [
    "Measure first-pass acceptance and rework separately.",
    "Analyse repeated defect categories.",
    "Review process controls and inspection points.",
  ],

  cycleTimePerformance: [
    "Compare actual cycle time with the standard cycle time.",
    "Identify stations causing cycle-time losses.",
    "Review line balance, waiting and work methods.",
  ],

  lineUtilisation: [
    "Review available line time against productive line time.",
    "Identify idle time and line stoppages.",
    "Improve line scheduling and resource availability.",
  ],

  reworkPerformance: [
    "Identify the main reasons for rework.",
    "Measure rework hours and cost.",
    "Use root-cause analysis to reduce repeated rework.",
  ],

  scheduleDelivery: [
    "Compare scheduled production with actual completion.",
    "Investigate production and material delays.",
    "Monitor order and production schedule adherence.",
  ],

  operationalProductivity: [
    "Measure orders or shipments processed per labour hour.",
    "Review warehouse flow and handling delays.",
    "Investigate low-throughput activities.",
  ],

  perfectOrder: [
    "Separate order failures into timing, quantity, condition and documentation.",
    "Identify the most common cause of imperfect orders.",
    "Develop corrective actions for repeated fulfilment failures.",
  ],

  orderAccuracy: [
    "Measure picking, quantity and documentation errors separately.",
    "Investigate repeated fulfilment errors.",
    "Review picking and verification controls.",
  ],

  fleetUtilisation: [
    "Compare available fleet hours with productive operating hours.",
    "Identify idle vehicles and low-utilisation routes.",
    "Review fleet planning and vehicle allocation.",
  ],

  costPerformance: [
    "Break total cost into the main cost drivers.",
    "Compare actual cost with the planned or target cost.",
    "Investigate the largest causes of cost variance.",
  ],

  emptyRunningPerformance: [
    "Measure loaded and empty kilometres separately.",
    "Review route planning and backhaul opportunities.",
    "Reduce unnecessary empty vehicle movements.",
  ],

  fuelEnergyEfficiency: [
    "Measure fuel or energy consumption per kilometre and delivery.",
    "Review vehicle loading, routing and driving behaviour.",
    "Investigate unusually high-consumption vehicles.",
  ],

  labourProductivity: [
    "Compare completed work with labour hours used.",
    "Identify low-productivity activities and waiting time.",
    "Review crew allocation and work methods.",
  ],

  schedulePerformance: [
    "Compare planned progress with actual progress.",
    "Identify activities causing schedule delay.",
    "Review critical activities and recovery actions.",
  ],

  firstTimeAcceptance: [
    "Measure work accepted at the first inspection.",
    "Analyse defects, snags and non-conformance reports.",
    "Review workmanship and inspection controls.",
  ],

  labourUtilisation: [
    "Separate productive, idle and waiting labour hours.",
    "Identify the main causes of lost labour time.",
    "Improve work planning and resource coordination.",
  ],

  equipmentUtilisation: [
    "Compare available equipment hours with productive hours.",
    "Identify idle and breakdown time.",
    "Improve equipment planning and maintenance.",
  ],

  milestoneCompletion: [
    "Compare planned milestones with milestones achieved on time.",
    "Identify reasons for delayed milestones.",
    "Assign recovery actions to critical delays.",
  ],

  energyFuelEfficiency: [
    "Measure fuel or electricity against completed work.",
    "Identify high-consumption equipment.",
    "Monitor idle equipment and unnecessary fuel use.",
  ],

  productionYield: [
    "Compare raw-material input with good finished-product output.",
    "Measure process loss and waste separately.",
    "Investigate the largest yield-loss points.",
  ],

  wastePerformance: [
    "Measure product loss, spoilage and packaging waste separately.",
    "Identify the main sources of waste.",
    "Set waste-reduction targets and monitor progress.",
  ],

  processCompliance: [
    "Review failed food-quality and process checks.",
    "Close corrective actions from hygiene and process inspections.",
    "Monitor repeated compliance failures.",
  ],
};

const industryActions = {
  Manufacturing:
    "Review production flow, equipment use, standard work and material availability.",

  Automotive:
    "Review line balance, component availability, workstation performance and line stoppages.",

  Logistics:
    "Review warehouse flow, fleet planning, loading performance and transport scheduling.",

  Construction:
    "Review site planning, labour allocation, equipment scheduling and material availability.",

  "Food Processing":
    "Review production yield, process conditions, hygiene controls and material losses.",
};

// ============================================================
// 6. RECOMMENDATIONS
// ============================================================

export function generateRecommendation(
  metric,
  result,
  benchmark,
  industry
) {
  const definition = getKpiDefinitions(
    industry
  ).find((kpi) => kpi.key === metric);

  const gap = Number(
    (result - benchmark).toFixed(1)
  );

  const priorityInformation =
    determinePriority(gap);

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
      finalTarget: Math.max(
        result,
        benchmark
      ),
      actions: [
        "Maintain the current level of performance.",
        "Continue monitoring this KPI every reporting period.",
        "Document and share the practices producing the good result.",
      ],
    };
  }

  const shortTermTarget = Math.min(
    benchmark,
    result +
      priorityInformation.shortTermIncrease
  );

  const metricActions =
    metricRecommendationActions[metric] || [
      "Review the input data and identify the main causes of the performance gap.",
      "Investigate the process areas contributing most to the result.",
      "Develop and monitor a targeted improvement action plan.",
    ];

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
    priority:
      priorityInformation.priority,
    improvementNeeded: Math.abs(gap),
    shortTermTarget: Number(
      shortTermTarget.toFixed(1)
    ),
    finalTarget: benchmark,
    actions: [
      industryAction,
      ...metricActions,
    ],
  };
}

export function generateCompanyRecommendations(
  companyResults,
  industryStatistics,
  industry
) {
  const metrics = getKpiDefinitions(
    industry
  ).map((kpi) => kpi.key);

  return metrics
    .map((metric) =>
      generateRecommendation(
        metric,
        Number(companyResults[metric] || 0),
        industryStatistics.averages[metric],
        industry
      )
    )
    .filter(
      (recommendation) =>
        recommendation.gap < 0
    )
    .sort((a, b) => a.gap - b.gap);
}

// ============================================================
// 7. WEIGHTED SCORE
// ============================================================

export function calculateWeightedScore(
  companyResults,
  industry = "Manufacturing"
) {
  const definitions =
    getKpiDefinitions(industry);

  const totalScore = definitions.reduce(
    (total, kpi) => {
      const result = Number(
        companyResults[kpi.key] || 0
      );

      return (
        total +
        result * (kpi.weight / 100)
      );
    },
    0
  );

  return Number(totalScore.toFixed(1));
}