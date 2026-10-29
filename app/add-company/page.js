"use client";

import { useMemo, useState } from "react";

import {
  calculateIndustryStatistics,
  calculateWeightedScore,
  generateCompanyRecommendations,
  getKpiDefinitions,
} from "../benchmarkData";

import {
  kpiQuestionBank,
  calculateManufacturingAssessment,
} from "../kpiQuestions";

import {
  automotiveQuestionBank,
  calculateAutomotiveAssessment,
} from "../automotiveQuestions";
import {
  logisticsQuestionBank,
  calculateLogisticsAssessment,
} from "../logisticsQuestions";

// ============================================================
// INITIAL COMPANY INFORMATION
// ============================================================

const initialFormData = {
  companyName: "",
  industry: "Manufacturing",
  reportingPeriod: "2026",
};

// ============================================================
// CREATE EMPTY ASSESSMENT ANSWERS
// ============================================================

function getQuestionBank(industry) {
  if (industry === "Manufacturing") {
    return kpiQuestionBank.Manufacturing;
  }

  if (industry === "Automotive") {
    return automotiveQuestionBank;
  }

  if (industry === "Logistics") {
    return logisticsQuestionBank;
  }

  return null;
}

function createInitialAssessmentAnswers(industry) {
  const answers = {};
  const questionBank = getQuestionBank(industry);

  if (!questionBank) {
    return answers;
  }

  Object.values(questionBank).forEach((kpi) => {
    kpi.questions.forEach((question) => {
      answers[question.id] = "";
    });
  });

  return answers;
}

// ============================================================
// CREATE COMPANY TARGETS
// ============================================================

function createInitialTargets(industry) {
  const definitions =
    getKpiDefinitions(industry);

  const targets = {};

  definitions.forEach((kpi) => {
    targets[kpi.key] = kpi.target;
  });

  return targets;
}

// ============================================================
// BREAKDOWN LABELS
// ============================================================

const breakdownLabels = {
  productionAttainment:
    "Production Attainment",

  labourEfficiency:
    "Labour Efficiency",

  productionTimeUtilisation:
    "Production-Time Utilisation",

  firstPassYield:
    "First-Pass Yield",

  defectPerformance:
    "Defect Performance",

  reworkPerformance:
    "Rework Performance",

  customerReturnPerformance:
    "Customer Return Performance",

  availability:
    "Availability",

  performance:
    "Performance",

  quality:
    "Quality",

  outputUtilisation:
    "Output Utilisation",

  timeUtilisation:
    "Time Utilisation",

  totalDowntimeHours:
    "Total Downtime",

  downtimeRate:
    "Downtime Rate",

  productiveTimeRate:
    "Productive Time Rate",

  materialYield:
    "Material Yield",

  wasteRate:
    "Waste Rate",

  wastePerformance:
    "Waste Performance",

  onTimeRate:
    "On-Time Rate",

  inFullRate:
    "In-Full Rate",

  leadTimePerformance:
    "Lead-Time Performance",

  actualInventoryTurns:
    "Actual Inventory Turns",

  turnoverPerformance:
    "Inventory Turnover Performance",

  stockAvailabilityPerformance:
    "Stock Availability Performance",

  obsoleteInventoryPerformance:
    "Obsolete Inventory Performance",

  actualEnergyPerUnit:
    "Actual Energy per Unit",

  targetPerformance:
    "Target Energy Performance",

  baselinePerformance:
    "Baseline Energy Performance",

  inspectionPerformance:
    "Inspection Compliance",

  correctiveActionClosure:
    "Corrective-Action Closure",

  trainingCompletion:
    "Safety Training Completion",

  incidentPerformance:
    "Incident Performance",

  rejectionPerformance:
    "Rejection Performance",

  cycleTimePerformance:
    "Cycle-Time Performance",

  targetAchievementRate:
    "Target Achievement Rate",

  actualCycleTime:
    "Actual Cycle Time",

  targetCycleTime:
    "Target Cycle Time",

  lineTimeUtilisation:
    "Line-Time Utilisation",

  outputPerformance:
    "Output Performance",

  reworkRate:
    "Rework Rate",

  reworkUnitPerformance:
    "Rework Unit Performance",

  reworkLabourRate:
    "Rework Labour Rate",

  reworkLabourPerformance:
    "Rework Labour Performance",

  scheduleAttainment:
    "Schedule Attainment",

  recordableIncidents:
    "Recordable Incidents",
};

