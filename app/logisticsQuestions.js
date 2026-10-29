// ============================================================
// INDUBENCH SA
// LOGISTICS KPI QUESTION BANK + CALCULATION ENGINE
// ============================================================

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function clampScore(value) {
  if (!Number.isFinite(value)) {
    return null;
  }

  return Math.min(
    100,
    Math.max(0, value)
  );
}

function round(value) {
  return Number(
    value.toFixed(1)
  );
}

function validPositive(value) {
  return (
    Number.isFinite(value) &&
    value > 0
  );
}

function validZeroOrMore(value) {
  return (
    Number.isFinite(value) &&
    value >= 0
  );
}

// ============================================================
// LOGISTICS QUESTION BANK
// ============================================================

export const logisticsQuestionBank = {
  // ==========================================================
  // KPI 1 — OPERATIONAL PRODUCTIVITY
  // ==========================================================

  operationalProductivity: {
    name:
      "Operational Productivity",

    description:
      "Measures how effectively the logistics operation processes orders or shipments compared with the planned workload and labour productivity target.",

    questions: [
      {
        id: "logProductivityPlannedOrders",
        label:
          "How many orders or shipments were planned for the period?",
        unit: "orders",
      },
      {
        id: "logProductivityActualOrders",
        label:
          "How many orders or shipments were actually processed?",
        unit: "orders",
      },
      {
        id: "logProductivityLabourHours",
        label:
          "How many labour hours were used to process the orders?",
        unit: "hours",
      },
      {
        id: "logProductivityTargetPerHour",
        label:
          "What is the target number of orders processed per labour hour?",
        unit: "orders/hour",
      },
    ],
  },

  // ==========================================================
  // KPI 2 — PERFECT ORDER FULFILMENT
  // ==========================================================

  perfectOrder: {
    name:
      "Perfect Order Fulfilment",

    description:
      "Measures how many customer orders were delivered completely, on time, damage-free and with correct documentation.",

    questions: [
      {
        id: "logPerfectTotalOrders",
        label:
          "How many total customer orders were completed?",
        unit: "orders",
      },
      {
        id: "logPerfectOrders",
        label:
          "How many orders met all perfect-order requirements?",
        unit: "orders",
      },
      {
        id: "logPerfectOnTimeOrders",
        label:
          "How many orders were delivered on time?",
        unit: "orders",
      },
      {
        id: "logPerfectCompleteOrders",
        label:
          "How many orders were delivered in full?",
        unit: "orders",
      },
      {
        id: "logPerfectDamageFreeOrders",
        label:
          "How many orders were delivered without product damage?",
        unit: "orders",
      },
      {
        id: "logPerfectDocumentationOrders",
        label:
          "How many orders had correct documentation?",
        unit: "orders",
      },
    ],
  },

  // ==========================================================
  // KPI 3 — ON-TIME DELIVERY
  // ==========================================================

  delivery: {
    name:
      "On-Time Delivery",

    description:
      "Measures how reliably customer orders are delivered by the promised date and within the expected delivery lead time.",

    questions: [
      {
        id: "logDeliveryOrdersDue",
        label:
          "How many customer orders were due for delivery?",
        unit: "orders",
      },
      {
        id: "logDeliveryOnTimeOrders",
        label:
          "How many orders were delivered on or before the promised date?",
        unit: "orders",
      },
      {
        id: "logDeliveryTotalDelivered",
        label:
          "How many of the due orders were actually delivered?",
        unit: "orders",
      },
      {
        id: "logDeliveryTargetLeadTime",
        label:
          "What is the target average delivery lead time?",
        unit: "hours",
      },
      {
        id: "logDeliveryActualLeadTime",
        label:
          "What was the actual average delivery lead time?",
        unit: "hours",
      },
    ],
  },

  // ==========================================================
  // KPI 4 — ORDER ACCURACY
  // ==========================================================

  orderAccuracy: {
    name:
      "Order Accuracy",

    description:
      "Measures whether customer orders were picked, packed, documented and dispatched correctly without errors.",

    questions: [
      {
        id: "logAccuracyTotalOrders",
        label:
          "How many customer orders were checked for accuracy?",
        unit: "orders",
      },
      {
        id: "logAccuracyCorrectOrders",
        label:
          "How many orders were completely accurate?",
        unit: "orders",
      },
      {
        id: "logAccuracyPickingErrors",
        label:
          "How many orders had picking errors?",
        unit: "orders",
      },
      {
        id: "logAccuracyQuantityErrors",
        label:
          "How many orders had incorrect quantities?",
        unit: "orders",
      },
      {
        id: "logAccuracyDocumentationErrors",
        label:
          "How many orders had documentation errors?",
        unit: "orders",
      },
    ],
  },

  // ==========================================================
  // KPI 5 — ORDER FULFILMENT CYCLE-TIME PERFORMANCE
  // ==========================================================

  cycleTimePerformance: {
    name:
      "Order Fulfilment Cycle-Time Performance",

    description:
      "Measures how quickly customer orders are processed from receipt to dispatch compared with the company's target cycle time.",

    questions: [
      {
        id: "logCycleTargetHours",
        label:
          "What is the target average order fulfilment cycle time?",
        unit: "hours/order",
      },
      {
        id: "logCycleActualHours",
        label:
          "What was the actual average order fulfilment cycle time?",
        unit: "hours/order",
      },
      {
        id: "logCycleTotalOrders",
        label:
          "How many orders were measured for cycle-time performance?",
        unit: "orders",
      },
      {
        id: "logCycleWithinTarget",
        label:
          "How many orders were completed within the target cycle time?",
        unit: "orders",
      },
    ],
  },

  // ==========================================================
  // KPI 6 — FLEET UTILISATION
  // ==========================================================

  fleetUtilisation: {
    name:
      "Fleet Utilisation",

    description:
      "Measures how effectively available delivery vehicles and vehicle operating time are used for productive logistics activities.",

    questions: [
      {
        id: "logFleetAvailableHours",
        label:
          "How many total fleet operating hours were available?",
        unit: "vehicle-hours",
      },
      {
        id: "logFleetProductiveHours",
        label:
          "How many fleet hours were used for productive transport operations?",
        unit: "vehicle-hours",
      },
      {
        id: "logFleetAvailableVehicles",
        label:
          "How many vehicles were available for operation?",
        unit: "vehicles",
      },
      {
        id: "logFleetUsedVehicles",
        label:
          "How many available vehicles were actually used?",
        unit: "vehicles",
      },
    ],
  },

  // ==========================================================
  // KPI 7 — COST PER DELIVERY PERFORMANCE
  // ==========================================================

  costPerformance: {
    name:
      "Cost per Delivery Performance",

    description:
      "Measures whether delivery operations are being completed within the company's target cost per delivery and overall transport budget.",

    questions: [
      {
        id: "logCostTotalDeliveryCost",
        label:
          "What was the total delivery or transport cost for the period?",
        unit: "R",
      },
      {
        id: "logCostTotalDeliveries",
        label:
          "How many deliveries were completed during the period?",
        unit: "deliveries",
      },
      {
        id: "logCostTargetPerDelivery",
        label:
          "What is the company's target cost per delivery?",
        unit: "R/delivery",
      },
      {
        id: "logCostBudgetedTotal",
        label:
          "What was the total delivery or transport budget for the period?",
        unit: "R",
      },
    ],
  },

  // ==========================================================
  // KPI 8 — EMPTY-RUNNING PERFORMANCE
  // ==========================================================

  emptyRunningPerformance: {
    name:
      "Empty-Running Performance",

    description:
      "Measures how effectively transport kilometres are used by reducing vehicle travel without a productive load.",

    questions: [
      {
        id: "logEmptyTotalKm",
        label:
          "How many total kilometres were travelled by the fleet?",
        unit: "km",
      },
      {
        id: "logEmptyKm",
        label:
          "How many kilometres were travelled without a productive load?",
        unit: "km",
      },
      {
        id: "logEmptyTargetRate",
        label:
          "What is the company's maximum target empty-running rate?",
        unit: "%",
      },
    ],
  },

  // ==========================================================
  // KPI 9 — FUEL / ENERGY EFFICIENCY
  // ==========================================================

  fuelEnergyEfficiency: {
    name:
      "Fuel / Energy Efficiency",

    description:
      "Measures fleet fuel or energy consumption relative to distance travelled and compares actual consumption with the company target and baseline.",

    questions: [
      {
        id: "logFuelTotalLitres",
        label:
          "How many litres of fuel were consumed by the fleet?",
        unit: "litres",
      },
      {
        id: "logFuelTotalKm",
        label:
          "How many total kilometres were travelled?",
        unit: "km",
      },
      {
        id: "logFuelTargetPer100Km",
        label:
          "What is the target fuel consumption per 100 kilometres?",
        unit: "L/100km",
      },
      {
        id: "logFuelBaselinePer100Km",
        label:
          "What was the previous or baseline fuel consumption per 100 kilometres?",
        unit: "L/100km",
      },
    ],
  },

  // ==========================================================
  // KPI 10 — SAFETY COMPLIANCE
  // ==========================================================

  safety: {
    name:
      "Safety Compliance",

    description:
      "Measures logistics safety performance using inspections, corrective actions, employee training and recordable incidents.",

    questions: [
      {
        id: "logSafetyRequiredInspections",
        label:
          "How many required vehicle, warehouse or workplace safety inspections were scheduled?",
        unit: "checks",
      },
      {
        id: "logSafetyPassedInspections",
        label:
          "How many required safety inspections were passed?",
        unit: "checks",
      },
      {
        id: "logSafetyActionsRaised",
        label:
          "How many safety corrective actions were raised?",
        unit: "actions",
      },
      {
        id: "logSafetyActionsClosed",
        label:
          "How many safety corrective actions were closed?",
        unit: "actions",
      },
      {
        id: "logSafetyTrainingRequired",
        label:
          "How many required employee safety-training completions were expected?",
        unit: "completions",
      },
      {
        id: "logSafetyTrainingCompleted",
        label:
          "How many required safety-training completions were achieved?",
        unit: "completions",
      },
      {
        id: "logSafetyIncidents",
        label:
          "How many recordable logistics safety incidents occurred?",
        unit: "incidents",
      },
    ],
  },
};

