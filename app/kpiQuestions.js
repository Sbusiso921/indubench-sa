// ============================================================
// INDUBENCH SA
// Manufacturing KPI question bank and calculation engine
// ============================================================

function clampScore(value) {
  if (!Number.isFinite(value)) return 0;

  return Math.max(
    0,
    Math.min(100, Number(value))
  );
}

function round(value, decimals = 1) {
  return Number(
    Number(value).toFixed(decimals)
  );
}

function validPositive(value) {
  return Number(value) > 0;
}

function validZeroOrMore(value) {
  return Number(value) >= 0;
}

// ============================================================
// 1. QUESTION BANK
// ============================================================

export const kpiQuestionBank = {
  Manufacturing: {
    // --------------------------------------------------------
    // KPI 1 - PRODUCTIVITY
    // --------------------------------------------------------
    productivity: {
      name: "Productivity",

      description:
        "Measures production attainment, labour efficiency and productive use of planned production time.",

      questions: [
        {
          id: "plannedOutput",
          label:
            "What was the planned production output for the period?",
          unit: "units",
        },
        {
          id: "actualOutput",
          label:
            "What was the actual production output for the period?",
          unit: "units",
        },
        {
          id: "standardLabourHours",
          label:
            "How many standard labour hours should have been required for the actual output?",
          unit: "hours",
        },
        {
          id: "actualLabourHours",
          label:
            "How many labour hours were actually used?",
          unit: "hours",
        },
        {
          id: "plannedProductionHours",
          label:
            "How many production hours were planned?",
          unit: "hours",
        },
        {
          id: "downtimeHours",
          label:
            "How many production hours were lost due to downtime?",
          unit: "hours",
        },
      ],
    },

    // --------------------------------------------------------
    // KPI 2 - QUALITY RATE
    // --------------------------------------------------------
    quality: {
      name: "Quality Rate",

      description:
        "Measures first-pass quality, defects, rework and customer-return performance.",

      questions: [
        {
          id: "qualityTotalUnits",
          label:
            "How many total units were produced during the period?",
          unit: "units",
        },
        {
          id: "qualityFirstPassGoodUnits",
          label:
            "How many units passed quality inspection the first time without rework?",
          unit: "units",
        },
        {
          id: "qualityDefectiveUnits",
          label:
            "How many defective units were identified?",
          unit: "units",
        },
        {
          id: "qualityReworkedUnits",
          label:
            "How many units required rework?",
          unit: "units",
        },
        {
          id: "qualityCustomerReturns",
          label:
            "How many units were returned by customers because of quality problems?",
          unit: "units",
        },
      ],
    },

    // --------------------------------------------------------
    // KPI 3 - OEE
    // --------------------------------------------------------
    oee: {
      name:
        "Overall Equipment Effectiveness (OEE)",

      description:
        "Measures equipment availability, performance and quality using production-time data.",

      questions: [
        {
          id: "oeePlannedProductionMinutes",
          label:
            "How many minutes of production time were planned?",
          unit: "minutes",
        },
        {
          id: "oeeDowntimeMinutes",
          label:
            "How many minutes of downtime occurred during the planned production time?",
          unit: "minutes",
        },
        {
          id: "oeeIdealCycleTime",
          label:
            "What is the ideal cycle time per unit?",
          unit: "minutes/unit",
        },
        {
          id: "oeeTotalUnits",
          label:
            "How many total units were produced?",
          unit: "units",
        },
        {
          id: "oeeGoodUnits",
          label:
            "How many good units were produced?",
          unit: "units",
        },
      ],
    },

    // --------------------------------------------------------
    // KPI 4 - CAPACITY UTILISATION
    // --------------------------------------------------------
    capacityUtilisation: {
      name: "Capacity Utilisation",

      description:
        "Measures how much available production capacity was actually used.",

      questions: [
        {
          id: "capacityMaximumOutput",
          label:
            "What was the maximum possible output for the period at available capacity?",
          unit: "units",
        },
        {
          id: "capacityActualOutput",
          label:
            "What was the actual output for the period?",
          unit: "units",
        },
        {
          id: "capacityAvailableHours",
          label:
            "How many production hours were available?",
          unit: "hours",
        },
        {
          id: "capacityUsedHours",
          label:
            "How many of the available production hours were actually used?",
          unit: "hours",
        },
      ],
    },

    // --------------------------------------------------------
    // KPI 5 - DOWNTIME PERFORMANCE
    // --------------------------------------------------------
    downtimePerformance: {
      name: "Downtime Performance",

      description:
        "Measures the proportion of planned operating time that remained productive after downtime losses.",

      questions: [
        {
          id: "dtPlannedOperatingHours",
          label:
            "How many operating hours were planned?",
          unit: "hours",
        },
        {
          id: "dtBreakdownHours",
          label:
            "How many hours were lost to equipment breakdowns?",
          unit: "hours",
        },
        {
          id: "dtMaintenanceHours",
          label:
            "How many hours were lost to unplanned maintenance?",
          unit: "hours",
        },
        {
          id: "dtChangeoverHours",
          label:
            "How many hours were lost to changeovers or setup delays?",
          unit: "hours",
        },
        {
          id: "dtWaitingHours",
          label:
            "How many hours were lost while waiting for material, labour or information?",
          unit: "hours",
        },
      ],
    },

    // --------------------------------------------------------
    // KPI 6 - SCRAP / WASTE PERFORMANCE
    // --------------------------------------------------------
    scrapPerformance: {
      name: "Scrap / Waste Performance",

      description:
        "Measures material yield and the amount of production input lost through scrap and process waste.",

      questions: [
        {
          id: "scrapMaterialInput",
          label:
            "What was the total material input used during the period?",
          unit: "kg / units",
        },
        {
          id: "scrapGoodOutput",
          label:
            "How much good finished-product output was produced?",
          unit: "kg / units",
        },
        {
          id: "scrapQuantity",
          label:
            "How much material or product was scrapped?",
          unit: "kg / units",
        },
        {
          id: "processWasteQuantity",
          label:
            "How much additional process waste or loss occurred?",
          unit: "kg / units",
        },
      ],
    },

    // --------------------------------------------------------
    // KPI 7 - ON-TIME DELIVERY
    // --------------------------------------------------------
    delivery: {
      name: "On-Time Delivery",

      description:
        "Measures whether customer orders were delivered on time, in full and within the expected lead time.",

      questions: [
        {
          id: "deliveryOrdersDue",
          label:
            "How many customer orders were due for delivery during the period?",
          unit: "orders",
        },
        {
          id: "deliveryOrdersOnTime",
          label:
            "How many orders were delivered on or before the promised date?",
          unit: "orders",
        },
        {
          id: "deliveryOrdersInFull",
          label:
            "How many orders were delivered in full?",
          unit: "orders",
        },
        {
          id: "deliveryAverageLeadTime",
          label:
            "What was the actual average order lead time?",
          unit: "days",
        },
        {
          id: "deliveryTargetLeadTime",
          label:
            "What is the target order lead time?",
          unit: "days",
        },
      ],
    },

    // --------------------------------------------------------
    // KPI 8 - INVENTORY PERFORMANCE
    // --------------------------------------------------------
    inventoryPerformance: {
      name: "Inventory Performance",

      description:
        "Measures inventory turnover, stock availability and obsolete-stock control.",

      questions: [
        {
          id: "inventoryUsageValue",
          label:
            "What was the cost or value of inventory used during the period?",
          unit: "R / value",
        },
        {
          id: "inventoryAverageValue",
          label:
            "What was the average inventory value held during the same period?",
          unit: "R / value",
        },
        {
          id: "inventoryTargetTurns",
          label:
            "What is the target inventory-turnover rate for the period?",
          unit: "turns",
        },
        {
          id: "inventoryStockRequests",
          label:
            "How many stock requests or material requirements occurred?",
          unit: "requests",
        },
        {
          id: "inventoryStockoutEvents",
          label:
            "How many stock-out events occurred?",
          unit: "events",
        },
        {
          id: "inventoryObsoleteValue",
          label:
            "What was the value of obsolete or unusable inventory?",
          unit: "R / value",
        },
      ],
    },

    // --------------------------------------------------------
    // KPI 9 - ENERGY EFFICIENCY
    // --------------------------------------------------------
    energy: {
      name: "Energy Efficiency",

      description:
        "Measures energy consumption relative to useful production output and compares it with target and baseline consumption.",

      questions: [
        {
          id: "energyTotalUsed",
          label:
            "How much total energy was consumed during the period?",
          unit: "kWh",
        },
        {
          id: "energyGoodUnits",
          label:
            "How many good units were produced during the same period?",
          unit: "units",
        },
        {
          id: "energyTargetPerUnit",
          label:
            "What is the target energy consumption per good unit?",
          unit: "kWh/unit",
        },
        {
          id: "energyBaselinePerUnit",
          label:
            "What is the previous or baseline energy consumption per good unit?",
          unit: "kWh/unit",
        },
      ],
    },

    // --------------------------------------------------------
    // KPI 10 - SAFETY COMPLIANCE
    // --------------------------------------------------------
    safety: {
      name: "Safety Compliance",

      description:
        "Measures safety inspection compliance, corrective-action closure and required safety training completion.",

      questions: [
        {
          id: "safetyRequiredInspections",
          label:
            "How many safety inspections or checks were required?",
          unit: "checks",
        },
        {
          id: "safetyPassedInspections",
          label:
            "How many required safety inspections or checks were passed?",
          unit: "checks",
        },
        {
          id: "safetyActionsRaised",
          label:
            "How many safety corrective actions were raised?",
          unit: "actions",
        },
        {
          id: "safetyActionsClosed",
          label:
            "How many safety corrective actions were closed?",
          unit: "actions",
        },
        {
          id: "safetyTrainingRequired",
          label:
            "How many required employee safety-training completions were expected?",
          unit: "completions",
        },
        {
          id: "safetyTrainingCompleted",
          label:
            "How many required safety-training completions were achieved?",
          unit: "completions",
        },
        {
          id: "safetyRecordableIncidents",
          label:
            "How many recordable safety incidents occurred during the period?",
          unit: "incidents",
        },
      ],
    },
  },
};

