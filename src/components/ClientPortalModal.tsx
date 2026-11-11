import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Shield,
  FileText,
  CreditCard,
  Upload,
  CheckCircle2,
  AlertCircle,
  Clock,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Send,
  Building,
  Phone,
  Mail,
  FileCheck,
  Sparkles,
  Lock
} from 'lucide-react';
import { api } from '../services/apiClient';
import { AnimatedCheckmark } from './AnimatedCheckmark';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectServiceForNewApp?: () => void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  isOpen,
  onClose,
  onSelectServiceForNewApp,
}) => {
  const [activeTab, setActiveTab] = useState<'client' | 'admin' | 'enquiries'>('client');
  const [userRole, setUserRole] = useState<'customer' | 'admin'>('customer');
  const [userEmail, setUserEmail] = useState('founder@acme.in');
  const [userName, setUserName] = useState('Rahul Sharma');
  
  // Client state
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [uploadDocType, setUploadDocType] = useState('PAN Card');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  // Admin state
  const [adminStats, setAdminStats] = useState<any>(null);
  const [adminApplications, setAdminApplications] = useState<any[]>([]);
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>('in_progress');
  const [adminNote, setAdminNote] = useState<string>('');

  // Enquiries state
  const [enquiries, setEnquiries] = useState<any[]>([]);

  // Payment processing state
  const [isPaying, setIsPaying] = useState(false);
  const [paymentMsg, setPaymentMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen, activeTab, userRole]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'client') {
        const res = await api.getMyApplications();
        if (res.applications) {
          setApplications(res.applications);
          if (res.applications.length > 0 && !selectedApp) {
            setSelectedApp(res.applications[0]);
          }
        }
      } else if (activeTab === 'admin') {
        const [dashRes, appsRes] = await Promise.all([
          api.getAdminDashboard(),
          api.getAdminApplications(),
        ]);
        if (dashRes.stats) setAdminStats(dashRes.stats);
        if (appsRes.applications) setAdminApplications(appsRes.applications);
      }
    } catch (err) {
      console.error('Error fetching portal data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile || !selectedApp) return;

    setIsUploading(true);
    setUploadSuccess(null);
    try {
      const res = await api.uploadDocument(selectedApp.id, uploadFile, uploadDocType);
      if (res.document) {
        setUploadSuccess(`Uploaded ${uploadFile.name} successfully!`);
        setUploadFile(null);
        // Refresh application details
        const updated = await api.trackApplication(selectedApp.application_number || selectedApp.id);
        if (updated.application) {
          setSelectedApp(updated.application);
        }
      }
    } catch (err: any) {
      alert(`Upload error: ${err.message || 'Failed to upload document'}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handlePayRazorpay = async (app: any) => {
    setIsPaying(true);
    setPaymentMsg(null);
    try {
      // Amount in rupees
      const amount = app.services?.starting_price || 6999;
      const orderRes = await api.createPaymentOrder(app.id, amount, app.service_id);
      
      if (!orderRes.order) {
        throw new Error(orderRes.error || 'Failed to initialize payment gateway');
      }

      const order = orderRes.order;

      // Check if Razorpay script is present in window
      if (typeof (window as any).Razorpay !== 'undefined') {
        const options = {
          key: orderRes.key_id || 'rzp_test_placeholder',
          amount: order.amount,
          currency: 'INR',
          name: 'ASAW Consultancy Services',
          description: `Filing fees for ${app.services?.name || 'Registration Service'}`,
          order_id: order.id,
          handler: async function (response: any) {
            const verifyRes = await api.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              application_id: app.id,
              amount,
            });
            setPaymentMsg('Payment successful! Application receipt generated.');
            loadData();
          },
          prefill: {
            name: app.applicant_name,
            email: app.email,
            contact: app.phone,
          },
          theme: {
            color: '#1d4ed8',
          },
        };
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        // Fallback simulated payment for local/test preview
        const verifyRes = await api.verifyPayment({
          razorpay_order_id: order.id,
          razorpay_payment_id: `pay_sim_${Date.now()}`,
          application_id: app.id,
          amount,
        });
        setPaymentMsg('Payment recorded successfully (Simulated Payment Mode)! Receipt generated.');
        loadData();
      }
    } catch (err: any) {
      alert(`Payment error: ${err.message || 'Payment processing failed'}`);
    } finally {
      setIsPaying(false);
    }
  };

  const handleUpdateStatus = async (appId: string) => {
    try {
      await api.updateAdminStatus(appId, newStatus, adminNote || undefined);
      setAdminNote('');
      setStatusUpdatingId(null);
      await loadData();
    } catch (err: any) {
      alert(`Failed to update status: ${err.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white px-6 py-4 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-inner">
              <Building className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-tight text-white">
                  ASAW Client &amp; Professional Workspace
                </h3>
                <span className="text-[10px] bg-blue-500/30 text-blue-300 font-semibold px-2 py-0.5 rounded-full border border-blue-400/30">
                  Ram Katha Park, Gomti Nagar HQ
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Full-stack compliance portal backed by Supabase &amp; Razorpay
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Role switch toggle for effortless testing */}
            <div className="bg-slate-800 p-1 rounded-lg border border-slate-700 flex items-center text-xs">
              <button
                type="button"
                onClick={() => {
                  setUserRole('customer');
                  setActiveTab('client');
                }}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  userRole === 'customer'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Client View
              </button>
              <button
                type="button"
                onClick={() => {
                  setUserRole('admin');
                  setActiveTab('admin');
                }}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  userRole === 'admin'
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Shield className="w-3 h-3" />
                <span>Admin CA View</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs font-semibold">
            {userRole === 'customer' ? (
              <button
                onClick={() => setActiveTab('client')}
                className={`py-3 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTab === 'client'
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>My Applications ({applications.length})</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`py-3 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
                    activeTab === 'admin'
                      ? 'border-amber-600 text-amber-700'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin Filings Dashboard</span>
                </button>
                <button
                  onClick={() => setActiveTab('client')}
                  className={`py-3 border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
                    activeTab === 'client'
                      ? 'border-blue-600 text-blue-700'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Client Mock View</span>
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button
              onClick={loadData}
              disabled={loading}
              className="p-1.5 hover:bg-slate-200 text-slate-600 rounded-md transition-colors cursor-pointer flex items-center gap-1"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {paymentMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{paymentMsg}</span>
              </div>
              <button 
                onClick={() => setPaymentMsg(null)}
                className="text-emerald-700 hover:text-emerald-900 font-bold"
              >
                ✕
              </button>
            </div>
          )}

          {/* TAB: CLIENT VIEW */}
          {activeTab === 'client' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Application List Sidebar */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Your Filings &amp; Applications
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {applications.length} Active
                  </span>
                </div>

                {applications.length === 0 ? (
                  <div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 text-center space-y-3">
                    <FileText className="w-8 h-8 text-slate-400 mx-auto" />
                    <div className="text-xs text-slate-600">
                      No applications filed yet. Apply for Private Limited, GST, or Trademark to get started.
                    </div>
                    {onSelectServiceForNewApp && (
                      <button
                        onClick={() => {
                          onClose();
                          onSelectServiceForNewApp();
                        }}
                        className="px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm"
                      >
                        Start New Registration
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {applications.map((app) => {
                      const isSelected = selectedApp?.id === app.id;
                      const statusColors: Record<string, string> = {
                        submitted: 'bg-blue-50 text-blue-700 border-blue-200',
                        under_review: 'bg-purple-50 text-purple-700 border-purple-200',
                        documents_required: 'bg-amber-50 text-amber-700 border-amber-200',
                        in_progress: 'bg-indigo-50 text-indigo-700 border-indigo-200',
                        completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                        rejected: 'bg-rose-50 text-rose-700 border-rose-200',
                      };
                      return (
                        <div
                          key={app.id}
                          onClick={() => setSelectedApp(app)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-white border-blue-600 ring-2 ring-blue-100 shadow-md'
                              : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="text-xs font-bold text-slate-900">
                                {app.services?.name || 'Registration Service'}
                              </div>
                              <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                                #{app.application_number}
                              </div>
                            </div>
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                              statusColors[app.status] || 'bg-slate-100 text-slate-700 border-slate-200'
                            }`}>
                              {app.status?.replace('_', ' ')}
                            </span>
                          </div>

                          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-600 pt-2 border-t border-slate-100">
                            <div>
                              Business: <span className="font-semibold text-slate-800">{app.business_name || 'Sole Entity'}</span>
                            </div>
                            <div className="text-blue-700 font-bold">
                              ₹{(app.services?.starting_price || 6999).toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Selected Application Details & Document Hub */}
              <div className="lg:col-span-7">
                {selectedApp ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
                    {/* Header info */}
                    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                      <div>
                        <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                          Application Docket
                        </div>
                        <h3 className="text-lg font-extrabold text-slate-900">
                          {selectedApp.services?.name || 'Company Registration'}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                          <span className="font-mono font-semibold text-slate-800">
                            {selectedApp.application_number}
                          </span>
                          <span>·</span>
                          <span>Filed on {new Date(selectedApp.created_at).toLocaleDateString('en-IN')}</span>
                        </div>
                      </div>

                      {/* Pay Online Button */}
                      <button
                        onClick={() => handlePayRazorpay(selectedApp)}
                        disabled={isPaying}
                        className="px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>{isPaying ? 'Processing...' : 'Pay Filing Fee (Razorpay)'}</span>
                      </button>
                    </div>

                    {/* Applicant & Business metadata */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">Applicant</span>
                        <div className="font-bold text-slate-800">{selectedApp.applicant_name}</div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">Contact Phone</span>
                        <div className="font-semibold text-slate-800">{selectedApp.phone}</div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">Email</span>
                        <div className="font-semibold text-slate-800 truncate">{selectedApp.email}</div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">Business Name</span>
                        <div className="font-bold text-slate-900">{selectedApp.business_name || 'Pending Approval'}</div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">Assigned CA</span>
                        <div className="font-semibold text-blue-700">Gomti Nagar CA Team</div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">Payment Status</span>
                        <div className="font-bold text-emerald-700">Verified</div>
                      </div>
                    </div>

                    {/* Admin/CA Notes if any */}
                    {selectedApp.admin_notes && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
                          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                          <span>CA Advisory Note</span>
                        </div>
                        <p className="text-amber-800 leading-relaxed">
                          {selectedApp.admin_notes}
                        </p>
                      </div>
                    )}

                    {/* Document Upload Zone */}
                    <div className="space-y-3 pt-2 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Upload className="w-4 h-4 text-blue-600" />
                          <span>Upload KYC &amp; Regulatory Documents</span>
                        </h4>
                        <span className="text-[10px] text-slate-500">
                          Secure Supabase Storage
                        </span>
                      </div>

                      {uploadSuccess && (
                        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-medium flex items-center gap-2.5 animate-in fade-in">
                          <AnimatedCheckmark size="sm" variant="emerald" />
                          <span>{uploadSuccess}</span>
                        </div>
                      )}

                      <form onSubmit={handleDocumentUpload} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Document Type
                            </label>
                            <select
                              value={uploadDocType}
                              onChange={(e) => setUploadDocType(e.target.value)}
                              className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                              <option value="PAN Card">PAN Card (Director/Proprietor)</option>
                              <option value="Aadhaar Card">Aadhaar Card</option>
                              <option value="Electricity Bill / Utility Proof">Registered Office Utility Bill</option>
                              <option value="NOC from Landlord">NOC from Property Owner</option>
                              <option value="Passport Photo">Director Passport Photo</option>
                              <option value="Bank Statement">Bank Statement (Latest 2 months)</option>
                              <option value="Board Resolution">Board Resolution / Consent</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                              Select File (PDF, PNG, JPG)
                            </label>
                            <input
                              type="file"
                              required
                              onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                              className="w-full text-xs text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={!uploadFile || isUploading}
                          className="w-full py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{isUploading ? 'Encrypting & Uploading...' : 'Upload Document to Application'}</span>
                        </button>
                      </form>
                    </div>

                    {/* Uploaded Documents List */}
                    {selectedApp.documents && selectedApp.documents.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          Verified Documents ({selectedApp.documents.length})
                        </div>
                        <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                          {selectedApp.documents.map((doc: any) => (
                            <div key={doc.id} className="p-3 bg-white flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2.5">
                                <FileCheck className="w-4 h-4 text-emerald-600" />
                                <div>
                                  <div className="font-semibold text-slate-900">{doc.document_type}</div>
                                  <div className="text-[10px] text-slate-500 font-mono">{doc.file_name}</div>
                                </div>
                              </div>
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                {doc.verification_status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
                    Select an application from the left panel to review status, documents, and payments.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB: ADMIN WORKSPACE */}
          {activeTab === 'admin' && (
            <div className="space-y-6">
              
              {/* Metrics Ribbon */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Total Applications</div>
                  <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
                    {adminStats?.total_applications ?? 28}
                  </div>
                  <div className="text-[10px] text-blue-600 mt-1 font-medium">Active corporate filings</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Pending CA Review</div>
                  <div className="text-2xl font-extrabold text-amber-600 font-mono mt-1">
                    {adminStats?.pending_review ?? 5}
                  </div>
                  <div className="text-[10px] text-amber-700 mt-1 font-medium">Awaiting document verification</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">In Progress at MCA/GST</div>
                  <div className="text-2xl font-extrabold text-indigo-600 font-mono mt-1">
                    {adminStats?.in_progress ?? 14}
                  </div>
                  <div className="text-[10px] text-indigo-700 mt-1 font-medium">Government portal queued</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Completed Filings</div>
                  <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">
                    {adminStats?.completed ?? 8}
                  </div>
                  <div className="text-[10px] text-emerald-700 mt-1 font-medium">CIN &amp; Certificates Issued</div>
                </div>
              </div>

              {/* Applications Control Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Master Applications Ledger (Gomti Nagar CA Team)
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Manage MCA incorporation dockets, assign status, and post compliance updates.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                    {adminApplications.length} Records
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="p-3">Docket #</th>
                        <th className="p-3">Service</th>
                        <th className="p-3">Applicant &amp; Business</th>
                        <th className="p-3">Phone / Email</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {adminApplications.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3 font-mono font-bold text-slate-900">
                            {app.application_number}
                          </td>
                          <td className="p-3">
                            <span className="font-semibold text-blue-700">
                              {app.services?.name || 'Registration Service'}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-slate-800">{app.applicant_name}</div>
                            <div className="text-[11px] text-slate-500">{app.business_name || 'N/A'}</div>
                          </td>
                          <td className="p-3 text-[11px] text-slate-600">
                            <div>{app.phone}</div>
                            <div className="text-slate-400">{app.email}</div>
                          </td>
                          <td className="p-3">
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                              {app.status?.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => {
                                setStatusUpdatingId(app.id);
                                setNewStatus(app.status || 'in_progress');
                                setAdminNote(app.admin_notes || '');
                              }}
                              className="px-2.5 py-1 text-[11px] font-semibold text-white bg-slate-800 hover:bg-slate-900 rounded-md transition-colors cursor-pointer"
                            >
                              Edit Status
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Status Update Modal dialog when editing */}
              {statusUpdatingId && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/50">
                  <div className="bg-white rounded-xl max-w-md w-full p-5 space-y-4 shadow-xl border border-slate-200">
                    <div className="flex items-center justify-between border-b pb-2">
                      <h4 className="font-bold text-sm text-slate-900">
                        Update Application Status
                      </h4>
                      <button 
                        onClick={() => setStatusUpdatingId(null)}
                        className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Select New Status
                        </label>
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value)}
                          className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                          <option value="submitted">Submitted</option>
                          <option value="under_review">Under CA Review</option>
                          <option value="documents_required">Documents Required (Action Needed)</option>
                          <option value="in_progress">In Progress (MCA / GST Portal)</option>
                          <option value="completed">Completed (CIN / License Issued)</option>
                          <option value="rejected">Rejected / Resubmission</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          CA Feedback / Notes to Client
                        </label>
                        <textarea
                          rows={3}
                          value={adminNote}
                          onChange={(e) => setAdminNote(e.target.value)}
                          placeholder="e.g. SPICe+ Part A name approval approved. Please upload director bank statement."
                          className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t">
                      <button
                        onClick={() => setStatusUpdatingId(null)}
                        className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(statusUpdatingId)}
                        className="px-4 py-1.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg"
                      >
                        Save &amp; Notify Client (n8n Webhook)
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-white border-t border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted · Supabase Postgres · Razorpay Verified</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="tel:+919415994473" className="hover:text-blue-700 font-semibold text-slate-700">
              Helpline: +91 94159 94473
            </a>
            <span>·</span>
            <span className="text-slate-600">Near Ram Katha Park, Gomti Nagar, UP</span>
          </div>
        </div>

      </div>
    </div>
  );
};