// ============================================================
// KPI 1 — OPERATIONAL PRODUCTIVITY
// ============================================================

function calculateOperationalProductivity(
  answers
) {
  const plannedOrders =
    Number(
      answers.logProductivityPlannedOrders
    );

  const actualOrders =
    Number(
      answers.logProductivityActualOrders
    );

  const labourHours =
    Number(
      answers.logProductivityLabourHours
    );

  const targetPerHour =
    Number(
      answers.logProductivityTargetPerHour
    );

  if (
    !validPositive(plannedOrders) ||
    !validZeroOrMore(actualOrders) ||
    !validPositive(labourHours) ||
    !validPositive(targetPerHour)
  ) {
    return null;
  }

  const throughputAttainment =
    clampScore(
      (actualOrders /
        plannedOrders) *
        100
    );

  const actualPerHour =
    actualOrders /
    labourHours;

  const labourProductivityPerformance =
    clampScore(
      (actualPerHour /
        targetPerHour) *
        100
    );

  const finalScore =
    clampScore(
      throughputAttainment *
        0.5 +
        labourProductivityPerformance *
          0.5
    );

  return {
    score:
      round(finalScore),

    breakdown: {
      throughputAttainment:
        round(
          throughputAttainment
        ),

      actualOrdersPerLabourHour:
        round(actualPerHour),

      labourProductivityPerformance:
        round(
          labourProductivityPerformance
        ),
    },
  };
}