// ============================================================
// 2. KPI CALCULATION FUNCTIONS
// ============================================================

// ------------------------------------------------------------
// KPI 1 - PRODUCTIVITY
// ------------------------------------------------------------

export function calculateManufacturingProductivity(
  answers
) {
  const plannedOutput = Number(
    answers.plannedOutput
  );

  const actualOutput = Number(
    answers.actualOutput
  );

  const standardLabourHours = Number(
    answers.standardLabourHours
  );

  const actualLabourHours = Number(
    answers.actualLabourHours
  );

  const plannedProductionHours = Number(
    answers.plannedProductionHours
  );

  const downtimeHours = Number(
    answers.downtimeHours
  );

  if (
    !validPositive(plannedOutput) ||
    !validZeroOrMore(actualOutput) ||
    !validPositive(standardLabourHours) ||
    !validPositive(actualLabourHours) ||
    !validPositive(plannedProductionHours) ||
    !validZeroOrMore(downtimeHours) ||
    downtimeHours > plannedProductionHours
  ) {
    return null;
  }

  const productionAttainment = clampScore(
    (actualOutput / plannedOutput) * 100
  );

  const labourEfficiency = clampScore(
    (standardLabourHours /
      actualLabourHours) *
      100
  );

  const productionTimeUtilisation =
    clampScore(
      ((plannedProductionHours -
        downtimeHours) /
        plannedProductionHours) *
        100
    );

  const finalScore =
    productionAttainment * 0.4 +
    labourEfficiency * 0.35 +
    productionTimeUtilisation * 0.25;

  return {
    finalScore: round(finalScore),

    breakdown: {
      productionAttainment: round(
        productionAttainment
      ),

      labourEfficiency: round(
        labourEfficiency
      ),

      productionTimeUtilisation: round(
        productionTimeUtilisation
      ),
    },
  };
}