function formatBreakdownValue(
  key,
  value
) {
  if (key === "totalDowntimeHours") {
    return `${value} hours`;
  }

  if (key === "actualInventoryTurns") {
    return `${value} turns`;
  }

  if (key === "actualEnergyPerUnit") {
    return `${value} kWh/unit`;
  }

  if (
    key === "actualCycleTime" ||
    key === "targetCycleTime"
  ) {
    return `${value} min/unit`;
  }

  if (key === "recordableIncidents") {
    return `${value}`;
  }

  return `${value}%`;
}

// ============================================================
// PAGE
// ============================================================

export default function AddCompanyPage() {
  const [
    formData,
    setFormData,
  ] = useState(initialFormData);

  const [
    companyTargets,
    setCompanyTargets,
  ] = useState(() =>
    createInitialTargets("Manufacturing")
  );

  const [
    targetsConfirmed,
    setTargetsConfirmed,
  ] = useState(false);

  const [
    assessmentAnswers,
    setAssessmentAnswers,
  ] = useState(() =>
    createInitialAssessmentAnswers("Manufacturing")
  );

  const [
    currentKpiIndex,
    setCurrentKpiIndex,
  ] = useState(0);

  const [
    results,
    setResults,
  ] = useState(null);

  const [
    formError,
    setFormError,
  ] = useState("");

  // ==========================================================
  // KPI DEFINITIONS
  // ==========================================================

  const selectedKpis = useMemo(
    () =>
      getKpiDefinitions(
        formData.industry
      ),
    [formData.industry]
  );

  const activeQuestionBank =
    getQuestionBank(formData.industry);

  const assessmentKpis =
    activeQuestionBank
      ? selectedKpis.filter(
          (kpi) =>
            activeQuestionBank[kpi.key]
        )
      : [];

  const currentKpi =
    assessmentKpis[
      currentKpiIndex
    ];

  const currentQuestionGroup =
    currentKpi && activeQuestionBank
      ? activeQuestionBank[
          currentKpi.key
        ]
      : null;

  // ==========================================================
  // COMPANY INFORMATION
  // ==========================================================

  function handleCompanyChange(event) {
    const { name, value } =
      event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setFormError("");
    setResults(null);

    if (name === "industry") {
      setCompanyTargets(
        createInitialTargets(value)
      );

      setTargetsConfirmed(false);

      setCurrentKpiIndex(0);

      setAssessmentAnswers(
        createInitialAssessmentAnswers(value)
      );
    }
  }

  // ==========================================================
  // COMPANY TARGETS
  // ==========================================================

  function handleTargetChange(event) {
    const { name, value } =
      event.target;

    setCompanyTargets(
      (current) => ({
        ...current,
        [name]: value,
      })
    );

    setFormError("");
  }

  function confirmTargets() {
    if (!formData.companyName.trim()) {
      setFormError(
        "Please enter the company name before starting the assessment."
      );

      return;
    }

    if (!formData.reportingPeriod.trim()) {
      setFormError(
        "Please enter the reporting period."
      );

      return;
    }

    const invalidTarget =
      selectedKpis.find((kpi) => {
        const target = Number(
          companyTargets[kpi.key]
        );

        return (
          !Number.isFinite(target) ||
          target < 0 ||
          target > 100
        );
      });

    if (invalidTarget) {
      setFormError(
        `${invalidTarget.label} target must be between 0% and 100%.`
      );

      return;
    }

    if (!activeQuestionBank) {
      setFormError(
        `${formData.industry} target setup is ready, but its detailed KPI questionnaire is not connected yet. Manufacturing and Automotive are currently the complete assessments.`
      );

      return;
    }

    setFormError("");
    setTargetsConfirmed(true);
    setCurrentKpiIndex(0);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function editTargets() {
    setTargetsConfirmed(false);
    setResults(null);
    setFormError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // ==========================================================
  // RAW KPI ANSWERS
  // ==========================================================

  function handleAnswerChange(event) {
    const { name, value } =
      event.target;

    setAssessmentAnswers(
      (current) => ({
        ...current,
        [name]: value,
      })
    );

    setFormError("");
  }

  // ==========================================================
  // VALIDATE CURRENT KPI
  // ==========================================================

  function currentKpiIsComplete() {
    if (!currentQuestionGroup) {
      return false;
    }

    return currentQuestionGroup.questions.every(
      (question) =>
        assessmentAnswers[
          question.id
        ] !== ""
    );
  }

  // ==========================================================
  // NEXT / PREVIOUS KPI
  // ==========================================================

  function goToNextKpi() {
    if (!currentKpiIsComplete()) {
      setFormError(
        `Please complete all questions for ${currentQuestionGroup.name} before continuing.`
      );

      return;
    }

    setFormError("");

    setCurrentKpiIndex(
      (current) =>
        Math.min(
          current + 1,
          assessmentKpis.length - 1
        )
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function goToPreviousKpi() {
    setFormError("");

    setCurrentKpiIndex(
      (current) =>
        Math.max(
          current - 1,
          0
        )
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // ==========================================================
  // FINAL CALCULATION
  // ==========================================================

  function handleSubmit(event) {
    event.preventDefault();

    setFormError("");

    let assessment;

if (
  formData.industry ===
  "Automotive"
) {
  assessment =
    calculateAutomotiveAssessment(
      assessmentAnswers
    );
} else if (
  formData.industry ===
  "Logistics"
) {
  assessment =
    calculateLogisticsAssessment(
      assessmentAnswers
    );
} else {
  assessment =
    calculateManufacturingAssessment(
      assessmentAnswers
    );
}

    if (!assessment.success) {
      const invalidLabels =
        assessment.invalidKpis
          .map((key) => {
            const definition =
              selectedKpis.find(
                (kpi) =>
                  kpi.key === key
              );

            return (
              definition?.label ||
              key
            );
          })
          .join(", ");

      setFormError(
        `Some information is invalid or inconsistent in: ${invalidLabels}. Please review those KPI answers.`
      );

      return;
    }

    const industryStatistics =
      calculateIndustryStatistics(
        formData.industry
      );

    const companyValues =
      assessment.scores;

    const comparison =
      selectedKpis.map((kpi) => {
        const companyValue =
          Number(
            companyValues[kpi.key]
          );

        const companyTarget =
          Number(
            companyTargets[kpi.key]
          );

        const industryAverage =
          industryStatistics.averages[
            kpi.key
          ];

        const industryMedian =
          industryStatistics.medians[
            kpi.key
          ];

        const topPerformer =
          industryStatistics.topPerformers[
            kpi.key
          ];

        const industryGap =
          Number(
            (
              companyValue -
              industryAverage
            ).toFixed(1)
          );

        const targetGap =
          Number(
            (
              companyValue -
              companyTarget
            ).toFixed(1)
          );

        return {
          key: kpi.key,
          name: kpi.label,
          dimension: kpi.dimension,
          unit: kpi.unit,
          direction: kpi.direction,
          weight: kpi.weight,

          companyValue,

          // Company's own approved target
          companyTarget,

          // Kept for compatibility with main dashboard
          target: companyTarget,

          industryAverage,
          industryMedian,
          topPerformer,

          difference:
            industryGap,

          industryGap,
          targetGap,

          industryStatus:
            industryGap >= 0
              ? "Above industry average"
              : "Below industry average",

          targetStatus:
            targetGap >= 0
              ? "Company target achieved"
              : "Company target not achieved",
        };
      });

    const overallScore =
      calculateWeightedScore(
        companyValues,
        formData.industry
      );

    const companyTargetScore =
      selectedKpis.reduce(
        (total, kpi) =>
          total +
          Number(
            companyTargets[
              kpi.key
            ]
          ) *
            (kpi.weight /
              100),
        0
      );

    const recommendations =
      generateCompanyRecommendations(
        companyValues,
        industryStatistics,
        formData.industry
      );

    const resultData = {
      companyName:
        formData.companyName,

      industry:
        formData.industry,

      reportingPeriod:
        formData.reportingPeriod,

      overallScore:
        overallScore.toFixed(1),

      companyTargetScore:
        companyTargetScore.toFixed(
          1
        ),

      companyTargets,

      numberOfCompanies:
        industryStatistics.numberOfCompanies,

      companyValues,

      comparison,

      calculations:
        assessment.calculations,

      recommendations,

      generatedAt:
        new Date().toISOString(),
    };

    setResults(resultData);

    localStorage.setItem(
      "indubenchCompanyData",
      JSON.stringify(resultData)
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // ==========================================================
  // RESET
  // ==========================================================

  function resetAssessment() {
    setFormData(
      initialFormData
    );

    setCompanyTargets(
      createInitialTargets(
        "Manufacturing"
      )
    );

    setTargetsConfirmed(false);

    setAssessmentAnswers(
      createInitialAssessmentAnswers(
        "Manufacturing"
      )
    );

    setCurrentKpiIndex(0);

    setResults(null);

    setFormError("");

    localStorage.removeItem(
      "indubenchCompanyData"
    );
  }

  // ==========================================================
  // PRIORITY STYLE
  // ==========================================================

  function getPriorityStyle(
    priority
  ) {
    if (priority === "High") {
      return "border-red-500 bg-red-50 text-red-700";
    }

    if (priority === "Medium") {
      return "border-orange-500 bg-orange-50 text-orange-700";
    }

    return "border-yellow-500 bg-yellow-50 text-yellow-700";
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="industrial-background min-h-screen text-slate-900">

      {/* HEADER */}

      <header className="border-b-4 border-emerald-500 bg-slate-900 px-6 py-5 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">

          <div>
            <h1 className="text-2xl font-bold">
              InduBench{" "}
              <span className="text-emerald-400">
                SA
              </span>
            </h1>

            <p className="text-sm text-slate-300">
              Industry Performance
              Benchmarking Tool
            </p>
          </div>

          <a
            href="/"
            className="border border-slate-500 px-5 py-3 font-semibold text-white hover:bg-slate-800"
          >
            Back to Dashboard
          </a>

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* INTRO */}

        <section className="mb-6 border-l-8 border-emerald-500 bg-white p-6 shadow-sm">

          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Industry Performance Assessment
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Detailed Company Benchmarking
          </h2>

          <p className="mt-2 max-w-4xl text-slate-600">
            The company sets its own KPI
            targets and provides raw
            operational information.
            InduBench SA then calculates
            actual KPI performance and
            compares it with both the
            company target and the selected
            Industry Reference Group.
          </p>

          <p className="mt-2 text-sm font-medium text-orange-600">
            Industry reference companies
            and benchmark values used in
            this prototype are fictional and
            are used for demonstration.
          </p>

        </section>

        {/* COMPANY INFORMATION */}

        <section className="mb-6 border border-slate-300 bg-white p-6 shadow-sm">

          <h3 className="mb-5 border-b border-slate-200 pb-3 text-xl font-bold">
            Company Information
          </h3>

          <div className="grid gap-5 md:grid-cols-3">

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Company Name
              </label>

              <input
                name="companyName"
                type="text"
                value={
                  formData.companyName
                }
                onChange={
                  handleCompanyChange
                }
                placeholder={`Example: ${formData.industry} Company`}
                disabled={
                  targetsConfirmed
                }
                className="w-full border border-slate-400 bg-white px-4 py-3 outline-none focus:border-emerald-500 disabled:bg-slate-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Industry Reference Group
              </label>

              <select
                name="industry"
                value={
                  formData.industry
                }
                onChange={
                  handleCompanyChange
                }
                disabled={
                  targetsConfirmed
                }
                className="w-full border border-slate-400 bg-white px-4 py-3 outline-none focus:border-emerald-500 disabled:bg-slate-100"
              >
                <option>
                  Manufacturing
                </option>

                <option>
                  Automotive
                </option>

                <option>
                  Logistics
                </option>

                <option>
                  Construction
                </option>

                <option>
                  Food Processing
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Reporting Period
              </label>

              <input
                name="reportingPeriod"
                type="text"
                value={
                  formData.reportingPeriod
                }
                onChange={
                  handleCompanyChange
                }
                disabled={
                  targetsConfirmed
                }
                className="w-full border border-slate-400 bg-white px-4 py-3 outline-none focus:border-emerald-500 disabled:bg-slate-100"
              />
            </div>

          </div>

        </section>

        {/* TARGET SETUP */}

        {!targetsConfirmed && (
          <section className="mb-6 border border-blue-300 bg-white p-6 shadow-sm">

            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Step 1
            </p>

            <h3 className="mt-1 text-2xl font-bold">
              Set Company KPI Targets
            </h3>

            <p className="mt-2 max-w-4xl text-sm text-slate-600">
              Enter the approved target
              your company wants to achieve
              for each KPI. Default values
              are provided only for
              demonstration and can be
              changed.
            </p>

            <div className="mt-5 border-l-4 border-blue-500 bg-blue-50 p-4">

              <p className="font-semibold text-blue-900">
                Why are company targets
                required?
              </p>

              <p className="mt-1 text-sm text-blue-800">
                InduBench SA will compare
                each calculated KPI against
                both your company target and
                the fictional industry
                reference average.
              </p>

            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">

              {selectedKpis.map(
                (kpi, index) => (
                  <div
                    key={kpi.key}
                    className="border border-slate-300 p-4"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <p className="text-xs font-bold uppercase text-slate-500">
                          KPI {index + 1}
                        </p>

                        <p className="mt-1 font-semibold">
                          {kpi.label}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {kpi.dimension}
                        </p>

                      </div>

                      <span className="text-xs text-slate-500">
                        Weight:{" "}
                        {kpi.weight}%
                      </span>

                    </div>

                    <div className="mt-3 flex">

                      <input
                        name={kpi.key}
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={
                          companyTargets[
                            kpi.key
                          ]
                        }
                        onChange={
                          handleTargetChange
                        }
                        className="w-full border border-slate-400 px-4 py-3 outline-none focus:border-blue-500"
                      />

                      <span className="flex items-center border border-l-0 border-slate-400 bg-slate-100 px-4 font-semibold">
                        %
                      </span>

                    </div>

                  </div>
                )
              )}

            </div>

            {formError && (
              <div className="mt-5 border-l-4 border-red-500 bg-red-50 p-4 text-sm font-semibold text-red-700">
                {formError}
              </div>
            )}

            <div className="mt-6">

              <button
                type="button"
                onClick={
                  confirmTargets
                }
                className="border border-blue-600 bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Confirm Targets & Start Assessment
              </button>

            </div>

          </section>
        )}

        {/* ACTIVE INDUSTRY ASSESSMENT */}

        {targetsConfirmed &&
          activeQuestionBank && (
            <div className="grid items-start gap-6 xl:grid-cols-[1fr_420px]">

              <form
                onSubmit={
                  handleSubmit
                }
                className="border border-slate-300 bg-white p-6 shadow-sm"
              >

                {/* PROGRESS */}

                <div className="mb-6">

                  <div className="flex flex-wrap items-center justify-between gap-3">

                    <div>

                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                        Step 2 — Full {formData.industry} Assessment
                      </p>

                      <h3 className="mt-1 text-xl font-bold">
                        KPI{" "}
                        {currentKpiIndex +
                          1}{" "}
                        of{" "}
                        {
                          assessmentKpis.length
                        }
                      </h3>

                    </div>

                    <button
                      type="button"
                      onClick={
                        editTargets
                      }
                      className="border border-blue-400 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
                    >
                      Edit Company Targets
                    </button>

                  </div>

                  <div className="mt-4 h-3 overflow-hidden bg-slate-200">

                    <div
                      className="h-full bg-emerald-500 transition-all"
                      style={{
                        width: `${
                          ((currentKpiIndex +
                            1) /
                            assessmentKpis.length) *
                          100
                        }%`,
                      }}
                    />

                  </div>

                </div>

                {/* KPI NAVIGATION */}

                <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-5">

                  {assessmentKpis.map(
                    (kpi, index) => (
                      <button
                        key={kpi.key}
                        type="button"
                        onClick={() => {
                          setCurrentKpiIndex(
                            index
                          );

                          setFormError("");
                        }}
                        className={`border p-2 text-left text-xs font-semibold ${
                          index ===
                          currentKpiIndex
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : "border-slate-300 bg-white text-slate-700"
                        }`}
                      >
                        <span className="block">
                          KPI{" "}
                          {index + 1}
                        </span>

                        <span className="mt-1 block font-normal">
                          {kpi.label}
                        </span>
                      </button>
                    )
                  )}

                </div>

                {/* CURRENT KPI */}

                <section className="border-l-4 border-emerald-500 bg-emerald-50 p-5">

                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    {
                      currentKpi?.dimension
                    }
                  </p>

                  <h4 className="mt-1 text-2xl font-bold">
                    {
                      currentQuestionGroup?.name
                    }
                  </h4>

                  <p className="mt-2 text-sm text-slate-600">
                    {
                      currentQuestionGroup?.description
                    }
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3 text-xs">

                    <span className="border border-blue-300 bg-white px-3 py-2">
                      Company Target:{" "}
                      <strong>
                        {
                          companyTargets[
                            currentKpi?.key
                          ]
                        }
                        %
                      </strong>
                    </span>

                    <span className="border border-emerald-200 bg-white px-3 py-2">
                      KPI Weight:{" "}
                      <strong>
                        {
                          currentKpi?.weight
                        }
                        %
                      </strong>
                    </span>

                    <span className="border border-emerald-200 bg-white px-3 py-2">
                      Score calculated automatically
                    </span>

                  </div>

                </section>

                {/* QUESTIONS */}

                <div className="mt-6 grid gap-5 md:grid-cols-2">

                  {currentQuestionGroup?.questions.map(
                    (question) => (
                      <div
                        key={
                          question.id
                        }
                      >

                        <label className="mb-2 block text-sm font-semibold leading-5">
                          {
                            question.label
                          }
                        </label>

                        <div className="flex">

                          <input
                            name={
                              question.id
                            }
                            type="number"
                            min="0"
                            step="0.01"
                            value={
                              assessmentAnswers[
                                question.id
                              ]
                            }
                            onChange={
                              handleAnswerChange
                            }
                            required
                            className="w-full border border-slate-400 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                          />

                          <span className="flex min-w-[95px] items-center justify-center border border-l-0 border-slate-400 bg-slate-100 px-3 text-center text-xs text-slate-600">
                            {
                              question.unit
                            }
                          </span>

                        </div>

                      </div>
                    )
                  )}

                </div>

                {formError && (
                  <div className="mt-6 border-l-4 border-red-500 bg-red-50 p-4 text-sm font-semibold text-red-700">
                    {formError}
                  </div>
                )}

                {/* BUTTONS */}

                <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-slate-200 pt-5">

                  <button
                    type="button"
                    onClick={
                      goToPreviousKpi
                    }
                    disabled={
                      currentKpiIndex ===
                      0
                    }
                    className="border border-slate-400 bg-white px-6 py-3 font-semibold text-slate-700 disabled:opacity-40"
                  >
                    Previous KPI
                  </button>

                  {currentKpiIndex <
                  assessmentKpis.length -
                    1 ? (
                    <button
                      type="button"
                      onClick={
                        goToNextKpi
                      }
                      className="border border-emerald-600 bg-emerald-600 px-6 py-3 font-semibold text-white"
                    >
                      Next KPI
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="border border-emerald-600 bg-emerald-600 px-6 py-3 font-semibold text-white"
                    >
                      Calculate & Benchmark
                    </button>
                  )}

                </div>

              </form>

              {/* SIDE PANEL */}

              <aside className="xl:sticky xl:top-6">

                {!results ? (
                  <section className="border border-slate-300 bg-white p-6 shadow-sm">

                    <h3 className="text-lg font-bold">
                      Assessment Progress
                    </h3>

                    <p className="mt-2 text-sm text-slate-600">
                      Complete all 10 KPI
                      sections. Every final
                      KPI result will be
                      calculated automatically.
                    </p>

                    <div className="mt-5 space-y-2">

                      {assessmentKpis.map(
                        (kpi, index) => (
                          <div
                            key={
                              kpi.key
                            }
                            className="flex items-center justify-between border border-slate-200 p-3 text-sm"
                          >
                            <span>
                              {index + 1}.{" "}
                              {kpi.label}
                            </span>

                            <span className="text-xs text-blue-600">
                              Target{" "}
                              {
                                companyTargets[
                                  kpi.key
                                ]
                              }
                              %
                            </span>
                          </div>
                        )
                      )}

                    </div>

                  </section>
                ) : (
                  <section className="border border-slate-300 bg-white p-6 shadow-sm">

                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Benchmark Result
                    </p>

                    <h3 className="mt-1 text-xl font-bold">
                      {
                        results.companyName
                      }
                    </h3>

                    <div className="mt-5 border-l-4 border-emerald-500 bg-emerald-50 p-4">

                      <p className="text-sm text-slate-600">
                        Weighted Actual Score
                      </p>

                      <p className="text-3xl font-bold text-emerald-700">
                        {
                          results.overallScore
                        }
                        %
                      </p>

                    </div>

                    <div className="mt-3 border-l-4 border-blue-500 bg-blue-50 p-4">

                      <p className="text-sm text-slate-600">
                        Weighted Company Target
                      </p>

                      <p className="text-2xl font-bold text-blue-700">
                        {
                          results.companyTargetScore
                        }
                        %
                      </p>

                    </div>

                  </section>
                )}

              </aside>

            </div>
          )}

        {/* RESULTS */}

        {results && (
          <section className="mt-8">

            <div className="mb-6 border-l-8 border-emerald-500 bg-slate-900 p-6 text-white">

              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                Complete Benchmarking Report
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                10-KPI {results.industry} Performance Results
              </h2>

              <p className="mt-2 text-slate-300">
                Each KPI is compared with
                the company&apos;s own target
                and the fictional{" "}
                {results.industry} reference
                group.
              </p>

            </div>

            <div className="grid gap-5 lg:grid-cols-2">

              {results.comparison.map(
                (item) => {
                  const calculation =
                    results.calculations[
                      item.key
                    ];

                  return (
                    <article
                      key={item.key}
                      className="border border-slate-300 bg-white p-5 shadow-sm"
                    >

                      <div className="flex flex-wrap items-start justify-between gap-4">

                        <div>

                          <p className="text-xs font-bold uppercase text-slate-500">
                            {
                              item.dimension
                            }
                          </p>

                          <h3 className="mt-1 text-lg font-bold">
                            {item.name}
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            Weight:{" "}
                            {item.weight}%
                          </p>

                        </div>

                        <p className="text-2xl font-bold">
                          {
                            item.companyValue
                          }
                          %
                        </p>

                      </div>

                      {/* TWO COMPARISONS */}

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">

                        <div className="border border-blue-200 bg-blue-50 p-4">

                          <p className="text-xs text-blue-700">
                            Company Target
                          </p>

                          <p className="mt-1 text-xl font-bold">
                            {
                              item.companyTarget
                            }
                            %
                          </p>

                          <p
                            className={`mt-2 text-sm font-semibold ${
                              item.targetGap >=
                              0
                                ? "text-green-700"
                                : "text-red-700"
                            }`}
                          >
                            {item.targetGap >=
                            0
                              ? "+"
                              : ""}
                            {
                              item.targetGap
                            }{" "}
                            points vs target
                          </p>

                        </div>

                        <div className="border border-emerald-200 bg-emerald-50 p-4">

                          <p className="text-xs text-emerald-700">
                            Industry Average
                          </p>

                          <p className="mt-1 text-xl font-bold">
                            {
                              item.industryAverage
                            }
                            %
                          </p>

                          <p
                            className={`mt-2 text-sm font-semibold ${
                              item.industryGap >=
                              0
                                ? "text-green-700"
                                : "text-red-700"
                            }`}
                          >
                            {item.industryGap >=
                            0
                              ? "+"
                              : ""}
                            {
                              item.industryGap
                            }{" "}
                            points vs industry
                          </p>

                        </div>

                      </div>

                      {/* EXTRA BENCHMARKS */}

                      <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs">

                        <div className="border border-slate-200 bg-slate-50 p-3">

                          <p className="text-slate-500">
                            Industry Median
                          </p>

                          <strong>
                            {
                              item.industryMedian
                            }
                            %
                          </strong>

                        </div>

                        <div className="border border-slate-200 bg-slate-50 p-3">

                          <p className="text-slate-500">
                            Top Performer
                          </p>

                          <strong>
                            {
                              item.topPerformer
                            }
                            %
                          </strong>

                        </div>

                      </div>

                      {/* BREAKDOWN */}

                      {calculation && (
                        <div className="mt-5 border-t border-slate-200 pt-4">

                          <p className="text-sm font-bold">
                            Calculation Breakdown
                          </p>

                          <div className="mt-3 grid gap-2 sm:grid-cols-2">

                            {Object.entries(
                              calculation.breakdown
                            ).map(
                              ([
                                key,
                                value,
                              ]) => (
                                <div
                                  key={key}
                                  className="flex items-center justify-between border border-blue-100 bg-blue-50 p-3 text-sm"
                                >

                                  <span>
                                    {breakdownLabels[
                                      key
                                    ] ||
                                      key}
                                  </span>

                                  <strong>
                                    {formatBreakdownValue(
                                      key,
                                      value
                                    )}
                                  </strong>

                                </div>
                              )
                            )}

                          </div>

                        </div>
                      )}

                      <div className="mt-4 grid gap-2 border-t border-slate-200 pt-3 text-sm font-semibold sm:grid-cols-2">

                        <p
                          className={
                            item.targetGap >=
                            0
                              ? "text-green-700"
                              : "text-orange-700"
                          }
                        >
                          {
                            item.targetStatus
                          }
                        </p>

                        <p
                          className={
                            item.industryGap >=
                            0
                              ? "text-green-700"
                              : "text-orange-700"
                          }
                        >
                          {
                            item.industryStatus
                          }
                        </p>

                      </div>

                    </article>
                  );
                }
              )}

            </div>

            {/* RECOMMENDATIONS */}

            <section className="mt-8 border border-slate-300 bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold">
                Recommended Improvement Actions
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                Current recommendations are
                prioritised using the
                company&apos;s gap to the
                Industry Reference Group.
              </p>

              {results.recommendations
                .length === 0 ? (
                <div className="mt-5 border-l-4 border-green-500 bg-green-50 p-4 text-green-700">
                  All calculated KPIs are
                  equal to or above their
                  industry reference
                  averages.
                </div>
              ) : (
                <div className="mt-5 grid gap-4 lg:grid-cols-2">

                  {results.recommendations.map(
                    (
                      recommendation,
                      index
                    ) => (
                      <article
                        key={
                          recommendation.metric
                        }
                        className="border border-slate-300 p-5"
                      >

                        <div className="flex items-start justify-between gap-3">

                          <div>

                            <p className="text-xs font-bold uppercase text-slate-500">
                              Improvement Priority{" "}
                              {index + 1}
                            </p>

                            <h3 className="mt-1 font-bold">
                              {
                                recommendation.label
                              }
                            </h3>

                          </div>

                          <span
                            className={`border-l-4 px-3 py-2 text-xs font-bold ${getPriorityStyle(
                              recommendation.priority
                            )}`}
                          >
                            {
                              recommendation.priority
                            }
                          </span>

                        </div>

                        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">

                          {recommendation.actions.map(
                            (action) => (
                              <li
                                key={
                                  action
                                }
                              >
                                {action}
                              </li>
                            )
                          )}

                        </ul>

                      </article>
                    )
                  )}

                </div>
              )}

            </section>

            <div className="mt-6">

              <button
                type="button"
                onClick={
                  resetAssessment
                }
                className="border border-emerald-600 bg-emerald-600 px-6 py-3 font-semibold text-white"
              >
                Start New Assessment
              </button>

            </div>

          </section>
        )}

      </main>

      <footer className="mt-10 border-t-4 border-emerald-500 bg-slate-900 py-5 text-center text-sm text-slate-400">
        InduBench SA Prototype •
        Synthetic industry reference
        data used for demonstration
      </footer>

    </div>
  );
}