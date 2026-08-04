const HeaderContent = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white rounded-xl border border-gray-100 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col space-y-1">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-brand-green rounded-full"></div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Request Reset Password</h1>
        </div>
        <p className="text-gray-500 text-sm max-w-xl pl-5 leading-relaxed">
          Kelola permintaan reset password dari asisten. Anda dapat menyetujui (reset ke password default) atau menolaknya.
        </p>
      </div>
    </div>
  );
};

export default HeaderContent;