// ============================================================
// KPI 2 — PERFECT ORDER FULFILMENT
// ============================================================

function calculatePerfectOrder(
  answers
) {
  const totalOrders =
    Number(
      answers.logPerfectTotalOrders
    );

  const perfectOrders =
    Number(
      answers.logPerfectOrders
    );

  const onTimeOrders =
    Number(
      answers.logPerfectOnTimeOrders
    );

  const completeOrders =
    Number(
      answers.logPerfectCompleteOrders
    );

  const damageFreeOrders =
    Number(
      answers.logPerfectDamageFreeOrders
    );

  const documentationOrders =
    Number(
      answers.logPerfectDocumentationOrders
    );

  if (
    !validPositive(totalOrders) ||
    !validZeroOrMore(perfectOrders) ||
    !validZeroOrMore(onTimeOrders) ||
    !validZeroOrMore(completeOrders) ||
    !validZeroOrMore(damageFreeOrders) ||
    !validZeroOrMore(
      documentationOrders
    ) ||
    perfectOrders > totalOrders ||
    onTimeOrders > totalOrders ||
    completeOrders > totalOrders ||
    damageFreeOrders >
      totalOrders ||
    documentationOrders >
      totalOrders
  ) {
    return null;
  }

  const perfectOrderRate =
    clampScore(
      (perfectOrders /
        totalOrders) *
        100
    );

  const onTimeRate =
    clampScore(
      (onTimeOrders /
        totalOrders) *
        100
    );

  const completeRate =
    clampScore(
      (completeOrders /
        totalOrders) *
        100
    );

  const damageFreeRate =
    clampScore(
      (damageFreeOrders /
        totalOrders) *
        100
    );

  const documentationAccuracy =
    clampScore(
      (documentationOrders /
        totalOrders) *
        100
    );

  const finalScore =
    clampScore(
      perfectOrderRate *
        0.5 +
        onTimeRate *
          0.125 +
        completeRate *
          0.125 +
        damageFreeRate *
          0.125 +
        documentationAccuracy *
          0.125
    );

  return {
    score:
      round(finalScore),

    breakdown: {
      perfectOrderRate:
        round(
          perfectOrderRate
        ),

      onTimeRate:
        round(onTimeRate),

      completeOrderRate:
        round(completeRate),

      damageFreeRate:
        round(damageFreeRate),

      documentationAccuracy:
        round(
          documentationAccuracy
        ),
    },
  };
}

