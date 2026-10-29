// ============================================================
// INDUBENCH SA
// AUTOMOTIVE KPI QUESTION BANK + CALCULATION ENGINE
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
// AUTOMOTIVE QUESTION BANK
// ============================================================

export const automotiveQuestionBank = {
 productionProductivity: {
    name: "Production Productivity",

    description:
      "Measures how effectively the automotive production line converts planned production capacity and labour time into completed vehicles or components.",

    questions: [
      {
        id: "autoProductivityPlannedOutput",
        label:
          "How many vehicles or components were planned for production during the period?",
        unit: "units",
      },
      {
        id: "autoProductivityActualOutput",
        label:
          "How many vehicles or components were actually produced?",
        unit: "units",
      },
      {
        id: "autoProductivityStandardLabourHours",
        label:
          "How many standard labour hours should have been required for the actual output?",
        unit: "hours",
      },
      {
        id: "autoProductivityActualLabourHours",
        label:
          "How many actual labour hours were used?",
        unit: "hours",
      },
    ],
  },

  firstPassQuality: {
    name: "First-Pass Quality",

    description:
      "Measures the percentage of vehicles or components that passed inspection the first time without requiring repair or rework.",

    questions: [
      {
        id: "autoQualityTotalUnits",
        label:
          "How many total vehicles or components were inspected?",
        unit: "units",
      },
      {
        id: "autoQualityFirstPassUnits",
        label:
          "How many passed inspection the first time without rework?",
        unit: "units",
      },
      {
        id: "autoQualityDefectiveUnits",
        label:
          "How many units had defects during inspection?",
        unit: "units",
      },
      {
        id: "autoQualityRejectedUnits",
        label:
          "How many units were rejected or scrapped because of quality problems?",
        unit: "units",
      },
    ],
  },

  oee: {
    name:
      "Overall Equipment Effectiveness (OEE)",

    description:
      "Measures equipment availability, operating performance and quality using the standard OEE approach.",

    questions: [
      {
        id: "autoOeePlannedMinutes",
        label:
          "What was the planned production time?",
        unit: "minutes",
      },
      {
        id: "autoOeeDowntimeMinutes",
        label:
          "How much production downtime occurred?",
        unit: "minutes",
      },
      {
        id: "autoOeeIdealCycleTime",
        label:
          "What was the ideal cycle time per vehicle or component?",
        unit: "min/unit",
      },
      {
        id: "autoOeeTotalUnits",
        label:
          "How many total units were produced?",
        unit: "units",
      },
      {
        id: "autoOeeGoodUnits",
        label:
          "How many good units were produced?",
        unit: "units",
      },
    ],
  },

  cycleTimePerformance: {
    name: "Cycle-Time Performance",

    description:
      "Measures how closely the actual production cycle time matches the required or target cycle time.",

    questions: [
      {
        id: "autoCycleTargetTime",
        label:
          "What is the target cycle time per vehicle or component?",
        unit: "min/unit",
      },
      {
        id: "autoCycleActualTime",
        label:
          "What was the actual average cycle time per vehicle or component?",
        unit: "min/unit",
      },
      {
        id: "autoCycleUnitsMeetingTarget",
        label:
          "How many units were completed within the target cycle time?",
        unit: "units",
      },
      {
        id: "autoCycleTotalUnits",
        label:
          "How many units were measured for cycle-time performance?",
        unit: "units",
      },
    ],
  },

  lineUtilisation: {
    name: "Line Utilisation",

    description:
      "Measures how effectively the available automotive production-line time was used for productive operation.",

    questions: [
      {
        id: "autoLineAvailableHours",
        label:
          "How many production-line hours were available?",
        unit: "hours",
      },
      {
        id: "autoLineOperatingHours",
        label:
          "How many hours was the line actually operating?",
        unit: "hours",
      },
      {
        id: "autoLinePlannedOutput",
        label:
          "What was the planned production output for the line?",
        unit: "units",
      },
      {
        id: "autoLineActualOutput",
        label:
          "What was the actual production output?",
        unit: "units",
      },
    ],
  },

  downtimePerformance: {
    name: "Downtime Performance",

    description:
      "Measures productive operating time after losses caused by breakdowns, maintenance, changeovers and production stoppages.",

    questions: [
      {
        id: "autoDowntimePlannedHours",
        label:
          "How many production hours were planned?",
        unit: "hours",
      },
      {
        id: "autoDowntimeBreakdownHours",
        label:
          "How many hours were lost because of equipment breakdowns?",
        unit: "hours",
      },
      {
        id: "autoDowntimeMaintenanceHours",
        label:
          "How many hours were lost because of unplanned maintenance?",
        unit: "hours",
      },
      {
        id: "autoDowntimeChangeoverHours",
        label:
          "How many hours were lost during changeovers or setup?",
        unit: "hours",
      },
      {
        id: "autoDowntimeOtherHours",
        label:
          "How many other production-stoppage hours occurred?",
        unit: "hours",
      },
    ],
  },

  reworkPerformance: {
    name: "Rework Performance",

    description:
      "Measures how effectively the automotive process produces acceptable units without requiring repair, adjustment or rework.",

    questions: [
      {
        id: "autoReworkTotalUnits",
        label:
          "How many total vehicles or components were produced?",
        unit: "units",
      },
      {
        id: "autoReworkUnits",
        label:
          "How many units required rework?",
        unit: "units",
      },
      {
        id: "autoReworkHours",
        label:
          "How many labour hours were spent performing rework?",
        unit: "hours",
      },
      {
        id: "autoReworkTotalLabourHours",
        label:
          "How many total production labour hours were worked?",
        unit: "hours",
      },
    ],
  },

  scheduleDelivery: {
    name:
      "Schedule / Delivery Performance",

    description:
      "Measures whether scheduled automotive production orders were completed on time, in full and according to the production plan.",

    questions: [
      {
        id: "autoDeliveryScheduledOrders",
        label:
          "How many production orders or schedules were due for completion?",
        unit: "orders",
      },
      {
        id: "autoDeliveryOnTimeOrders",
        label:
          "How many orders were completed on or before the scheduled date?",
        unit: "orders",
      },
      {
        id: "autoDeliveryInFullOrders",
        label:
          "How many scheduled orders were completed in full?",
        unit: "orders",
      },
      {
        id: "autoDeliveryPlannedUnits",
        label:
          "How many units were scheduled for production?",
        unit: "units",
      },
      {
        id: "autoDeliveryActualUnits",
        label:
          "How many scheduled units were actually completed?",
        unit: "units",
      },
    ],
  },

  energy: {
    name: "Energy Efficiency",

    description:
      "Measures energy consumption relative to good automotive production output and compares consumption with the company's target and previous baseline.",

    questions: [
      {
        id: "autoEnergyTotalUsed",
        label:
          "How much total production energy was consumed?",
        unit: "kWh",
      },
      {
        id: "autoEnergyGoodUnits",
        label:
          "How many good vehicles or components were produced?",
        unit: "units",
      },
      {
        id: "autoEnergyTargetPerUnit",
        label:
          "What is the target energy consumption per good unit?",
        unit: "kWh/unit",
      },
      {
        id: "autoEnergyBaselinePerUnit",
        label:
          "What was the previous or baseline energy consumption per good unit?",
        unit: "kWh/unit",
      },
    ],
  },

  safety: {
    name: "Safety Compliance",

    description:
      "Measures safety inspection compliance, corrective-action closure, required training completion and reported safety incidents.",

    questions: [
      {
        id: "autoSafetyRequiredInspections",
        label:
          "How many required safety inspections or checks were scheduled?",
        unit: "checks",
      },
      {
        id: "autoSafetyPassedInspections",
        label:
          "How many required safety inspections or checks were passed?",
        unit: "checks",
      },
      {
        id: "autoSafetyActionsRaised",
        label:
          "How many safety corrective actions were raised?",
        unit: "actions",
      },
      {
        id: "autoSafetyActionsClosed",
        label:
          "How many safety corrective actions were closed?",
        unit: "actions",
      },
      {
        id: "autoSafetyTrainingRequired",
        label:
          "How many required employee safety-training completions were expected?",
        unit: "completions",
      },
      {
        id: "autoSafetyTrainingCompleted",
        label:
          "How many required safety-training completions were achieved?",
        unit: "completions",
      },
      {
        id: "autoSafetyIncidents",
        label:
          "How many recordable safety incidents occurred during the period?",
        unit: "incidents",
      },
    ],
  },
};

