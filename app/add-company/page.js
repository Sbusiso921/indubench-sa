"use client";

import { useState } from "react";
import {
  calculateIndustryStatistics,
  calculateWeightedScore,
  generateCompanyRecommendations,
  kpiDefinitions,
} from "../benchmarkData";

const initialFormData = {
  companyName: "",
  industry: "Manufacturing",
  reportingPeriod: "2026",
  productivity: "",
  quality: "",
  delivery: "",
  energy: "",
  safety: "",
};

export default function AddCompanyPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [results, setResults] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const industryStatistics =
      calculateIndustryStatistics(formData.industry);

    const companyValues = {};

    kpiDefinitions.forEach((kpi) => {
      companyValues[kpi.key] = Number(formData[kpi.key]);
    });

    const comparison = kpiDefinitions.map((kpi) => {
      const companyValue = companyValues[kpi.key];
      const industryAverage =
        industryStatistics.averages[kpi.key];
      const industryMedian =
        industryStatistics.medians[kpi.key];
      const topPerformer =
        industryStatistics.topPerformers[kpi.key];

      const difference = Number(
        (companyValue - industryAverage).toFixed(1)
      );

      return {
        key: kpi.key,
        name: kpi.label,
        dimension: kpi.dimension,
        unit: kpi.unit,
        direction: kpi.direction,
        weight: kpi.weight,
        target: kpi.target,
        companyValue,
        benchmark: industryAverage,
        industryAverage,
        industryMedian,
        topPerformer,
        difference,
        status:
          difference >= 0
            ? "Above industry average"
            : "Below industry average",
      };
    });

    const overallScore =
      calculateWeightedScore(companyValues);

    const recommendations =
      generateCompanyRecommendations(
        companyValues,
        industryStatistics,
        formData.industry
      );

    const resultData = {
      companyName: formData.companyName,
      industry: formData.industry,
      reportingPeriod: formData.reportingPeriod,
      peerGroup: `${formData.industry} industry`,
      overallScore: overallScore.toFixed(1),
      numberOfCompanies:
        industryStatistics.numberOfCompanies,
      comparison,
      recommendations,
      generatedAt: new Date().toISOString(),
    };

    setResults(resultData);

    localStorage.setItem(
      "indubenchCompanyData",
      JSON.stringify(resultData)
    );
  }

  function resetForm() {
    setFormData(initialFormData);
    setResults(null);

    localStorage.removeItem("indubenchCompanyData");
  }

  function getPriorityStyle(priority) {
    if (priority === "High") {
      return "border-red-500 bg-red-50 text-red-700";
    }

    if (priority === "Medium") {
      return "border-orange-500 bg-orange-50 text-orange-700";
    }

    return "border-yellow-500 bg-yellow-50 text-yellow-700";
  }

  return (
    <div className="industrial-background min-h-screen text-slate-900">
      <header className="border-b-4 border-emerald-500 bg-slate-900 px-6 py-5 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">
              InduBench{" "}
              <span className="text-emerald-400">SA</span>
            </h1>

            <p className="text-sm text-slate-300">
              Industry Performance Benchmarking Tool
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
        <section className="mb-6 border-l-8 border-emerald-500 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Performance Assessment
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Add Company Performance Data
          </h2>

          <p className="mt-2 text-slate-600">
            Enter the company&apos;s five KPI results. The
            system will compare the results with fictional
            organisations from the selected industry.
          </p>

          <p className="mt-2 text-sm font-medium text-orange-600">
            All company and industry data used in this
            prototype is fictional and used only for
            demonstration.
          </p>
        </section>

        <div className="grid items-start gap-6 xl:grid-cols-2">
          <form
            onSubmit={handleSubmit}
            className="border border-slate-300 bg-white p-6 shadow-sm"
          >
            <h3 className="mb-5 border-b border-slate-200 pb-3 text-xl font-bold">
              Company Information
            </h3>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="companyName"
                  className="mb-2 block text-sm font-semibold"
                >
                  Company Name
                </label>

                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Example: Durban Manufacturing"
                  required
                  className="w-full border border-slate-400 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label
                  htmlFor="industry"
                  className="mb-2 block text-sm font-semibold"
                >
                  Industry Reference Group
                </label>

                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full border border-slate-400 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                >
                  <option>Manufacturing</option>
                  <option>Automotive</option>
                  <option>Logistics</option>
                  <option>Construction</option>
                  <option>Food Processing</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="reportingPeriod"
                  className="mb-2 block text-sm font-semibold"
                >
                  Reporting Period
                </label>

                <input
                  id="reportingPeriod"
                  name="reportingPeriod"
                  type="text"
                  value={formData.reportingPeriod}
                  onChange={handleChange}
                  placeholder="Example: 2026"
                  required
                  className="w-full border border-slate-400 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="mt-7 border border-blue-200 bg-blue-50 p-4">
              <p className="font-semibold text-blue-900">
                Selected peer group
              </p>

              <p className="mt-1 text-sm text-blue-800">
                The company will be compared with all fictional{" "}
                {formData.industry} organisations in the
                synthetic dataset.
              </p>
            </div>

            <h3 className="mb-4 mt-7 border-b border-slate-200 pb-3 text-xl font-bold">
              KPI Results
            </h3>

            <p className="mb-5 text-sm text-slate-500">
              Enter each KPI result as a percentage from 0 to
              100. The weights below total 100%.
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              {kpiDefinitions.map((kpi) => (
                <div
                  key={kpi.key}
                  className={
                    kpi.key === "safety"
                      ? "sm:col-span-2"
                      : ""
                  }
                >
                  <label
                    htmlFor={kpi.key}
                    className="mb-2 block text-sm font-semibold"
                  >
                    {kpi.label} ({kpi.unit})
                  </label>

                  <input
                    id={kpi.key}
                    name={kpi.key}
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={formData[kpi.key]}
                    onChange={handleChange}
                    placeholder={`Target: ${kpi.target}%`}
                    required
                    className="w-full border border-slate-400 px-4 py-3 outline-none focus:border-emerald-500"
                  />

                  <div className="mt-2 flex flex-wrap justify-between gap-2 text-xs text-slate-500">
                    <span>{kpi.dimension}</span>

                    <span>
                      Weight: {kpi.weight}% | Target:{" "}
                      {kpi.target}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="submit"
                className="border border-emerald-600 bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
              >
                Analyse Performance
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="border border-slate-400 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100"
              >
                Clear Form
              </button>
            </div>
          </form>

          <section className="border border-slate-300 bg-white p-6 shadow-sm">
            <h3 className="mb-5 border-b border-slate-200 pb-3 text-xl font-bold">
              Benchmarking Results
            </h3>

            {!results ? (
              <div className="border border-dashed border-slate-400 bg-slate-50 p-8 text-center">
                <p className="font-semibold text-slate-700">
                  No results available yet
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Complete the form and select Analyse
                  Performance.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-5 border-l-4 border-emerald-500 bg-emerald-50 p-4">
                  <p className="text-sm text-slate-600">
                    Company
                  </p>

                  <p className="text-xl font-bold">
                    {results.companyName}
                  </p>

                  <div className="mt-2 grid gap-1 text-sm text-slate-600 sm:grid-cols-2">
                    <p>
                      Industry:{" "}
                      <strong>{results.industry}</strong>
                    </p>

                    <p>
                      Period:{" "}
                      <strong>
                        {results.reportingPeriod}
                      </strong>
                    </p>
                  </div>

                  <p className="mt-3 border-t border-emerald-200 pt-3 text-sm text-slate-600">
                    Reference group calculated from{" "}
                    <strong>
                      {results.numberOfCompanies} fictional{" "}
                      {results.industry} companies
                    </strong>
                    .
                  </p>

                  <div className="mt-3 flex justify-between border-t border-emerald-200 pt-3">
                    <div>
                      <p className="font-medium">
                        Weighted Overall Score
                      </p>

                      <p className="text-xs text-slate-500">
                        Calculated using the five KPI weights
                      </p>
                    </div>

                    <span className="text-xl font-bold text-emerald-700">
                      {results.overallScore}%
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {results.comparison.map((item) => (
                    <div
                      key={item.key}
                      className="border border-slate-300 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold">
                            {item.name}
                          </p>

                          <p className="text-xs text-slate-500">
                            {item.dimension} | Weight:{" "}
                            {item.weight}%
                          </p>
                        </div>

                        <span
                          className={`font-bold ${
                            item.difference >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {item.difference >= 0 ? "+" : ""}
                          {item.difference}%
                        </span>
                      </div>

                      <div className="mt-3 grid gap-1 text-sm text-slate-600 sm:grid-cols-2">
                        <p>
                          Company result:{" "}
                          <strong>{item.companyValue}%</strong>
                        </p>

                        <p>
                          Target:{" "}
                          <strong>{item.target}%</strong>
                        </p>

                        <p>
                          Industry average:{" "}
                          <strong>
                            {item.industryAverage}%
                          </strong>
                        </p>

                        <p>
                          Industry median:{" "}
                          <strong>
                            {item.industryMedian}%
                          </strong>
                        </p>

                        <p>
                          Top performer:{" "}
                          <strong>
                            {item.topPerformer}%
                          </strong>
                        </p>

                        <p>
                          Direction:{" "}
                          <strong>{item.direction}</strong>
                        </p>
                      </div>

                      <p
                        className={`mt-3 border-t border-slate-200 pt-2 text-sm font-semibold ${
                          item.difference >= 0
                            ? "text-green-600"
                            : "text-orange-600"
                        }`}
                      >
                        {item.status}
                      </p>
                    </div>
                  ))}
                </div>

                <section className="mt-6 border border-slate-300 bg-slate-50 p-5">
                  <h4 className="text-lg font-bold">
                    Recommended Improvement Actions
                  </h4>

                  <p className="mt-1 text-sm text-slate-600">
                    Recommendations are generated from the KPI,
                    performance gap, priority level and selected
                    industry.
                  </p>

                  {results.recommendations.length === 0 ? (
                    <div className="mt-4 border-l-4 border-green-500 bg-green-50 p-4">
                      <p className="font-semibold text-green-700">
                        All five KPIs are equal to or above
                        their industry averages.
                      </p>

                      <p className="mt-1 text-sm text-green-700">
                        Maintain the current results and continue
                        monitoring performance.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 space-y-4">
                      {results.recommendations.map(
                        (recommendation, index) => (
                          <article
                            key={recommendation.metric}
                            className="border border-slate-300 bg-white p-4"
                          >
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                  Priority {index + 1}
                                </p>

                                <h5 className="mt-1 font-bold">
                                  Improve{" "}
                                  {recommendation.label}
                                </h5>
                              </div>

                              <span
                                className={`border-l-4 px-3 py-2 text-sm font-bold ${getPriorityStyle(
                                  recommendation.priority
                                )}`}
                              >
                                {recommendation.priority}{" "}
                                Priority
                              </span>
                            </div>

                            <div className="mt-4 grid gap-2 border-y border-slate-200 py-3 text-sm sm:grid-cols-2">
                              <p>
                                Current result:{" "}
                                <strong>
                                  {recommendation.result}%
                                </strong>
                              </p>

                              <p>
                                Industry average:{" "}
                                <strong>
                                  {recommendation.benchmark}%
                                </strong>
                              </p>

                              <p>
                                Performance gap:{" "}
                                <strong className="text-red-600">
                                  {recommendation.gap}%
                                </strong>
                              </p>

                              <p>
                                Short-term target:{" "}
                                <strong className="text-emerald-700">
                                  {
                                    recommendation.shortTermTarget
                                  }
                                  %
                                </strong>
                              </p>
                            </div>

                            <p className="mt-4 text-sm font-semibold">
                              Recommended actions
                            </p>

                            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
                              {recommendation.actions.map(
                                (action) => (
                                  <li key={action}>{action}</li>
                                )
                              )}
                            </ul>
                          </article>
                        )
                      )}
                    </div>
                  )}
                </section>

                <a
                  href="/"
                  className="mt-5 block border border-slate-900 bg-slate-900 px-5 py-3 text-center font-semibold text-white hover:bg-slate-800"
                >
                  View Updated Dashboard
                </a>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="mt-10 border-t-4 border-emerald-500 bg-slate-900 py-5 text-center text-sm text-slate-400">
        InduBench SA Prototype • Synthetic data used for
        demonstration
      </footer>
    </div>
  );
}