// ============================================================
// KPI 3 — ON-TIME DELIVERY
// ============================================================

function calculateDelivery(
  answers
) {
  const ordersDue =
    Number(
      answers.logDeliveryOrdersDue
    );

  const onTimeOrders =
    Number(
      answers.logDeliveryOnTimeOrders
    );

  const totalDelivered =
    Number(
      answers.logDeliveryTotalDelivered
    );

  const targetLeadTime =
    Number(
      answers.logDeliveryTargetLeadTime
    );

  const actualLeadTime =
    Number(
      answers.logDeliveryActualLeadTime
    );

  if (
    !validPositive(ordersDue) ||
    !validZeroOrMore(onTimeOrders) ||
    !validZeroOrMore(totalDelivered) ||
    onTimeOrders > ordersDue ||
    totalDelivered > ordersDue ||
    onTimeOrders >
      totalDelivered ||
    !validPositive(targetLeadTime) ||
    !validPositive(actualLeadTime)
  ) {
    return null;
  }

  const onTimeRate =
    clampScore(
      (onTimeOrders /
        ordersDue) *
        100
    );

  const deliveryCompletionRate =
    clampScore(
      (totalDelivered /
        ordersDue) *
        100
    );

  const leadTimePerformance =
    clampScore(
      (targetLeadTime /
        actualLeadTime) *
        100
    );

  const finalScore =
    clampScore(
      onTimeRate *
        0.55 +
        deliveryCompletionRate *
          0.15 +
        leadTimePerformance *
          0.3
    );

  return {
    score:
      round(finalScore),

    breakdown: {
      onTimeRate:
        round(onTimeRate),

      deliveryCompletionRate:
        round(
          deliveryCompletionRate
        ),

      leadTimePerformance:
        round(
          leadTimePerformance
        ),
    },
  };
}

// ============================================================
// KPI 4 — ORDER ACCURACY
// ============================================================