// ------------------------------------------------------------
// KPI 2 - QUALITY
// ------------------------------------------------------------

export function calculateManufacturingQuality(
  answers
) {
  const totalUnits = Number(
    answers.qualityTotalUnits
  );

  const firstPassGood = Number(
    answers.qualityFirstPassGoodUnits
  );

  const defectiveUnits = Number(
    answers.qualityDefectiveUnits
  );

  const reworkedUnits = Number(
    answers.qualityReworkedUnits
  );

  const customerReturns = Number(
    answers.qualityCustomerReturns
  );

  if (
    !validPositive(totalUnits) ||
    !validZeroOrMore(firstPassGood) ||
    !validZeroOrMore(defectiveUnits) ||
    !validZeroOrMore(reworkedUnits) ||
    !validZeroOrMore(customerReturns) ||
    firstPassGood > totalUnits ||
    defectiveUnits > totalUnits ||
    reworkedUnits > totalUnits ||
    customerReturns > totalUnits
  ) {
    return null;
  }

  const firstPassYield = clampScore(
    (firstPassGood / totalUnits) * 100
  );

  const defectPerformance = clampScore(
    100 -
      (defectiveUnits / totalUnits) *
        100
  );

  const reworkPerformance = clampScore(
    100 -
      (reworkedUnits / totalUnits) *
        100
  );

  const customerReturnPerformance =
    clampScore(
      100 -
        (customerReturns / totalUnits) *
          100
    );

  const finalScore =
    firstPassYield * 0.4 +
    defectPerformance * 0.25 +
    reworkPerformance * 0.2 +
    customerReturnPerformance * 0.15;

  return {
    finalScore: round(finalScore),

    breakdown: {
      firstPassYield: round(
        firstPassYield
      ),

      defectPerformance: round(
        defectPerformance
      ),

      reworkPerformance: round(
        reworkPerformance
      ),

      customerReturnPerformance: round(
        customerReturnPerformance
      ),
    },
  };
}

