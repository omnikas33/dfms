import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

// DUMMY IA DATA
const initialIAs = [
  {
    iaName: "Maharashtra Rural Infra Dev Agency",
    officerName: "Sunil Shinde",
    designation: "Project Director",
    number: "9876543210",
    email: "sunil.shinde@rida.in",
    agencyCode: "RIDA-001",
    bankName: "State Bank of India",
    acNo: "201123456789",
    ifsc: "SBIN0002000"
  },
  {
    iaName: "Pune Water Conservation IA",
    officerName: "Anita Patil",
    designation: "Chief Engineer",
    number: "9765123478",
    email: "anita.patil@pwcia.in",
    agencyCode: "PWCI-003",
    bankName: "Bank of Maharashtra",
    acNo: "040050099099",
    ifsc: "MAHB0000123"
  },
  {
    iaName: "Satara Roads Dev IA",
    officerName: "Rahul Deshmukh",
    designation: "Executive Officer",
    number: "8899775566",
    email: "rahul.deshmukh@srda.in",
    agencyCode: "SRDA-101",
    bankName: "HDFC Bank",
    acNo: "50100234004567",
    ifsc: "HDFC0000456"
  }
];

// ADD IA MODAL
function AddIAModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState({
    iaName: "",
    officerName: "",
    designation: "",
    number: "",
    email: "",
    agencyCode: "",
    bankName: "",
    acNo: "",
    ifsc: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple field check
    if (Object.values(form).some((v) => !v)) {
      setError("Please fill all fields.");
      return;
    }
    setError("");
    setSuccess(true);
    setTimeout(() => {
      onAdd(form);
      setForm({
        iaName: "",
        officerName: "",
        designation: "",
        number: "",
        email: "",
        agencyCode: "",
        bankName: "",
        acNo: "",
        ifsc: ""
      });
      setSuccess(false);
      onClose();
    }, 700);
  };

  if (!open) return null;
  return (
    <div className="fixed z-50 inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl border border-primary/30 p-8 w-full max-w-2xl relative animate-fadeIn">
        <button className="absolute top-3 right-3" onClick={onClose}>
          <X className="h-5 w-5 text-gray-500 hover:text-red-600" />
        </button>
        <h3 className="text-lg font-bold mb-4 text-primary">Add New Implementing Agency</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-gray-700">IA Name</label>
              <input type="text" name="iaName" className="border rounded-md px-2 py-1 w-full" value={form.iaName} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-gray-700">Officer Name</label>
              <input type="text" name="officerName" className="border rounded-md px-2 py-1 w-full" value={form.officerName} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-gray-700">Designation</label>
              <input type="text" name="designation" className="border rounded-md px-2 py-1 w-full" value={form.designation} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-gray-700">Mobile Number</label>
              <input type="text" name="number" className="border rounded-md px-2 py-1 w-full" value={form.number} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-gray-700">Email</label>
              <input type="email" name="email" className="border rounded-md px-2 py-1 w-full" value={form.email} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-gray-700">Agency Code</label>
              <input type="text" name="agencyCode" className="border rounded-md px-2 py-1 w-full" value={form.agencyCode} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-gray-700">Bank Name</label>
              <input type="text" name="bankName" className="border rounded-md px-2 py-1 w-full" value={form.bankName} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-gray-700">Account Number</label>
              <input type="text" name="acNo" className="border rounded-md px-2 py-1 w-full" value={form.acNo} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-gray-700">IFSC Code</label>
              <input type="text" name="ifsc" className="border rounded-md px-2 py-1 w-full" value={form.ifsc} onChange={handleChange} />
            </div>
          </div>
          {error && <div className="text-xs text-red-600">{error}</div>}
          {success && <div className="text-xs text-green-700">Added successfully!</div>}
          <div className="flex justify-end pt-2">
            <Button variant="default" type="submit">Add IA</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// MAIN COMPONENT
const ImplementingAgencyMaster = () => {
  const [tab, setTab] = useState("view");
  const [iaList, setIaList] = useState(initialIAs);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddIA = (data) => {
    setIaList((prev) => [...prev, data]);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4">
      <Tabs value={tab} onValueChange={setTab}>
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-xl font-semibold text-gray-900">Implementing Agency Master</CardTitle>
          <TabsList className="bg-gray-100 rounded-xl border p-1">
            <TabsTrigger value="view" className="px-5 py-1.5 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow">View IA</TabsTrigger>
            <TabsTrigger value="new" className="px-5 py-1.5 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow">New IA</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="view">
          <Card className="rounded-2xl shadow border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Implementing Agency List</CardTitle>
              <Button variant="default" size="sm" onClick={() => setModalOpen(true)}>
                <Plus className="h-4 w-4 mr-1" /> Add IA
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-xl bg-white border border-gray-200 shadow-sm">
                <table className="min-w-full text-sm border-separate border-spacing-0">
                  <thead>
                    <tr className="bg-primary/10 border-b border-gray-200">
                      <th className="px-4 py-3 text-left font-semibold">IA Name</th>
                      <th className="px-4 py-3 text-left font-semibold">Officer Name</th>
                      <th className="px-4 py-3 text-left font-semibold">Designation</th>
                      <th className="px-4 py-3 text-left font-semibold">Number</th>
                      <th className="px-4 py-3 text-left font-semibold">Email</th>
                      <th className="px-4 py-3 text-left font-semibold">Agency Code</th>
                      <th className="px-4 py-3 text-left font-semibold">Bank Name</th>
                      <th className="px-4 py-3 text-left font-semibold">A/C No.</th>
                      <th className="px-4 py-3 text-left font-semibold">IFSC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {iaList.map((row, idx) => (
                      <tr key={row.agencyCode + idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-2">{row.iaName}</td>
                        <td className="px-4 py-2">{row.officerName}</td>
                        <td className="px-4 py-2">{row.designation}</td>
                        <td className="px-4 py-2">{row.number}</td>
                        <td className="px-4 py-2">{row.email}</td>
                        <td className="px-4 py-2">{row.agencyCode}</td>
                        <td className="px-4 py-2">{row.bankName}</td>
                        <td className="px-4 py-2">{row.acNo}</td>
                        <td className="px-4 py-2">{row.ifsc}</td>
                      </tr>
                    ))}
                    {iaList.length === 0 && (
                      <tr>
                        <td colSpan={9} className="py-6 text-center text-gray-400">
                          No implementing agencies found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="new">
          <AddIAModal open={true} onClose={() => setTab("view")} onAdd={handleAddIA} />
        </TabsContent>
      </Tabs>
      {/* Modal for Add IA from View IA tab */}
      <AddIAModal open={modalOpen} onClose={() => setModalOpen(false)} onAdd={handleAddIA} />
    </div>
  );
};

export default ImplementingAgencyMaster;