// ============================================================
// KPI 1 — PRODUCTION PRODUCTIVITY
// ============================================================

function calculateProductivity(
  answers
) {
  const planned =
    Number(
      answers.autoProductivityPlannedOutput
    );

  const actual =
    Number(
      answers.autoProductivityActualOutput
    );

  const standardHours =
    Number(
      answers.autoProductivityStandardLabourHours
    );

  const actualHours =
    Number(
      answers.autoProductivityActualLabourHours
    );

  if (
    !validPositive(planned) ||
    !validZeroOrMore(actual) ||
    !validPositive(standardHours) ||
    !validPositive(actualHours)
  ) {
    return null;
  }

  const productionAttainment =
    clampScore(
      (actual / planned) *
        100
    );

  const labourEfficiency =
    clampScore(
      (standardHours /
        actualHours) *
        100
    );

  const finalScore =
    clampScore(
      productionAttainment *
        0.6 +
        labourEfficiency *
          0.4
    );

  return {
    score:
      round(finalScore),

    breakdown: {
      productionAttainment:
        round(
          productionAttainment
        ),

      labourEfficiency:
        round(
          labourEfficiency
        ),
    },
  };
}

// ============================================================
// KPI 2 — FIRST-PASS QUALITY
// ============================================================

function calculateQuality(
  answers
) {
  const total =
    Number(
      answers.autoQualityTotalUnits
    );

  const firstPass =
    Number(
      answers.autoQualityFirstPassUnits
    );

  const defective =
    Number(
      answers.autoQualityDefectiveUnits
    );

  const rejected =
    Number(
      answers.autoQualityRejectedUnits
    );

  if (
    !validPositive(total) ||
    !validZeroOrMore(firstPass) ||
    !validZeroOrMore(defective) ||
    !validZeroOrMore(rejected) ||
    firstPass > total ||
    defective > total ||
    rejected > total
  ) {
    return null;
  }

  const firstPassYield =
    clampScore(
      (firstPass / total) *
        100
    );

  const defectPerformance =
    clampScore(
      100 -
        (defective /
          total) *
          100
    );

  const rejectionPerformance =
    clampScore(
      100 -
        (rejected /
          total) *
          100
    );

  const finalScore =
    clampScore(
      firstPassYield *
        0.6 +
        defectPerformance *
          0.25 +
        rejectionPerformance *
          0.15
    );

  return {
    score:
      round(finalScore),

    breakdown: {
      firstPassYield:
        round(
          firstPassYield
        ),

      defectPerformance:
        round(
          defectPerformance
        ),

      rejectionPerformance:
        round(
          rejectionPerformance
        ),
    },
  };
}