function calculateOrderAccuracy(
  answers
) {
  const totalOrders =
    Number(
      answers.logAccuracyTotalOrders
    );

  const correctOrders =
    Number(
      answers.logAccuracyCorrectOrders
    );

  const pickingErrors =
    Number(
      answers.logAccuracyPickingErrors
    );

  const quantityErrors =
    Number(
      answers.logAccuracyQuantityErrors
    );

  const documentationErrors =
    Number(
      answers.logAccuracyDocumentationErrors
    );

  if (
    !validPositive(totalOrders) ||
    !validZeroOrMore(correctOrders) ||
    !validZeroOrMore(pickingErrors) ||
    !validZeroOrMore(quantityErrors) ||
    !validZeroOrMore(
      documentationErrors
    ) ||
    correctOrders > totalOrders ||
    pickingErrors > totalOrders ||
    quantityErrors > totalOrders ||
    documentationErrors >
      totalOrders
  ) {
    return null;
  }

  const orderAccuracyRate =
    clampScore(
      (correctOrders /
        totalOrders) *
        100
    );

  const pickingPerformance =
    clampScore(
      100 -
        (pickingErrors /
          totalOrders) *
          100
    );

  const quantityPerformance =
    clampScore(
      100 -
        (quantityErrors /
          totalOrders) *
          100
    );

  const documentationPerformance =
    clampScore(
      100 -
        (documentationErrors /
          totalOrders) *
          100
    );

  const finalScore =
    clampScore(
      orderAccuracyRate *
        0.5 +
        pickingPerformance *
          0.2 +
        quantityPerformance *
          0.15 +
        documentationPerformance *
          0.15
    );

  return {
    score:
      round(finalScore),

    breakdown: {
      orderAccuracyRate:
        round(
          orderAccuracyRate
        ),

      pickingPerformance:
        round(
          pickingPerformance
        ),

      quantityPerformance:
        round(
          quantityPerformance
        ),

      documentationPerformance:
        round(
          documentationPerformance
        ),
    },
  };
}

// ============================================================
// KPI 5 — ORDER FULFILMENT CYCLE-TIME PERFORMANCE
// ============================================================

function calculateCycleTime(
  answers
) {
  const targetHours =
    Number(
      answers.logCycleTargetHours
    );

  const actualHours =
    Number(
      answers.logCycleActualHours
    );

  const totalOrders =
    Number(
      answers.logCycleTotalOrders
    );

  const withinTarget =
    Number(
      answers.logCycleWithinTarget
    );

  if (
    !validPositive(targetHours) ||
    !validPositive(actualHours) ||
    !validPositive(totalOrders) ||
    !validZeroOrMore(withinTarget) ||
    withinTarget > totalOrders
  ) {
    return null;
  }

  const cycleTimePerformance =
    clampScore(
      (targetHours /
        actualHours) *
        100
    );

  const targetAchievementRate =
    clampScore(
      (withinTarget /
        totalOrders) *
        100
    );

  const finalScore =
    clampScore(
      cycleTimePerformance *
        0.6 +
        targetAchievementRate *
          0.4
    );

  return {
    score:
      round(finalScore),

    breakdown: {
      actualCycleTime:
        round(actualHours),

      targetCycleTime:
        round(targetHours),

      cycleTimePerformance:
        round(
          cycleTimePerformance
        ),

      targetAchievementRate:
        round(
          targetAchievementRate
        ),
    },
  };
}

// ============================================================
// KPI 6 — FLEET UTILISATION
// ============================================================

function calculateFleetUtilisation(
  answers
) {
  const availableHours =
    Number(
      answers.logFleetAvailableHours
    );

  const productiveHours =
    Number(
      answers.logFleetProductiveHours
    );

  const availableVehicles =
    Number(
      answers.logFleetAvailableVehicles
    );

  const usedVehicles =
    Number(
      answers.logFleetUsedVehicles
    );

  if (
    !validPositive(availableHours) ||
    !validZeroOrMore(
      productiveHours
    ) ||
    productiveHours >
      availableHours ||
    !validPositive(
      availableVehicles
    ) ||
    !validZeroOrMore(
      usedVehicles
    ) ||
    usedVehicles >
      availableVehicles
  ) {
    return null;
  }

  const fleetTimeUtilisation =
    clampScore(
      (productiveHours /
        availableHours) *
        100
    );

  const vehicleUtilisation =
    clampScore(
      (usedVehicles /
        availableVehicles) *
        100
    );

  const finalScore =
    clampScore(
      fleetTimeUtilisation *
        0.7 +
        vehicleUtilisation *
          0.3
    );

  return {
    score:
      round(finalScore),

    breakdown: {
      fleetTimeUtilisation:
        round(
          fleetTimeUtilisation
        ),

      vehicleUtilisation:
        round(
          vehicleUtilisation
        ),
    },
  };
}

// ============================================================
// KPI 7 — COST PER DELIVERY PERFORMANCE
// ============================================================