// ------------------------------------------------------------
// KPI 3 - OEE
// ------------------------------------------------------------

export function calculateManufacturingOEE(
  answers
) {
  const plannedMinutes = Number(
    answers.oeePlannedProductionMinutes
  );

  const downtimeMinutes = Number(
    answers.oeeDowntimeMinutes
  );

  const idealCycleTime = Number(
    answers.oeeIdealCycleTime
  );

  const totalUnits = Number(
    answers.oeeTotalUnits
  );

  const goodUnits = Number(
    answers.oeeGoodUnits
  );

  if (
    !validPositive(plannedMinutes) ||
    !validZeroOrMore(downtimeMinutes) ||
    downtimeMinutes >= plannedMinutes ||
    !validPositive(idealCycleTime) ||
    !validPositive(totalUnits) ||
    !validZeroOrMore(goodUnits) ||
    goodUnits > totalUnits
  ) {
    return null;
  }

  const operatingTime =
    plannedMinutes - downtimeMinutes;

  const availability = clampScore(
    (operatingTime / plannedMinutes) * 100
  );

  const performance = clampScore(
    ((idealCycleTime * totalUnits) /
      operatingTime) *
      100
  );

  const quality = clampScore(
    (goodUnits / totalUnits) * 100
  );

  const oee =
    (availability / 100) *
    (performance / 100) *
    (quality / 100) *
    100;

  return {
    finalScore: round(oee),

    breakdown: {
      availability: round(availability),
      performance: round(performance),
      quality: round(quality),
    },
  };
}

// ------------------------------------------------------------
// KPI 4 - CAPACITY UTILISATION
// ------------------------------------------------------------