// ============================================================
// KPI 3 — OEE
// ============================================================

function calculateOee(
  answers
) {
  const planned =
    Number(
      answers.autoOeePlannedMinutes
    );

  const downtime =
    Number(
      answers.autoOeeDowntimeMinutes
    );

  const idealCycle =
    Number(
      answers.autoOeeIdealCycleTime
    );

  const totalUnits =
    Number(
      answers.autoOeeTotalUnits
    );

  const goodUnits =
    Number(
      answers.autoOeeGoodUnits
    );

  if (
    !validPositive(planned) ||
    !validZeroOrMore(downtime) ||
    downtime >= planned ||
    !validPositive(idealCycle) ||
    !validPositive(totalUnits) ||
    !validZeroOrMore(goodUnits) ||
    goodUnits > totalUnits
  ) {
    return null;
  }

  const operatingTime =
    planned - downtime;

  const availability =
    clampScore(
      (operatingTime /
        planned) *
        100
    );

  const performance =
    clampScore(
      (idealCycle *
        totalUnits /
        operatingTime) *
        100
    );

  const quality =
    clampScore(
      (goodUnits /
        totalUnits) *
        100
    );

  const oee =
    clampScore(
      (availability / 100) *
        (performance / 100) *
        (quality / 100) *
        100
    );

  return {
    score:
      round(oee),

    breakdown: {
      availability:
        round(
          availability
        ),

      performance:
        round(
          performance
        ),

      firstPassQuality:
        round(
          quality
        ),
    },
  };
}

// ============================================================
// KPI 4 — CYCLE-TIME PERFORMANCE
// ============================================================

function calculateCycleTime(
  answers
) {
  const targetTime =
    Number(
      answers.autoCycleTargetTime
    );

  const actualTime =
    Number(
      answers.autoCycleActualTime
    );

  const unitsMeetingTarget =
    Number(
      answers.autoCycleUnitsMeetingTarget
    );

  const totalUnits =
    Number(
      answers.autoCycleTotalUnits
    );

  if (
    !validPositive(targetTime) ||
    !validPositive(actualTime) ||
    !validZeroOrMore(
      unitsMeetingTarget
    ) ||
    !validPositive(totalUnits) ||
    unitsMeetingTarget >
      totalUnits
  ) {
    return null;
  }

  const cycleTimePerformance =
    clampScore(
      (targetTime /
        actualTime) *
        100
    );

  const targetAchievementRate =
    clampScore(
      (unitsMeetingTarget /
        totalUnits) *
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
      cycleTimePerformance:
        round(
          cycleTimePerformance
        ),

      targetAchievementRate:
        round(
          targetAchievementRate
        ),

      actualCycleTime:
        round(actualTime),

      targetCycleTime:
        round(targetTime),
    },
  };
}

