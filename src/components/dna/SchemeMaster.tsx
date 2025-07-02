import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

const schemeTypeOptions = [
  { value: "REVENUE", label: "Revenue" },
  { value: "CAPITAL", label: "Capital" },
  { value: "DEBT", label: "Debt" }
];

// Dummy district code (replace as needed)
const DISTRICT_CODE = "PUN/025";

// Dummy initial data (could be [])
const initialSchemes = [
  {
    id: 1,
    district_code: DISTRICT_CODE,
    scheme_name: "ग्रामीण रस्ते विकास",
    budget_allocated: 2500000,
    crc_code: "CRC-001",
    schemetype: "REVENUE",
  }
];

function AddSchemeModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState({
    scheme_name: "",
    budget_allocated: "",
    crc_code: "",
    schemetype: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (
      !form.scheme_name ||
      !form.budget_allocated ||
      !form.crc_code ||
      !form.schemetype     ) {
      setError("Please fill all required fields.");
      return;
    }
    setError("");
    setSuccess(true);
    setTimeout(() => {
      onAdd(form);
      setForm({
        scheme_name: "",
        budget_allocated: "",
        crc_code: "",
        schemetype: "",
      });
      setSuccess(false);
      onClose();
    }, 600);
  };

  if (!open) return null;
  return (
    <div className="fixed z-50 inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-7 w-full max-w-lg relative animate-fadeIn">
        <button className="absolute top-3 right-3" onClick={onClose}>
          <X className="h-5 w-5 text-gray-500 hover:text-red-600" />
        </button>
        <h3 className="text-lg font-bold mb-4">Add New Scheme</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs mb-1 font-medium">Scheme Name *</label>
              <input
                type="text"
                name="scheme_name"
                className="border rounded-md px-2 py-1 w-full"
                value={form.scheme_name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-xs mb-1 font-medium">Budget Allocated (₹)*</label>
              <input
                type="number"
                name="budget_allocated"
                min={0}
                className="border rounded-md px-2 py-1 w-full"
                value={form.budget_allocated}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-xs mb-1 font-medium">CRC Code *</label>
              <input
                type="text"
                name="crc_code"
                className="border rounded-md px-2 py-1 w-full"
                value={form.crc_code}
                onChange={handleChange}
                required
              />
            </div>
 
            <div>
              <label className="block text-xs mb-1 font-medium">Scheme Type *</label>
              <select
                name="schemetype"
                className="border rounded-md px-2 py-1 w-full"
                value={form.schemetype}
                onChange={handleChange}
                required
              >
                <option value="">-- Select --</option>
                {schemeTypeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
          {error && <div className="text-xs text-red-600">{error}</div>}
          {success && <div className="text-xs text-green-600">Scheme added successfully!</div>}
          <div className="flex justify-end pt-2">
            <Button variant="default" type="submit">Add Scheme</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

const SchemeMaster = () => {
  const [schemes, setSchemes] = useState(initialSchemes);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddScheme = (data) => {
    setSchemes((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        district_code: DISTRICT_CODE,
        ...data,
      },
    ]);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-6">
      <AddSchemeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddScheme}
      />
      <Card className="rounded-2xl shadow border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Scheme Master</CardTitle>
          <Button variant="default" onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Add New Scheme
          </Button>
        </CardHeader>
        <CardContent>
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
                {schemes.map((scheme, idx) => (
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
                {schemes.length === 0 && (
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
