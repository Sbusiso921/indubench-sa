"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  calculateIndustryStatistics,
  calculateWeightedScore,
  generateCompanyRecommendations,
  getKpiDefinitions,
} from "./benchmarkData";

// ============================================================
// DEMONSTRATION DATA
// ============================================================

function createSampleData() {
  const industry =
    "Manufacturing";

  const definitions =
    getKpiDefinitions(industry);

  const companyValues = {
    productivity: 87.4,
    quality: 94.5,
    oee: 71.2,
    capacityUtilisation: 78.8,
    downtimePerformance: 87.5,
    scrapPerformance: 92,
    delivery: 90.4,
    inventoryPerformance: 90.3,
    energy: 93.3,
    safety: 89.3,
  };

  const statistics =
    calculateIndustryStatistics(
      industry
    );

  const comparison =
    definitions.map((kpi) => {
      const companyValue =
        Number(
          companyValues[kpi.key]
        );

      const industryAverage =
        statistics.averages[
          kpi.key
        ];

      const industryMedian =
        statistics.medians[
          kpi.key
        ];

      const topPerformer =
        statistics.topPerformers[
          kpi.key
        ];

      const difference =
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
            kpi.target
          ).toFixed(1)
        );

      return {
        key: kpi.key,
        name: kpi.label,
        dimension:
          kpi.dimension,
        unit: kpi.unit,
        direction:
          kpi.direction,
        weight: kpi.weight,

        companyValue,

        companyTarget:
          kpi.target,

        target:
          kpi.target,

        benchmark:
          industryAverage,

        industryAverage,
        industryMedian,
        topPerformer,

        difference,

        industryGap:
          difference,

        targetGap,

        industryStatus:
          difference >= 0
            ? "Above industry average"
            : "Below industry average",

        targetStatus:
          targetGap >= 0
            ? "Company target achieved"
            : "Company target not achieved",
      };
    });

  const recommendations =
    generateCompanyRecommendations(
      companyValues,
      statistics,
      industry
    );

  const overallScore =
    calculateWeightedScore(
      companyValues,
      industry
    );

  const companyTargetScore =
    definitions.reduce(
      (total, kpi) =>
        total +
        kpi.target *
          (kpi.weight / 100),
      0
    );

  return {
    companyName:
      "Demo Manufacturing Company",

    industry,

    reportingPeriod:
      "2026",

    overallScore:
      overallScore.toFixed(1),

    companyTargetScore:
      companyTargetScore.toFixed(
        1
      ),

    numberOfCompanies:
      statistics.numberOfCompanies,

    companyValues,

    comparison,

    recommendations,

    calculations: {},

    generatedAt:
      new Date().toISOString(),
  };
}

const sampleData =
  createSampleData();

// ============================================================
// PRIORITY LOGIC
// ============================================================

function getPriority(
  difference
) {
  const gap =
    Number(difference);

  if (!Number.isFinite(gap)) {
    return "Not Available";
  }

  if (gap <= -10) {
    return "High";
  }

  if (gap <= -5) {
    return "Medium";
  }

  if (gap < 0) {
    return "Low";
  }

  return "On Track";
}

function getPriorityStyle(
  priority
) {
  if (
    priority === "High"
  ) {
    return "border-red-300 bg-red-50 text-red-700";
  }

  if (
    priority === "Medium"
  ) {
    return "border-orange-300 bg-orange-50 text-orange-700";
  }

  if (
    priority === "Low"
  ) {
    return "border-yellow-300 bg-yellow-50 text-yellow-700";
  }

  if (
    priority ===
    "Not Available"
  ) {
    return "border-slate-300 bg-slate-50 text-slate-600";
  }

  return "border-green-300 bg-green-50 text-green-700";
}

// ============================================================
// FORMAT VALUES
// ============================================================

function formatGap(value) {
  const number =
    Number(value);

  if (
    !Number.isFinite(number)
  ) {
    return "N/A";
  }

  return `${
    number >= 0 ? "+" : ""
  }${number}%`;
}

function formatPercentage(
  value
) {
  const number =
    Number(value);

  if (
    !Number.isFinite(number)
  ) {
    return "N/A";
  }

  return `${number}%`;
}