// ============================================================
// KPI 5 — LINE UTILISATION
// ============================================================

function calculateLineUtilisation(
  answers
) {
  const availableHours =
    Number(
      answers.autoLineAvailableHours
    );

  const operatingHours =
    Number(
      answers.autoLineOperatingHours
    );

  const plannedOutput =
    Number(
      answers.autoLinePlannedOutput
    );

  const actualOutput =
    Number(
      answers.autoLineActualOutput
    );

  if (
    !validPositive(
      availableHours
    ) ||
    !validZeroOrMore(
      operatingHours
    ) ||
    operatingHours >
      availableHours ||
    !validPositive(
      plannedOutput
    ) ||
    !validZeroOrMore(
      actualOutput
    )
  ) {
    return null;
  }

  const timeUtilisation =
    clampScore(
      (operatingHours /
        availableHours) *
        100
    );

  const outputPerformance =
    clampScore(
      (actualOutput /
        plannedOutput) *
        100
    );

  const finalScore =
    clampScore(
      timeUtilisation *
        0.6 +
        outputPerformance *
          0.4
    );

  return {
    score:
      round(finalScore),

    breakdown: {
      lineTimeUtilisation:
        round(
          timeUtilisation
        ),

      outputPerformance:
        round(
          outputPerformance
        ),
    },
  };
}

// ============================================================
// KPI 6 — DOWNTIME PERFORMANCE
// ============================================================

function calculateDowntime(
  answers
) {
  const plannedHours =
    Number(
      answers.autoDowntimePlannedHours
    );

  const breakdownHours =
    Number(
      answers.autoDowntimeBreakdownHours
    );

  const maintenanceHours =
    Number(
      answers.autoDowntimeMaintenanceHours
    );

  const changeoverHours =
    Number(
      answers.autoDowntimeChangeoverHours
    );

  const otherHours =
    Number(
      answers.autoDowntimeOtherHours
    );

  if (
    !validPositive(
      plannedHours
    ) ||
    !validZeroOrMore(
      breakdownHours
    ) ||
    !validZeroOrMore(
      maintenanceHours
    ) ||
    !validZeroOrMore(
      changeoverHours
    ) ||
    !validZeroOrMore(
      otherHours
    )
  ) {
    return null;
  }

  const totalDowntime =
    breakdownHours +
    maintenanceHours +
    changeoverHours +
    otherHours;

  if (
    totalDowntime >
    plannedHours
  ) {
    return null;
  }

  const downtimeRate =
    clampScore(
      (totalDowntime /
        plannedHours) *
        100
    );

  const productiveTimeRate =
    clampScore(
      100 - downtimeRate
    );

  return {
    score:
      round(
        productiveTimeRate
      ),

    breakdown: {
      totalDowntimeHours:
        round(
          totalDowntime
        ),

      downtimeRate:
        round(
          downtimeRate
        ),

      productiveTimeRate:
        round(
          productiveTimeRate
        ),
    },
  };
}

// ============================================================
// KPI 7 — REWORK PERFORMANCE
// ============================================================

function calculateRework(
  answers
) {
  const totalUnits =
    Number(
      answers.autoReworkTotalUnits
    );

  const reworkUnits =
    Number(
      answers.autoReworkUnits
    );

  const reworkHours =
    Number(
      answers.autoReworkHours
    );

  const totalLabourHours =
    Number(
      answers.autoReworkTotalLabourHours
    );

  if (
    !validPositive(totalUnits) ||
    !validZeroOrMore(
      reworkUnits
    ) ||
    reworkUnits >
      totalUnits ||
    !validZeroOrMore(
      reworkHours
    ) ||
    !validPositive(
      totalLabourHours
    ) ||
    reworkHours >
      totalLabourHours
  ) {
    return null;
  }

  const reworkRate =
    clampScore(
      (reworkUnits /
        totalUnits) *
        100
    );

  const unitPerformance =
    clampScore(
      100 - reworkRate
    );

  const reworkLabourRate =
    clampScore(
      (reworkHours /
        totalLabourHours) *
        100
    );

  const labourPerformance =
    clampScore(
      100 -
        reworkLabourRate
    );

  const finalScore =
    clampScore(
      unitPerformance *
        0.7 +
        labourPerformance *
          0.3
    );

  return {
    score:
      round(finalScore),

    breakdown: {
      reworkRate:
        round(
          reworkRate
        ),

      reworkUnitPerformance:
        round(
          unitPerformance
        ),

      reworkLabourRate:
        round(
          reworkLabourRate
        ),

      reworkLabourPerformance:
        round(
          labourPerformance
        ),
    },
  };
}

