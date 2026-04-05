'use client';

export default function LogoutButton() {
  const handleLogout = () => {
    // Suppression brute du cookie
    document.cookie = 'auth_token=; Max-Age=0; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    // Redirection forcée hors React
    window.location.href = '/login';
  };

  return (
    <button
      onClick={handleLogout}
      style={{ cursor: 'pointer', zIndex: 9999, position: 'relative' }}
      className="text-slate-400 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
      title="Se déconnecter"
      type="button"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16 17 21 12 16 7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
      </svg>
    </button>
  );
}
