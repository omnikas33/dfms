import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

// ---- DUMMY DATA ----
const DISTRICT_BALANCE_INITIAL = 12000000;
const FY = "2025-2026";
const dummySchemeOptions = [
  { id: "2851", name: "Village and Small Industries" },
  { id: "28511821", name: "Village and Small Industries - Small Scale Industries (Schemes for Providing Stipends to Entrepreneurs)" },
  { id: "28511868", name: "Village and Small Industries - Development of Sericulture Industry" },
  { id: "28516752", name: "Village and Small Industries - Grants for Silk Yarn Production" },
  { id: "3054", name: "Roads and Bridges" },
  { id: "30543317", name: "Roads and Bridges - District and Other Roads" },
  { id: "30543611", name: "Roads and Bridges - Grants for Strengthening and Development of Village Roads" },
  { id: "30542043", name: "Roads and Bridges - Development and Strengthening of Village Roads" },
  { id: "3451", name: "Secretariat-Economic Services" },
  { id: "34511795", name: "Secretariat-Economic Services - Innovative Scheme (Planning Commission/Planning Board)" }
];

// ---- ASSIGN LIMIT MODAL ----
function AssignLimitModal({ open, onClose, onAssign, schemes, districtBalance, allSchemeOptions }) {
  const [selectedSchemeId, setSelectedSchemeId] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleAssign = () => {
    const amt = Number(amount);
    if (!selectedSchemeId) return setError("Select scheme.");
    if (!amt || amt <= 0) return setError("Enter valid amount.");
    if (amt > districtBalance) return setError("Exceeds district available balance.");
    // If scheme already exists in main list, don't add again.
    if (schemes.find(s => String(s.id) === String(selectedSchemeId))) return setError("Already assigned.");
    setError("");
    setSuccess(true);
    setTimeout(() => {
      const schemeObj = allSchemeOptions.find(s => String(s.id) === String(selectedSchemeId));
      onAssign({
        ...schemeObj,
        sanctioned: amt,
        balance: amt,
      });
      setSelectedSchemeId("");
      setAmount("");
      setSuccess(false);
      onClose();
    }, 700);
  };

  if (!open) return null;
  return (
    <div className="fixed z-50 inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl border-2 border-primary/40 p-7 w-full max-w-lg relative animate-fadeIn">
        <button className="absolute top-3 right-3" onClick={onClose}>
          <X className="h-5 w-5 text-gray-500 hover:text-red-600" />
        </button>
        <h3 className="text-lg font-bold mb-5 text-primary">Assign Limit to Scheme</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-700">Select Scheme</label>
            <select
              className="border border-gray-300 rounded-md px-2 py-1 w-full"
              value={selectedSchemeId}
              onChange={e => setSelectedSchemeId(e.target.value)}
            >
              <option value="">-- Select --</option>
              {allSchemeOptions.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-700">Sanction Amount (₹)</label>
            <input
              className="border border-gray-300 rounded-md px-2 py-1 w-full"
              type="number"
              min={1}
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Enter limit to assign"
            />
          </div>
          <div>
            <span className="text-xs text-gray-600">Available Balance: </span>
            <span className="font-bold text-primary">₹{districtBalance.toLocaleString()}</span>
          </div>
          {error && <div className="text-xs text-red-600">{error}</div>}
          {success && <div className="text-xs text-green-700">Sanctioned!</div>}
          <div className="flex justify-end pt-2">
            <Button variant="default" onClick={handleAssign}>Assign</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- MAIN COMPONENT ----
const SanctionFundsToSchemes = () => {
  const [districtBalance, setDistrictBalance] = useState(DISTRICT_BALANCE_INITIAL);
  const [schemes, setSchemes] = useState([
    { id: "2851", name: "Village and Small Industries", sanctioned: 250000, balance: 2500000 },
    { id: "28511821", name: "Small Scale Industries (Schemes for Providing Stipends to Entrepreneurs)", sanctioned: 1800000, balance: 1800000 },
    { id: "28511868", name: "Development of Sericulture Industry", sanctioned: 1200000, balance: 1200000 },
    { id: "3054", name: "Roads and Bridges", sanctioned: 3000000, balance: 3000000 },
    { id: "30543317", name: "District and Other Roads", sanctioned: 225000, balance: 2250000 },
    { id: "30543611", name: "Grants for Strengthening and Development of Village Roads", sanctioned: 1600000, balance: 1600000 },
    { id: "3451", name: "Secretariat-Economic Services", sanctioned: 200000, balance: 200000 },
    { id: "34511795", name: "Innovative Scheme (Planning Board)", sanctioned: 175000, balance: 1750000 }
  ]);
  const [modalOpen, setModalOpen] = useState(false);

  // Calculate Utilized Amount as the sum of all sanctioned amounts
  const utilizedAmount = schemes.reduce((sum, s) => sum + (s.sanctioned || 0), 0);

  const handleAssign = (schemeObj) => {
    setSchemes(prev => [...prev, schemeObj]);
    setDistrictBalance(prev => prev - Number(schemeObj.sanctioned));
  };

  return (
    <div className="w-full min-h-[75vh] bg-gray-50 flex flex-col items-center pt-6">
      {/* ---- Top Cards Section ---- */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card className="rounded-xl shadow-md border border-primary/20">
          <CardContent className="p-4 flex flex-col items-center">
            <span className="text-xs text-gray-600 font-medium mb-1">Total Annual Budget Sanctioned</span>
            <span className="font-bold text-2xl text-primary">₹{districtBalance.toLocaleString()}</span>
            <span className="text-xs text-gray-400">{FY}</span>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-md border border-green-400/20">
          <CardContent className="p-4 flex flex-col items-center">
            <span className="text-xs text-gray-600 font-medium mb-1">Budget Amount Utilize</span>
            <span className="font-bold text-2xl text-green-700">₹{utilizedAmount.toLocaleString()}</span>
            <span className="text-xs text-gray-400">{FY}</span>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-md border border-blue-400/20">
          <CardContent className="p-4 flex flex-col items-center">
            <span className="text-xs text-gray-600 font-medium mb-1">Budget Mapped To Schemes</span>
            <span className="font-bold text-2xl text-blue-700">{schemes.length}</span>
            <span className="text-xs text-gray-400">{FY}</span>
          </CardContent>
        </Card>
      </div>

      {/* ---- Main Table Card ---- */}
      <div className="w-full max-w-6xl mx-auto">
        <Card className="rounded-2xl shadow-lg border-2 border-primary/20 w-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-semibold">Scheme Sanctioned Limits</CardTitle>
            <Button variant="default" className="px-4" onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" /> Assign Limit
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-xl bg-white border border-gray-200 shadow-sm">
              <table className="min-w-full text-sm border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold border-b border-gray-300 bg-primary/10 rounded-tl-xl">#</th>
                    <th className="px-4 py-3 text-left font-semibold border-b border-gray-300 bg-primary/10">Scheme Name</th>
                    <th className="px-4 py-3 text-right font-semibold border-b border-gray-300 bg-primary/10">Sanctioned Amount</th>
                    <th className="px-4 py-3 text-right font-semibold border-b border-gray-300 bg-primary/10">Balance</th>
                    <th className="px-4 py-3 text-center font-semibold border-b border-gray-300 bg-primary/10 rounded-tr-xl">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {schemes.map((scheme, idx) => (
                    <tr
                      key={scheme.id}
                      className={
                        idx % 2 === 0
                          ? "bg-white border-b border-gray-200"
                          : "bg-gray-50 border-b border-gray-200"
                      }
                    >
                      <td className="px-4 py-3 border-r border-gray-100">{idx + 1}</td>
                      <td className="px-4 py-3 font-medium border-r border-gray-100">{scheme.name}</td>
                      <td className="px-4 py-3 text-right border-r border-gray-100">₹{(scheme.sanctioned ?? 0).toLocaleString()}</td>
                      <td className="px-4 py-3 text-right border-r border-gray-100">₹{(scheme.balance ?? 0).toLocaleString()}</td>
                      <td className="px-4 py-3 text-center">
                        <Badge
                          className="px-4 py-1 text-base rounded-full font-bold"
                          variant={scheme.sanctioned > 0 ? "default" : "secondary"}
                        >
                          {scheme.sanctioned > 0 ? "Sanctioned" : "Not Sanctioned"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                  {schemes.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-gray-400">
                        No schemes available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <AssignLimitModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAssign={handleAssign}
        schemes={schemes}
        districtBalance={districtBalance}
        allSchemeOptions={dummySchemeOptions}
      />
    </div>
  );
};

export default SanctionFundsToSchemes;