export function calculateManufacturingCapacity(
  answers
) {
  const maximumOutput = Number(
    answers.capacityMaximumOutput
  );

  const actualOutput = Number(
    answers.capacityActualOutput
  );

  const availableHours = Number(
    answers.capacityAvailableHours
  );

  const usedHours = Number(
    answers.capacityUsedHours
  );

  if (
    !validPositive(maximumOutput) ||
    !validZeroOrMore(actualOutput) ||
    !validPositive(availableHours) ||
    !validZeroOrMore(usedHours) ||
    usedHours > availableHours
  ) {
    return null;
  }

  const outputUtilisation = clampScore(
    (actualOutput / maximumOutput) * 100
  );

  const timeUtilisation = clampScore(
    (usedHours / availableHours) * 100
  );

  const finalScore =
    outputUtilisation * 0.7 +
    timeUtilisation * 0.3;

  return {
    finalScore: round(finalScore),

    breakdown: {
      outputUtilisation: round(
        outputUtilisation
      ),

      timeUtilisation: round(
        timeUtilisation
      ),
    },
  };
}

// ------------------------------------------------------------
// KPI 5 - DOWNTIME PERFORMANCE
// ------------------------------------------------------------

export function calculateManufacturingDowntime(
  answers
) {
  const plannedHours = Number(
    answers.dtPlannedOperatingHours
  );

  const breakdownHours = Number(
    answers.dtBreakdownHours
  );

  const maintenanceHours = Number(
    answers.dtMaintenanceHours
  );

  const changeoverHours = Number(
    answers.dtChangeoverHours
  );

  const waitingHours = Number(
    answers.dtWaitingHours
  );

  const downtimeValues = [
    breakdownHours,
    maintenanceHours,
    changeoverHours,
    waitingHours,
  ];

  if (
    !validPositive(plannedHours) ||
    downtimeValues.some(
      (value) => !validZeroOrMore(value)
    )
  ) {
    return null;
  }

  const totalDowntime =
    breakdownHours +
    maintenanceHours +
    changeoverHours +
    waitingHours;

  if (totalDowntime > plannedHours) {
    return null;
  }

  const downtimeRate =
    (totalDowntime / plannedHours) *
    100;

  const finalScore = clampScore(
    100 - downtimeRate
  );

  return {
    finalScore: round(finalScore),

    breakdown: {
      totalDowntimeHours: round(
        totalDowntime,
        2
      ),

      downtimeRate: round(downtimeRate),

      productiveTimeRate: round(
        finalScore
      ),
    },
  };
}

// ------------------------------------------------------------
// KPI 6 - SCRAP / WASTE PERFORMANCE
// ------------------------------------------------------------

export function calculateManufacturingScrap(
  answers
) {
  const materialInput = Number(
    answers.scrapMaterialInput
  );

  const goodOutput = Number(
    answers.scrapGoodOutput
  );

  const scrapQuantity = Number(
    answers.scrapQuantity
  );

  const processWaste = Number(
    answers.processWasteQuantity
  );

  if (
    !validPositive(materialInput) ||
    !validZeroOrMore(goodOutput) ||
    !validZeroOrMore(scrapQuantity) ||
    !validZeroOrMore(processWaste) ||
    goodOutput > materialInput
  ) {
    return null;
  }

  const totalLoss =
    scrapQuantity + processWaste;

  if (totalLoss > materialInput) {
    return null;
  }

  const materialYield = clampScore(
    (goodOutput / materialInput) * 100
  );

  const wasteRate =
    (totalLoss / materialInput) * 100;

  const wastePerformance = clampScore(
    100 - wasteRate
  );

  const finalScore =
    materialYield * 0.6 +
    wastePerformance * 0.4;

  return {
    finalScore: round(finalScore),

    breakdown: {
      materialYield: round(
        materialYield
      ),

      wasteRate: round(wasteRate),

      wastePerformance: round(
        wastePerformance
      ),
    },
  };
}

// ------------------------------------------------------------
// KPI 7 - DELIVERY
// ------------------------------------------------------------