function calculateCostPerformance(
  answers
) {
  const totalCost =
    Number(
      answers.logCostTotalDeliveryCost
    );

  const totalDeliveries =
    Number(
      answers.logCostTotalDeliveries
    );

  const targetCostPerDelivery =
    Number(
      answers.logCostTargetPerDelivery
    );

  const budgetedTotal =
    Number(
      answers.logCostBudgetedTotal
    );

  if (
    !validPositive(totalCost) ||
    !validPositive(
      totalDeliveries
    ) ||
    !validPositive(
      targetCostPerDelivery
    ) ||
    !validPositive(
      budgetedTotal
    )
  ) {
    return null;
  }

  const actualCostPerDelivery =
    totalCost /
    totalDeliveries;

  const targetCostPerformance =
    clampScore(
      (targetCostPerDelivery /
        actualCostPerDelivery) *
        100
    );

  const budgetPerformance =
    clampScore(
      (budgetedTotal /
        totalCost) *
        100
    );

  const finalScore =
    clampScore(
      targetCostPerformance *
        0.7 +
        budgetPerformance *
          0.3
    );

  return {
    score:
      round(finalScore),

    breakdown: {
      actualCostPerDelivery:
        round(
          actualCostPerDelivery
        ),

      targetCostPerformance:
        round(
          targetCostPerformance
        ),

      budgetPerformance:
        round(
          budgetPerformance
        ),
    },
  };
}

// ============================================================
// KPI 8 — EMPTY-RUNNING PERFORMANCE
// ============================================================

function calculateEmptyRunning(
  answers
) {
  const totalKm =
    Number(
      answers.logEmptyTotalKm
    );

  const emptyKm =
    Number(
      answers.logEmptyKm
    );

  const targetEmptyRate =
    Number(
      answers.logEmptyTargetRate
    );

  if (
    !validPositive(totalKm) ||
    !validZeroOrMore(emptyKm) ||
    emptyKm > totalKm ||
    !validZeroOrMore(
      targetEmptyRate
    ) ||
    targetEmptyRate > 100
  ) {
    return null;
  }

  const actualEmptyRate =
    (emptyKm /
      totalKm) *
    100;

  const loadedMovementPerformance =
    clampScore(
      100 -
        actualEmptyRate
    );

  let targetPerformance =
    100;

  if (
    actualEmptyRate >
      targetEmptyRate
  ) {
    targetPerformance =
      targetEmptyRate === 0
        ? 0
        : clampScore(
            (targetEmptyRate /
              actualEmptyRate) *
              100
          );
  }

  const finalScore =
    clampScore(
      loadedMovementPerformance *
        0.6 +
        targetPerformance *
          0.4
    );

  return {
    score:
      round(finalScore),

    breakdown: {
      emptyRunningRate:
        round(
          actualEmptyRate
        ),

      loadedMovementPerformance:
        round(
          loadedMovementPerformance
        ),

      emptyRunningTargetPerformance:
        round(
          targetPerformance
        ),
    },
  };
}

// ============================================================
// KPI 9 — FUEL / ENERGY EFFICIENCY
// ============================================================

function calculateFuelEfficiency(
  answers
) {
  const totalLitres =
    Number(
      answers.logFuelTotalLitres
    );

  const totalKm =
    Number(
      answers.logFuelTotalKm
    );

  const targetPer100Km =
    Number(
      answers.logFuelTargetPer100Km
    );

  const baselinePer100Km =
    Number(
      answers.logFuelBaselinePer100Km
    );

  if (
    !validPositive(
      totalLitres
    ) ||
    !validPositive(
      totalKm
    ) ||
    !validPositive(
      targetPer100Km
    ) ||
    !validPositive(
      baselinePer100Km
    )
  ) {
    return null;
  }

  const actualPer100Km =
    (totalLitres /
      totalKm) *
    100;

  const targetPerformance =
    clampScore(
      (targetPer100Km /
        actualPer100Km) *
        100
    );

  const baselinePerformance =
    clampScore(
      (baselinePer100Km /
        actualPer100Km) *
        100
    );

  const finalScore =
    clampScore(
      targetPerformance *
        0.6 +
        baselinePerformance *
          0.4
    );

  return {
    score:
      round(finalScore),

    breakdown: {
      actualFuelPer100Km:
        round(
          actualPer100Km
        ),

      targetPerformance:
        round(
          targetPerformance
        ),

      baselinePerformance:
        round(
          baselinePerformance
        ),
    },
  };
}

