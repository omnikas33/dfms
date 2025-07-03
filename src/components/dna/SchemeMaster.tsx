import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

const schemeTypeOptions = [
  { value: "REVENUE", label: "Revenue" },
  { value: "CAPITAL", label: "Capital" },
  { value: "DEBT", label: "Debt" },
];

const DISTRICT_CODE = "PUN/025";

// Dummy Financial Years and Scheme Codes
const financialYearOptions = ["2023-24", "2024-25", "2025-26"];
const schemeCodeOptions = ["CRC-001", "CRC-002", "CRC-003", "CRC-004", "CRC-005", "CRC-006", "CRC-007", "CRC-008"];

// Initial Schemes
const initialSchemes = [
  {
    id: 1,
    district_code: DISTRICT_CODE,
    scheme_name: "Planning Commission/Planning Board (37) District Plan-Pune (37)(01) Innovative Scheme (Scheme)",
    budget_allocated: 2500000,
    crc_code: "CRC-001",
    schemetype: "REVENUE",
  },
  {
    id: 2,
    district_code: DISTRICT_CODE,
    scheme_name: "Other Miscellaneous Compensation and Assignment Payments (37) District Plan-Pune (37)(01) Special Programme for Development of Pilgrimage Places(Scheme)",
    budget_allocated: 1800000,
    crc_code: "CRC-002",
    schemetype: "REVENUE",
  },
  {
    id: 3,
    district_code: DISTRICT_CODE,
    scheme_name: "Development of Sericulture Industry",
    budget_allocated: 1200000,
    crc_code: "CRC-003",
    schemetype: "REVENUE",
  },
  {
    id: 4,
    district_code: DISTRICT_CODE,
    scheme_name: "Roads and Bridges",
    budget_allocated: 3000000,
    crc_code: "CRC-004",
    schemetype: "CAPITAL",
  },
  {
    id: 5,
    district_code: DISTRICT_CODE,
    scheme_name: "District and Other Roads",
    budget_allocated: 2250000,
    crc_code: "CRC-005",
    schemetype: "CAPITAL",
  },
  {
    id: 6,
    district_code: DISTRICT_CODE,
    scheme_name: "Grants for Strengthening and Development of Village Roads",
    budget_allocated: 1600000,
    crc_code: "CRC-006",
    schemetype: "CAPITAL",
  },
  {
    id: 7,
    district_code: DISTRICT_CODE,
    scheme_name: "Secretariat-Economic Services",
    budget_allocated: 200000,
    crc_code: "CRC-007",
    schemetype: "REVENUE",
  },
  {
    id: 8,
    district_code: DISTRICT_CODE,
    scheme_name: "Innovative Scheme (Planning Board)",
    budget_allocated: 1750000,
    crc_code: "CRC-008",
    schemetype: "REVENUE",
  },
];

const SchemeMaster = () => {
  const [schemes, setSchemes] = useState(initialSchemes);
  const [modalOpen, setModalOpen] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFY, setSelectedFY] = useState("");
  const [selectedSchemeCode, setSelectedSchemeCode] = useState("");

  const filteredSchemes = useMemo(() => {
    return schemes.filter((scheme) => {
      const matchesSearch = scheme.scheme_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSchemeCode = selectedSchemeCode ? scheme.crc_code === selectedSchemeCode : true;
      // Financial Year filtering can be implemented when schemes have FY data
      return matchesSearch && matchesSchemeCode;
    });
  }, [schemes, searchQuery, selectedSchemeCode]);

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-6">
      <Card className="rounded-2xl shadow border">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <CardTitle>Scheme Master</CardTitle>
          <Button variant="default" onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Add New Scheme
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Search by Scheme Name..."
              className="border rounded-md px-2 py-1 w-full md:w-1/3"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="border rounded-md px-2 py-1 w-full md:w-1/4"
              value={selectedFY}
              onChange={(e) => setSelectedFY(e.target.value)}
            >
              <option value="">All Financial Years</option>
              {financialYearOptions.map((fy) => (
                <option key={fy} value={fy}>{fy}</option>
              ))}
            </select>
            <select
              className="border rounded-md px-2 py-1 w-full md:w-1/4"
              value={selectedSchemeCode}
              onChange={(e) => setSelectedSchemeCode(e.target.value)}
            >
              <option value="">All Scheme Codes</option>
              {schemeCodeOptions.map((code) => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-100 bg-gray-50">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Sr No</th>
                  <th className="px-4 py-3 text-left font-semibold">District Code</th>
                  <th className="px-4 py-3 text-left font-semibold">Scheme Name</th>
                  <th className="px-4 py-3 text-right font-semibold">Budget Allocated</th>
                  <th className="px-4 py-3 text-left font-semibold">CRC Code</th>
                  <th className="px-4 py-3 text-center font-semibold">Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchemes.map((scheme, idx) => (
                  <tr key={scheme.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2">{scheme.district_code}</td>
                    <td className="px-4 py-2 font-medium">{scheme.scheme_name}</td>
                    <td className="px-4 py-2 text-right">₹{(+scheme.budget_allocated).toLocaleString()}</td>
                    <td className="px-4 py-2">{scheme.crc_code}</td>
                    <td className="px-4 py-2 text-center">
                      <Badge variant={
                        scheme.schemetype === "REVENUE" ? "secondary"
                        : scheme.schemetype === "CAPITAL" ? "default"
                        : "destructive"
                      }>
                        {schemeTypeOptions.find(opt => opt.value === scheme.schemetype)?.label || scheme.schemetype}
                      </Badge>
                    </td>
                  </tr>
                ))}
                {filteredSchemes.length === 0 && (
                  <tr>
                    <td colSpan={12} className="text-center text-gray-400 py-6">
                      No schemes found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchemeMaster;