// ============================================================
// KPI 8 — SCHEDULE / DELIVERY PERFORMANCE
// ============================================================

function calculateDelivery(
  answers
) {
  const scheduledOrders =
    Number(
      answers.autoDeliveryScheduledOrders
    );

  const onTimeOrders =
    Number(
      answers.autoDeliveryOnTimeOrders
    );

  const inFullOrders =
    Number(
      answers.autoDeliveryInFullOrders
    );

  const plannedUnits =
    Number(
      answers.autoDeliveryPlannedUnits
    );

  const actualUnits =
    Number(
      answers.autoDeliveryActualUnits
    );

  if (
    !validPositive(
      scheduledOrders
    ) ||
    !validZeroOrMore(
      onTimeOrders
    ) ||
    onTimeOrders >
      scheduledOrders ||
    !validZeroOrMore(
      inFullOrders
    ) ||
    inFullOrders >
      scheduledOrders ||
    !validPositive(
      plannedUnits
    ) ||
    !validZeroOrMore(
      actualUnits
    )
  ) {
    return null;
  }

  const onTimeRate =
    clampScore(
      (onTimeOrders /
        scheduledOrders) *
        100
    );

  const inFullRate =
    clampScore(
      (inFullOrders /
        scheduledOrders) *
        100
    );

  const scheduleAttainment =
    clampScore(
      (actualUnits /
        plannedUnits) *
        100
    );

  const finalScore =
    clampScore(
      onTimeRate *
        0.4 +
        inFullRate *
          0.3 +
        scheduleAttainment *
          0.3
    );

  return {
    score:
      round(finalScore),

    breakdown: {
      onTimeRate:
        round(
          onTimeRate
        ),

      inFullRate:
        round(
          inFullRate
        ),

      scheduleAttainment:
        round(
          scheduleAttainment
        ),
    },
  };
}

// ============================================================
// KPI 9 — ENERGY EFFICIENCY
// ============================================================

function calculateEnergy(
  answers
) {
  const totalEnergy =
    Number(
      answers.autoEnergyTotalUsed
    );

  const goodUnits =
    Number(
      answers.autoEnergyGoodUnits
    );

  const targetPerUnit =
    Number(
      answers.autoEnergyTargetPerUnit
    );

  const baselinePerUnit =
    Number(
      answers.autoEnergyBaselinePerUnit
    );

  if (
    !validPositive(
      totalEnergy
    ) ||
    !validPositive(
      goodUnits
    ) ||
    !validPositive(
      targetPerUnit
    ) ||
    !validPositive(
      baselinePerUnit
    )
  ) {
    return null;
  }

  const actualEnergyPerUnit =
    totalEnergy /
    goodUnits;

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
      actualEnergyPerUnit:
        round(
          actualEnergyPerUnit
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
      answers.autoSafetyRequiredInspections
    );

  const passedInspections =
    Number(
      answers.autoSafetyPassedInspections
    );

  const actionsRaised =
    Number(
      answers.autoSafetyActionsRaised
    );

  const actionsClosed =
    Number(
      answers.autoSafetyActionsClosed
    );

  const trainingRequired =
    Number(
      answers.autoSafetyTrainingRequired
    );

  const trainingCompleted =
    Number(
      answers.autoSafetyTrainingCompleted
    );

  const incidents =
    Number(
      answers.autoSafetyIncidents
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

  // Incidents now affect the Automotive
  // safety score.
  const incidentPerformance =
    clampScore(
      100 -
        incidents * 10
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
// FULL AUTOMOTIVE ASSESSMENT
// ============================================================

export function calculateAutomotiveAssessment(
  answers
) {
  const calculations = {
    productionProductivity:
      calculateProductivity(
        answers
      ),

    firstPassQuality:
      calculateQuality(
        answers
      ),

    oee:
      calculateOee(
        answers
      ),

    cycleTimePerformance:
      calculateCycleTime(
        answers
      ),

    lineUtilisation:
      calculateLineUtilisation(
        answers
      ),

    downtimePerformance:
      calculateDowntime(
        answers
      ),

    reworkPerformance:
      calculateRework(
        answers
      ),

    scheduleDelivery:
      calculateDelivery(
        answers
      ),

    energy:
      calculateEnergy(
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