export function calculateManufacturingDelivery(
  answers
) {
  const ordersDue = Number(
    answers.deliveryOrdersDue
  );

  const ordersOnTime = Number(
    answers.deliveryOrdersOnTime
  );

  const ordersInFull = Number(
    answers.deliveryOrdersInFull
  );

  const averageLeadTime = Number(
    answers.deliveryAverageLeadTime
  );

  const targetLeadTime = Number(
    answers.deliveryTargetLeadTime
  );

  if (
    !validPositive(ordersDue) ||
    !validZeroOrMore(ordersOnTime) ||
    !validZeroOrMore(ordersInFull) ||
    ordersOnTime > ordersDue ||
    ordersInFull > ordersDue ||
    !validPositive(averageLeadTime) ||
    !validPositive(targetLeadTime)
  ) {
    return null;
  }

  const onTimeRate = clampScore(
    (ordersOnTime / ordersDue) * 100
  );

  const inFullRate = clampScore(
    (ordersInFull / ordersDue) * 100
  );

  const leadTimePerformance =
    clampScore(
      (targetLeadTime /
        averageLeadTime) *
        100
    );

  const finalScore =
    onTimeRate * 0.45 +
    inFullRate * 0.35 +
    leadTimePerformance * 0.2;

  return {
    finalScore: round(finalScore),

    breakdown: {
      onTimeRate: round(onTimeRate),
      inFullRate: round(inFullRate),

      leadTimePerformance: round(
        leadTimePerformance
      ),
    },
  };
}

// ------------------------------------------------------------
// KPI 8 - INVENTORY PERFORMANCE
// ------------------------------------------------------------

export function calculateManufacturingInventory(
  answers
) {
  const usageValue = Number(
    answers.inventoryUsageValue
  );

  const averageInventoryValue = Number(
    answers.inventoryAverageValue
  );

  const targetTurns = Number(
    answers.inventoryTargetTurns
  );

  const stockRequests = Number(
    answers.inventoryStockRequests
  );

  const stockoutEvents = Number(
    answers.inventoryStockoutEvents
  );

  const obsoleteValue = Number(
    answers.inventoryObsoleteValue
  );

  if (
    !validPositive(usageValue) ||
    !validPositive(
      averageInventoryValue
    ) ||
    !validPositive(targetTurns) ||
    !validPositive(stockRequests) ||
    !validZeroOrMore(stockoutEvents) ||
    stockoutEvents > stockRequests ||
    !validZeroOrMore(obsoleteValue) ||
    obsoleteValue >
      averageInventoryValue
  ) {
    return null;
  }

  const actualTurns =
    usageValue /
    averageInventoryValue;

  const turnoverPerformance =
    clampScore(
      (actualTurns / targetTurns) * 100
    );

  const availabilityPerformance =
    clampScore(
      100 -
        (stockoutEvents /
          stockRequests) *
          100
    );

  const obsoletePerformance =
    clampScore(
      100 -
        (obsoleteValue /
          averageInventoryValue) *
          100
    );

  const finalScore =
    turnoverPerformance * 0.4 +
    availabilityPerformance * 0.35 +
    obsoletePerformance * 0.25;

  return {
    finalScore: round(finalScore),

    breakdown: {
      actualInventoryTurns: round(
        actualTurns,
        2
      ),

      turnoverPerformance: round(
        turnoverPerformance
      ),

      stockAvailabilityPerformance:
        round(
          availabilityPerformance
        ),

      obsoleteInventoryPerformance:
        round(obsoletePerformance),
    },
  };
}

// ------------------------------------------------------------
// KPI 9 - ENERGY EFFICIENCY
// ------------------------------------------------------------

export function calculateManufacturingEnergy(
  answers
) {
  const totalEnergy = Number(
    answers.energyTotalUsed
  );

  const goodUnits = Number(
    answers.energyGoodUnits
  );

  const targetPerUnit = Number(
    answers.energyTargetPerUnit
  );

  const baselinePerUnit = Number(
    answers.energyBaselinePerUnit
  );

  if (
    !validPositive(totalEnergy) ||
    !validPositive(goodUnits) ||
    !validPositive(targetPerUnit) ||
    !validPositive(baselinePerUnit)
  ) {
    return null;
  }

  const actualEnergyPerUnit =
    totalEnergy / goodUnits;

  const targetPerformance =
    clampScore(
      (targetPerUnit /
        actualEnergyPerUnit) *
        100
    );

  const baselinePerformance =
    clampScore(
      (baselinePerUnit /
        actualEnergyPerUnit) *
        100
    );

  const finalScore =
    targetPerformance * 0.6 +
    baselinePerformance * 0.4;

  return {
    finalScore: round(finalScore),

    breakdown: {
      actualEnergyPerUnit: round(
        actualEnergyPerUnit,
        2
      ),

      targetPerformance: round(
        targetPerformance
      ),

      baselinePerformance: round(
        baselinePerformance
      ),
    },
  };
}