// ============================================================
// KPI 10 — SAFETY COMPLIANCE
// ============================================================

function calculateSafety(
  answers
) {
  const requiredInspections =
    Number(
      answers.logSafetyRequiredInspections
    );

  const passedInspections =
    Number(
      answers.logSafetyPassedInspections
    );

  const actionsRaised =
    Number(
      answers.logSafetyActionsRaised
    );

  const actionsClosed =
    Number(
      answers.logSafetyActionsClosed
    );

  const trainingRequired =
    Number(
      answers.logSafetyTrainingRequired
    );

  const trainingCompleted =
    Number(
      answers.logSafetyTrainingCompleted
    );

  const incidents =
    Number(
      answers.logSafetyIncidents
    );

  if (
    !validPositive(
      requiredInspections
    ) ||
    !validZeroOrMore(
      passedInspections
    ) ||
    passedInspections >
      requiredInspections ||
    !validZeroOrMore(
      actionsRaised
    ) ||
    !validZeroOrMore(
      actionsClosed
    ) ||
    actionsClosed >
      actionsRaised ||
    !validPositive(
      trainingRequired
    ) ||
    !validZeroOrMore(
      trainingCompleted
    ) ||
    trainingCompleted >
      trainingRequired ||
    !validZeroOrMore(
      incidents
    )
  ) {
    return null;
  }

  const inspectionPerformance =
    clampScore(
      (passedInspections /
        requiredInspections) *
        100
    );

  const correctiveActionClosure =
    actionsRaised === 0
      ? 100
      : clampScore(
          (actionsClosed /
            actionsRaised) *
            100
        );

  const trainingCompletion =
    clampScore(
      (trainingCompleted /
        trainingRequired) *
        100
    );

  const incidentPerformance =
    clampScore(
      100 -
        incidents *
          10
    );

  const finalScore =
    clampScore(
      inspectionPerformance *
        0.3 +
        correctiveActionClosure *
          0.25 +
        trainingCompletion *
          0.25 +
        incidentPerformance *
          0.2
    );

  return {
    score:
      round(finalScore),

    breakdown: {
      inspectionPerformance:
        round(
          inspectionPerformance
        ),

      correctiveActionClosure:
        round(
          correctiveActionClosure
        ),

      trainingCompletion:
        round(
          trainingCompletion
        ),

      incidentPerformance:
        round(
          incidentPerformance
        ),

      recordableIncidents:
        incidents,
    },
  };
}

// ============================================================
// FULL LOGISTICS ASSESSMENT
// ============================================================

export function calculateLogisticsAssessment(
  answers
) {
  const calculations = {
    operationalProductivity:
      calculateOperationalProductivity(
        answers
      ),

    perfectOrder:
      calculatePerfectOrder(
        answers
      ),

    delivery:
      calculateDelivery(
        answers
      ),

    orderAccuracy:
      calculateOrderAccuracy(
        answers
      ),

    cycleTimePerformance:
      calculateCycleTime(
        answers
      ),

    fleetUtilisation:
      calculateFleetUtilisation(
        answers
      ),

    costPerformance:
      calculateCostPerformance(
        answers
      ),

    emptyRunningPerformance:
      calculateEmptyRunning(
        answers
      ),

    fuelEnergyEfficiency:
      calculateFuelEfficiency(
        answers
      ),

    safety:
      calculateSafety(
        answers
      ),
  };

  const invalidKpis =
    Object.entries(
      calculations
    )
      .filter(
        ([, calculation]) =>
          calculation === null
      )
      .map(
        ([key]) => key
      );

  if (
    invalidKpis.length > 0
  ) {
    return {
      success: false,
      invalidKpis,
      calculations,
    };
  }

  const scores = {};

  Object.entries(
    calculations
  ).forEach(
    ([key, calculation]) => {
      scores[key] =
        calculation.score;
    }
  );

  return {
    success: true,
    scores,
    calculations,
  };
}