// ============================================================
// INDUSTRY THEMES
// ============================================================

const industryThemes = {
  Manufacturing: [
    "#059669",
    "#0f766e",
  ],

  Automotive: [
    "#2563eb",
    "#1e3a8a",
  ],

  Logistics: [
    "#d97706",
    "#9a3412",
  ],

  Construction: [
    "#ca8a04",
    "#475569",
  ],

  "Food Processing": [
    "#16a34a",
    "#166534",
  ],
};

// ============================================================
// HOME DASHBOARD
// ============================================================

export default function Home() {
  const [
    companyData,
    setCompanyData,
  ] = useState(
    sampleData
  );

  const [
    usingSavedData,
    setUsingSavedData,
  ] = useState(false);

  // ==========================================================
  // LOAD SAVED ASSESSMENT
  // ==========================================================

  useEffect(() => {
    const savedData =
      localStorage.getItem(
        "indubenchCompanyData"
      );

    if (!savedData) {
      return;
    }

    try {
      const parsedData =
        JSON.parse(
          savedData
        );

      setCompanyData(
        parsedData
      );

      setUsingSavedData(
        true
      );
    } catch {
      setCompanyData(
        sampleData
      );

      setUsingSavedData(
        false
      );
    }
  }, []);

  // ==========================================================
  // INDUSTRY THEME
  // ==========================================================

  const industryTheme =
    industryThemes[
      companyData.industry
    ] ||
    industryThemes.Manufacturing;

  // ==========================================================
  // CLEAN + RECOVER KPI DATA
  // ==========================================================

  const rawComparisons =
    companyData.comparison ||
    [];

  const comparisons =
    rawComparisons.map(
      (item) => {
        let resolvedCompanyValue =
          item.companyValue;

        // Recover the calculated KPI
        // result if the saved comparison
        // value is missing or invalid.
        if (
          resolvedCompanyValue ===
            null ||
          resolvedCompanyValue ===
            undefined ||
          !Number.isFinite(
            Number(
              resolvedCompanyValue
            )
          )
        ) {
          resolvedCompanyValue =
            companyData
              .calculations?.[
              item.key
            ]?.score;
        }

        const companyValue =
          Number(
            resolvedCompanyValue
          );

        const industryAverage =
          Number(
            item.industryAverage ??
              item.benchmark
          );

        const target =
          Number(
            item.companyTarget ??
              item.target
          );

        const difference =
          Number.isFinite(
            companyValue
          ) &&
          Number.isFinite(
            industryAverage
          )
            ? Number(
                (
                  companyValue -
                  industryAverage
                ).toFixed(1)
              )
            : Number(
                item.difference ??
                  0
              );

        const targetGap =
          Number.isFinite(
            companyValue
          ) &&
          Number.isFinite(
            target
          )
            ? Number(
                (
                  companyValue -
                  target
                ).toFixed(1)
              )
            : Number(
                item.targetGap ??
                  0
              );

        return {
          ...item,

          companyValue:
            Number.isFinite(
              companyValue
            )
              ? companyValue
              : null,

          target:
            Number.isFinite(
              target
            )
              ? target
              : item.target,

          companyTarget:
            Number.isFinite(
              target
            )
              ? target
              : item.companyTarget,

          industryAverage:
            Number.isFinite(
              industryAverage
            )
              ? industryAverage
              : item.industryAverage,

          difference,

          industryGap:
            difference,

          targetGap,
        };
      }
    );

  // ==========================================================
  // SUMMARY DATA
  // ==========================================================

  const weakKpis =
    comparisons
      .filter(
        (item) =>
          Number.isFinite(
            Number(
              item.difference
            )
          ) &&
          item.difference < 0
      )
      .sort(
        (a, b) =>
          a.difference -
          b.difference
      );

  const strongKpis =
    comparisons.filter(
      (item) =>
        Number.isFinite(
          Number(
            item.difference
          )
        ) &&
        item.difference >= 0
    );

  const strongestKpi =
    comparisons.length > 0
      ? comparisons.reduce(
          (
            strongest,
            current
          ) => {
            if (
              !strongest
            ) {
              return current;
            }

            return (
              Number(
                current.difference
              ) >
              Number(
                strongest.difference
              )
                ? current
                : strongest
            );
          },
          null
        )
      : null;

  const improvementRecommendations =
    companyData
      .recommendations ||
    [];

  const overallScore =
    Number(
      companyData.overallScore ||
        0
    );

  const overallStatus =
    overallScore >= 85
      ? "Strong Performance"
      : overallScore >= 70
        ? "Developing Performance"
        : "Improvement Required";

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="industrial-background min-h-screen text-slate-900">

      {/* HEADER */}

      <header className="relative overflow-hidden border-b-4 border-emerald-500 bg-slate-950 px-6 py-4 text-white shadow-lg">

        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(52, 211, 153, 0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(52, 211, 153, 0.18) 1px, transparent 1px)",

            backgroundSize:
              "28px 28px",
          }}
        />

        <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center border-2 border-emerald-400 bg-emerald-500/10 text-sm font-black tracking-wider text-emerald-300">
              IB
            </div>

            <div>

              <h1 className="text-2xl font-bold tracking-tight">
                InduBench{" "}
                <span className="text-emerald-400">
                  SA
                </span>
              </h1>

              <p className="text-sm text-slate-300">
                Industry Performance Benchmarking Tool
              </p>

              <p className="mt-1 text-xs uppercase tracking-widest text-emerald-300">
                {
                  companyData.industry
                }{" "}
                Industry Intelligence
              </p>

            </div>

          </div>

          <div className="print:hidden flex items-center gap-3 border border-slate-700 bg-slate-900/80 p-2">

            <button
              type="button"
              onClick={() =>
                window.print()
              }
              className="border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-200"
            >
              Print / Save Report
            </button>

            <a
              href="/add-company"
              className="border border-emerald-400 bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600"
            >
              New Assessment
            </a>

          </div>

        </div>

      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* REPORT HEADER */}

        <section
          className="mb-6 border-l-8 border-white/40 p-8 text-white shadow-md"
          style={{
            background: `linear-gradient(120deg, ${industryTheme[0]}, ${industryTheme[1]})`,
          }}
        >

          <div className="flex flex-wrap items-start justify-between gap-6">

            <div>

              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-white/80">
                Performance Benchmark Report
              </p>

              <h2 className="text-3xl font-bold">
                {
                  companyData.companyName
                }
              </h2>

              <p className="mt-2 text-lg text-white/90">
                {
                  companyData.industry
                }{" "}
                Industry
              </p>

              <div className="mt-4 flex flex-wrap gap-3 text-sm">

                <span className="border border-white/40 bg-black/20 px-3 py-2">
                  Reporting period:{" "}
                  {
                    companyData.reportingPeriod ||
                    "2026"
                  }
                </span>

                <span className="border border-white/40 bg-black/20 px-3 py-2">
                  Reference group:{" "}
                  {
                    companyData.numberOfCompanies ||
                    4
                  }{" "}
                  fictional organisations
                </span>

                <span className="border border-white/40 bg-black/20 px-3 py-2">
                  {usingSavedData
                    ? "Company assessment"
                    : "Demonstration assessment"}
                </span>

              </div>

            </div>

            <div className="border border-white/40 bg-black/20 p-5 text-center">

              <p className="text-sm text-white/80">
                Weighted Score
              </p>

              <p className="mt-1 text-4xl font-bold">
                {
                  companyData.overallScore
                }
                %
              </p>

              <p className="mt-2 text-sm font-semibold text-white/90">
                {
                  overallStatus
                }
              </p>

            </div>

          </div>

        </section>

        {/* SUMMARY CARDS */}

        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="border-l-4 border-blue-500 bg-white p-5 shadow-sm">

            <p className="text-sm text-slate-500">
              KPIs Assessed
            </p>

            <p className="mt-2 text-3xl font-bold">
              {
                comparisons.length
              }
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Industry-specific performance indicators
            </p>

          </div>

          <div className="border-l-4 border-green-500 bg-white p-5 shadow-sm">

            <p className="text-sm text-slate-500">
              KPIs Above Average
            </p>

            <p className="mt-2 text-3xl font-bold text-green-700">
              {
                strongKpis.length
              }
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Meeting or exceeding the industry benchmark
            </p>

          </div>

          <div className="border-l-4 border-orange-500 bg-white p-5 shadow-sm">

            <p className="text-sm text-slate-500">
              Improvement Priorities
            </p>

            <p className="mt-2 text-3xl font-bold text-orange-700">
              {
                weakKpis.length
              }
            </p>

            <p className="mt-1 text-xs text-slate-500">
              KPIs below the industry average
            </p>

          </div>

          <div className="border-l-4 border-purple-500 bg-white p-5 shadow-sm">

            <p className="text-sm text-slate-500">
              Strongest KPI
            </p>

            <p className="mt-2 text-lg font-bold">
              {
                strongestKpi?.name ||
                "Not available"
              }
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Gap:{" "}
              {strongestKpi
                ? formatGap(
                    strongestKpi.difference
                  )
                : "N/A"}
            </p>

          </div>

        </section>

        {/* KPI CARDS */}

        <section className="mb-8">

          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">

            <div>

              <h2 className="text-xl font-bold">
                Key Performance Indicators
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Ten industry-specific KPIs covering operational,
                quality, equipment, delivery, sustainability and
                safety performance
              </p>

            </div>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

            {comparisons.map(
              (kpi) => {
                const priority =
                  getPriority(
                    kpi.difference
                  );

                return (
                  <article
                    key={
                      kpi.key ||
                      kpi.name
                    }
                    className={`border border-slate-200 border-l-4 bg-white p-5 shadow-sm ${
                      kpi.difference >=
                      0
                        ? "border-l-green-500"
                        : kpi.difference <=
                            -10
                          ? "border-l-red-500"
                          : "border-l-orange-500"
                    }`}
                  >

                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {
                        kpi.dimension ||
                        "Performance KPI"
                      }
                    </p>

                    <h3 className="mt-2 font-bold">
                      {
                        kpi.name
                      }
                    </h3>

                    <p className="mt-3 text-3xl font-bold">
                      {
                        formatPercentage(
                          kpi.companyValue
                        )
                      }
                    </p>

                    <div className="mt-3 space-y-1 border-t border-slate-200 pt-3 text-sm text-slate-600">

                      <p>
                        Target:{" "}
                        <strong>
                          {
                            formatPercentage(
                              kpi.target ??
                                kpi.companyTarget
                            )
                          }
                        </strong>
                      </p>

                      <p>
                        Average:{" "}
                        <strong>
                          {
                            formatPercentage(
                              kpi.industryAverage ??
                                kpi.benchmark
                            )
                          }
                        </strong>
                      </p>

                      <p>
                        Median:{" "}
                        <strong>
                          {
                            formatPercentage(
                              kpi.industryMedian
                            )
                          }
                        </strong>
                      </p>

                      <p>
                        Top performer:{" "}
                        <strong>
                          {
                            formatPercentage(
                              kpi.topPerformer
                            )
                          }
                        </strong>
                      </p>

                      <p>
                        Weight:{" "}
                        <strong>
                          {
                            formatPercentage(
                              kpi.weight
                            )
                          }
                        </strong>
                      </p>

                    </div>

                    <div
                      className={`mt-4 border px-3 py-2 text-sm font-bold ${getPriorityStyle(
                        priority
                      )}`}
                    >
                      {
                        priority
                      }
                    </div>

                  </article>
                );
              }
            )}

          </div>

        </section>

        {/* DETAILED COMPARISON */}

        <section className="mb-8 border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-5">

            <h2 className="text-xl font-bold">
              Detailed Benchmark Comparison
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Results compared with company targets and the selected
              synthetic industry reference group
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1100px] text-left text-sm">

              <thead className="bg-slate-900 text-white">

                <tr>
                  <th className="px-4 py-4">
                    KPI
                  </th>

                  <th className="px-4 py-4">
                    Weight
                  </th>

                  <th className="px-4 py-4">
                    Company
                  </th>

                  <th className="px-4 py-4">
                    Target
                  </th>

                  <th className="px-4 py-4">
                    Average
                  </th>

                  <th className="px-4 py-4">
                    Median
                  </th>

                  <th className="px-4 py-4">
                    Top Performer
                  </th>

                  <th className="px-4 py-4">
                    Industry Gap
                  </th>

                  <th className="px-4 py-4">
                    Priority
                  </th>
                </tr>

              </thead>

              <tbody>

                {comparisons.map(
                  (kpi) => {
                    const priority =
                      getPriority(
                        kpi.difference
                      );

                    return (
                      <tr
                        key={
                          kpi.key ||
                          kpi.name
                        }
                        className="border-t border-slate-200"
                      >

                        <td className="border-r border-slate-200 px-4 py-4">

                          <p className="font-semibold">
                            {
                              kpi.name
                            }
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {
                              kpi.dimension
                            }
                          </p>

                        </td>

                        <td className="px-4 py-4">
                          {
                            formatPercentage(
                              kpi.weight
                            )
                          }
                        </td>

                        <td className="px-4 py-4 font-semibold">
                          {
                            formatPercentage(
                              kpi.companyValue
                            )
                          }
                        </td>

                        <td className="px-4 py-4">
                          {
                            formatPercentage(
                              kpi.target ??
                                kpi.companyTarget
                            )
                          }
                        </td>

                        <td className="px-4 py-4">
                          {
                            formatPercentage(
                              kpi.industryAverage ??
                                kpi.benchmark
                            )
                          }
                        </td>

                        <td className="px-4 py-4">
                          {
                            formatPercentage(
                              kpi.industryMedian
                            )
                          }
                        </td>

                        <td className="px-4 py-4">
                          {
                            formatPercentage(
                              kpi.topPerformer
                            )
                          }
                        </td>

                        <td
                          className={`px-4 py-4 font-bold ${
                            kpi.difference >=
                            0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {
                            formatGap(
                              kpi.difference
                            )
                          }
                        </td>

                        <td className="px-4 py-4">

                          <span
                            className={`border px-3 py-2 font-semibold ${getPriorityStyle(
                              priority
                            )}`}
                          >
                            {
                              priority
                            }
                          </span>

                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>

        </section>

        {/* VISUAL BENCHMARK */}

        <section className="mb-8 border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6 border-b border-slate-200 pb-4">

            <h2 className="text-xl font-bold">
              Visual Benchmark Comparison
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Comparison of company results, targets, industry
              averages and top performers
            </p>

          </div>

          <div className="mb-6 flex flex-wrap gap-5 text-sm">

            <div className="flex items-center gap-2">
              <span className="h-4 w-4 bg-blue-500"></span>
              <span>
                Your Company
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-4 w-4 bg-purple-500"></span>
              <span>
                Target
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-4 w-4 bg-orange-500"></span>
              <span>
                Industry Average
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-4 w-4 bg-green-500"></span>
              <span>
                Top Performer
              </span>
            </div>

          </div>

          <div className="space-y-8">

            {comparisons.map(
              (kpi) => {
                const average =
                  Number(
                    kpi.industryAverage ??
                      kpi.benchmark ??
                      0
                  );

                const bars = [
                  {
                    label:
                      "Your Company",
                    value:
                      Number(
                        kpi.companyValue ??
                          0
                      ),
                    colour:
                      "bg-blue-500",
                  },

                  {
                    label:
                      "Target",
                    value:
                      Number(
                        kpi.target ??
                          kpi.companyTarget ??
                          0
                      ),
                    colour:
                      "bg-purple-500",
                  },

                  {
                    label:
                      "Industry Average",
                    value:
                      average,
                    colour:
                      "bg-orange-500",
                  },

                  {
                    label:
                      "Top Performer",
                    value:
                      Number(
                        kpi.topPerformer ??
                          0
                      ),
                    colour:
                      "bg-green-500",
                  },
                ];

                return (
                  <div
                    key={
                      kpi.key ||
                      kpi.name
                    }
                    className="break-inside-avoid"
                  >

                    <h3 className="mb-3 font-bold">
                      {
                        kpi.name
                      }
                    </h3>

                    <div className="space-y-2">

                      {bars.map(
                        (bar) => (
                          <div
                            key={
                              bar.label
                            }
                            className="flex items-center gap-3"
                          >

                            <span className="w-36 text-sm text-slate-600">
                              {
                                bar.label
                              }
                            </span>

                            <div className="h-7 flex-1 bg-slate-200">

                              <div
                                className={`flex h-7 items-center justify-end px-2 text-sm font-bold text-white ${bar.colour}`}
                                style={{
                                  width: `${Math.min(
                                    Number(
                                      bar.value
                                    ) ||
                                      0,
                                    100
                                  )}%`,
                                }}
                              >
                                {
                                  formatPercentage(
                                    bar.value
                                  )
                                }
                              </div>

                            </div>

                          </div>
                        )
                      )}

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </section>

        {/* PERFORMANCE + PRIORITIES */}

        <section className="mb-8 grid items-start gap-6 lg:grid-cols-2">

          <div className="border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
              Performance Summary
            </h2>

            <p className="mb-6 mt-1 text-sm text-slate-500">
              Company performance across the selected
              industry-specific KPIs
            </p>

            <div className="space-y-5">

              {comparisons.map(
                (kpi) => {
                  const value =
                    Number(
                      kpi.companyValue
                    );

                  return (
                    <div
                      key={
                        kpi.key ||
                        kpi.name
                      }
                    >

                      <div className="mb-2 flex justify-between gap-3 text-sm font-medium">

                        <span>
                          {
                            kpi.name
                          }
                        </span>

                        <span>
                          {
                            formatPercentage(
                              value
                            )
                          }
                        </span>

                      </div>

                      <div className="h-3 bg-slate-200">

                        <div
                          className={`h-3 ${
                            kpi.difference >=
                            0
                              ? "bg-green-500"
                              : kpi.difference <=
                                  -10
                                ? "bg-red-500"
                                : "bg-orange-500"
                          }`}
                          style={{
                            width: `${Math.min(
                              Number.isFinite(
                                value
                              )
                                ? value
                                : 0,
                              100
                            )}%`,
                          }}
                        />

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </div>

          <div className="border-l-8 border-emerald-500 bg-slate-900 p-6 text-white shadow-sm">

            <h2 className="text-xl font-bold">
              Improvement Priority Summary
            </h2>

            <p className="mb-5 mt-1 text-sm text-slate-400">
              KPIs are arranged from the largest negative
              industry gap to the smallest
            </p>

            {weakKpis.length ===
            0 ? (
              <div className="border border-green-500 bg-green-950 p-4">

                <p className="font-bold text-green-400">
                  All assessed KPIs meet the benchmark
                </p>

                <p className="mt-2 text-sm text-slate-300">
                  Maintain current performance and continue
                  monitoring the results.
                </p>

              </div>
            ) : (
              <div className="space-y-3">

                {weakKpis.map(
                  (
                    kpi,
                    index
                  ) => {
                    const priority =
                      getPriority(
                        kpi.difference
                      );

                    return (
                      <div
                        key={
                          kpi.key ||
                          kpi.name
                        }
                        className="border border-slate-700 bg-slate-800 p-4"
                      >

                        <div className="flex items-start justify-between gap-4">

                          <div>

                            <p className="text-xs uppercase tracking-wider text-slate-400">
                              Priority{" "}
                              {index +
                                1}
                            </p>

                            <p className="mt-1 font-semibold text-emerald-400">
                              Improve{" "}
                              {
                                kpi.name
                              }
                            </p>

                          </div>

                          <div className="text-right">

                            <p className="font-bold text-orange-400">
                              {
                                formatGap(
                                  kpi.difference
                                )
                              }
                            </p>

                            <p className="text-xs text-slate-400">
                              {
                                priority
                              }{" "}
                              priority
                            </p>

                          </div>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>
            )}

          </div>

        </section>

        {/* RECOMMENDATIONS */}

        <section className="mb-8 border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-5 border-b border-slate-200 pb-4">

            <h2 className="text-xl font-bold">
              Recommended Improvement Actions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Rule-based recommendations generated from each
              KPI result, performance gap and selected industry
            </p>

          </div>

          {improvementRecommendations.length ===
          0 ? (
            <div className="border-l-4 border-green-500 bg-green-50 p-5">

              <p className="font-bold text-green-700">
                No corrective actions required
              </p>

              <p className="mt-1 text-sm text-green-700">
                All KPIs are equal to or above their industry
                averages. Continue monitoring performance.
              </p>

            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-2">

              {improvementRecommendations.map(
                (
                  recommendation,
                  index
                ) => (
                  <article
                    key={
                      recommendation.metric
                    }
                    className="break-inside-avoid border border-slate-300 bg-slate-50 p-5"
                  >

                    <div className="flex flex-wrap items-start justify-between gap-3">

                      <div>

                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Improvement Priority{" "}
                          {index + 1}
                        </p>

                        <h3 className="mt-1 text-lg font-bold">
                          {
                            recommendation.label
                          }
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {
                            recommendation.dimension
                          }
                        </p>

                      </div>

                      <span
                        className={`border px-3 py-2 text-sm font-bold ${getPriorityStyle(
                          recommendation.priority
                        )}`}
                      >
                        {
                          recommendation.priority
                        }{" "}
                        Priority
                      </span>

                    </div>

                    <div className="mt-4 grid gap-2 border-y border-slate-300 py-3 text-sm sm:grid-cols-2">

                      <p>
                        Current result:{" "}
                        <strong>
                          {
                            formatPercentage(
                              recommendation.result
                            )
                          }
                        </strong>
                      </p>

                      <p>
                        Industry average:{" "}
                        <strong>
                          {
                            formatPercentage(
                              recommendation.benchmark
                            )
                          }
                        </strong>
                      </p>

                      <p>
                        Performance gap:{" "}
                        <strong className="text-red-600">
                          {
                            formatGap(
                              recommendation.gap
                            )
                          }
                        </strong>
                      </p>

                      <p>
                        Short-term target:{" "}
                        <strong className="text-emerald-700">
                          {
                            formatPercentage(
                              recommendation.shortTermTarget
                            )
                          }
                        </strong>
                      </p>

                    </div>

                    <p className="mt-4 text-sm font-semibold">
                      Recommended actions
                    </p>

                    <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">

                      {recommendation.actions.map(
                        (action) => (
                          <li
                            key={
                              action
                            }
                          >
                            {
                              action
                            }
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

        {/* METHOD */}

        <section className="mb-8 border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold">
            Benchmarking Method
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            How the prototype calculates and interprets the
            results
          </p>

          <div className="mt-5 grid gap-5 md:grid-cols-3">

            <div className="border-t-4 border-blue-500 bg-slate-50 p-4">

              <h3 className="font-bold">
                Reference Group
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                The selected industry is used as the peer
                group. The company is compared with fictional
                organisations in that industry.
              </p>

            </div>

            <div className="border-t-4 border-purple-500 bg-slate-50 p-4">

              <h3 className="font-bold">
                Weighted Score
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Each KPI result is multiplied by its assigned
                weight. The weighted KPI results are added to
                calculate the overall performance score.
              </p>

            </div>

            <div className="border-t-4 border-emerald-500 bg-slate-50 p-4">

              <h3 className="font-bold">
                Improvement Priority
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                An industry gap of 10 percentage points or more
                is High priority, 5 to 9.9 points is Medium,
                and less than 5 points is Low.
              </p>

            </div>

          </div>

        </section>

        {/* PRIVACY */}

        <section className="border border-orange-300 bg-orange-50 p-5">

          <h2 className="font-bold text-orange-800">
            Prototype Data and Privacy Notice
          </h2>

          <p className="mt-2 text-sm leading-6 text-orange-700">
            This prototype uses synthetic company and
            benchmark data for demonstration. The results are
            not official South African industry benchmarks.
            No confidential organisational or personal
            information should be entered into the prototype.
          </p>

        </section>

      </main>

      {/* FOOTER */}

      <footer className="mt-10 border-t-4 border-emerald-500 bg-slate-900 py-5 text-center text-sm text-slate-400">

        InduBench SA Prototype •
        Industry-Specific KPI Assessment •
        Synthetic data used for demonstration

      </footer>

    </div>
  );
}