// ------------------------------------------------------------
// KPI 10 - SAFETY COMPLIANCE
// ------------------------------------------------------------

export function calculateManufacturingSafety(
  answers
) {
  const inspectionsRequired = Number(
    answers.safetyRequiredInspections
  );

  const inspectionsPassed = Number(
    answers.safetyPassedInspections
  );

  const actionsRaised = Number(
    answers.safetyActionsRaised
  );

  const actionsClosed = Number(
    answers.safetyActionsClosed
  );

  const trainingRequired = Number(
    answers.safetyTrainingRequired
  );

  const trainingCompleted = Number(
    answers.safetyTrainingCompleted
  );

  const incidents = Number(
    answers.safetyRecordableIncidents
  );

  if (
    !validPositive(
      inspectionsRequired
    ) ||
    !validZeroOrMore(
      inspectionsPassed
    ) ||
    inspectionsPassed >
      inspectionsRequired ||
    !validZeroOrMore(actionsRaised) ||
    !validZeroOrMore(actionsClosed) ||
    actionsClosed > actionsRaised ||
    !validPositive(trainingRequired) ||
    !validZeroOrMore(
      trainingCompleted
    ) ||
    trainingCompleted >
      trainingRequired ||
    !validZeroOrMore(incidents)
  ) {
    return null;
  }

  const inspectionPerformance =
    clampScore(
      (inspectionsPassed /
        inspectionsRequired) *
        100
    );

  const correctiveActionPerformance =
    actionsRaised === 0
      ? 100
      : clampScore(
          (actionsClosed /
            actionsRaised) *
            100
        );

  const trainingPerformance =
    clampScore(
      (trainingCompleted /
        trainingRequired) *
        100
    );

  const finalScore =
    inspectionPerformance * 0.4 +
    correctiveActionPerformance *
      0.35 +
    trainingPerformance * 0.25;

  return {
    finalScore: round(finalScore),

    breakdown: {
      inspectionPerformance: round(
        inspectionPerformance
      ),

      correctiveActionClosure: round(
        correctiveActionPerformance
      ),

      trainingCompletion: round(
        trainingPerformance
      ),

      recordableIncidents: incidents,
    },
  };
}

// ============================================================
// 3. FULL MANUFACTURING ASSESSMENT
// ============================================================

export function calculateManufacturingAssessment(
  answers
) {
  const calculations = {
    productivity:
      calculateManufacturingProductivity(
        answers
      ),

    quality:
      calculateManufacturingQuality(
        answers
      ),

    oee:
      calculateManufacturingOEE(
        answers
      ),

    capacityUtilisation:
      calculateManufacturingCapacity(
        answers
      ),

    downtimePerformance:
      calculateManufacturingDowntime(
        answers
      ),

    scrapPerformance:
      calculateManufacturingScrap(
        answers
      ),

    delivery:
      calculateManufacturingDelivery(
        answers
      ),

    inventoryPerformance:
      calculateManufacturingInventory(
        answers
      ),

    energy:
      calculateManufacturingEnergy(
        answers
      ),

    safety:
      calculateManufacturingSafety(
        answers
      ),
  };

  const invalidKpis = Object.entries(
    calculations
  )
    .filter(
      ([, calculation]) =>
        calculation === null
    )
    .map(([key]) => key);

  if (invalidKpis.length > 0) {
    return {
      success: false,
      invalidKpis,
      calculations,
    };
  }

  const scores = {};

  Object.entries(calculations).forEach(
    ([key, calculation]) => {
      scores[key] =
        calculation.finalScore;
    }
  );

  return {
    success: true,
    scores,
    calculations,
  };
}