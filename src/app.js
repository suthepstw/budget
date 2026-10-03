const CORE = {
 ROLES: { admin: 'ผู้ดูแลระบบ', staff: 'เจ้าหน้าที่การเงิน', viewer: 'ผู้บริหาร/ดูรายงาน' },
 STATUSES: ['จ่ายแล้ว', 'รอเบิกจ่าย', 'ยกเลิก'],
 fiscalOf: (month, year) => Number(month) >= 10 ? Number(year) + 1 : Number(year),
 fyDates: year => ({ start: (Number(year)-544)+'-10-01', end: (Number(year)-543)+'-09-30' })
};

const ICONS={"x":"<path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/>","text":"<path d=\"M21 5H3\"/><path d=\"M15 12H3\"/><path d=\"M17 19H3\"/>","settings":"<path d=\"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>","users":"<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"/><path d=\"M16 3.128a4 4 0 0 1 0 7.744\"/><path d=\"M22 21v-2a4 4 0 0 0-3-3.87\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/>","badge":"<path d=\"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z\"/>","download":"<path d=\"M12 15V3\"/><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/><path d=\"m7 10 5 5 5-5\"/>","loader":"<path d=\"M12 2v4\"/><path d=\"m16.2 7.8 2.9-2.9\"/><path d=\"M18 12h4\"/><path d=\"m16.2 16.2 2.9 2.9\"/><path d=\"M12 18v4\"/><path d=\"m4.9 19.1 2.9-2.9\"/><path d=\"M2 12h4\"/><path d=\"m4.9 4.9 2.9 2.9\"/>","code":"<path d=\"m16 18 6-6-6-6\"/><path d=\"m8 6-6 6 6 6\"/>","info":"<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 16v-4\"/><path d=\"M12 8h.01\"/>","circle-alert":"<circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" x2=\"12\" y1=\"8\" y2=\"12\"/><line x1=\"12\" x2=\"12.01\" y1=\"16\" y2=\"16\"/>","triangle-alert":"<path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\"/><path d=\"M12 9v4\"/><path d=\"M12 17h.01\"/>","clock":"<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 6v6l4 2\"/>","save":"<path d=\"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z\"/><path d=\"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7\"/><path d=\"M7 3v4a1 1 0 0 0 1 1h7\"/>","chart-pie":"<path d=\"M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z\"/><path d=\"M21.21 15.89A10 10 0 1 1 8 2.83\"/>","list":"<path d=\"M3 5h.01\"/><path d=\"M3 12h.01\"/><path d=\"M3 19h.01\"/><path d=\"M8 5h13\"/><path d=\"M8 12h13\"/><path d=\"M8 19h13\"/>","layout-dashboard":"<rect width=\"7\" height=\"9\" x=\"3\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"5\" x=\"14\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"9\" x=\"14\" y=\"12\" rx=\"1\"/><rect width=\"7\" height=\"5\" x=\"3\" y=\"16\" rx=\"1\"/>","receipt-text":"<path d=\"M13 16H8\"/><path d=\"M14 8H8\"/><path d=\"M16 12H8\"/><path d=\"M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z\"/>","wallet-cards":"<path d=\"M3 11h3.75a2 2 0 0 1 1.6.8l.45.6a4 4 0 0 0 6.4 0l.45-.6a2 2 0 0 1 1.6-.8H21\"/><path d=\"M3 7h18\"/><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/>","printer":"<path d=\"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2\"/><path d=\"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6\"/><rect x=\"6\" y=\"14\" width=\"12\" height=\"8\" rx=\"1\"/>","calendar-range":"<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M16 2v3\"/><path d=\"M3 9h18\"/><path d=\"M8 2v3\"/><path d=\"M17 13h-6\"/><path d=\"M13 17H7\"/><path d=\"M7 13h.01\"/><path d=\"M17 17h.01\"/>","banknote":"<rect width=\"20\" height=\"12\" x=\"2\" y=\"6\" rx=\"2\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/><path d=\"M6 12h.01M18 12h.01\"/>","tags":"<path d=\"M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z\"/><path d=\"M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193\"/><circle cx=\"10.5\" cy=\"6.5\" r=\".5\" fill=\"currentColor\"/>","file-spreadsheet":"<path d=\"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z\"/><path d=\"M14 2v5a1 1 0 0 0 1 1h5\"/><path d=\"M8 13h2\"/><path d=\"M14 13h2\"/><path d=\"M8 17h2\"/><path d=\"M14 17h2\"/>","logs":"<path d=\"M3 5h1\"/><path d=\"M3 12h1\"/><path d=\"M3 19h1\"/><path d=\"M8 5h1\"/><path d=\"M8 12h1\"/><path d=\"M8 19h1\"/><path d=\"M13 5h8\"/><path d=\"M13 12h8\"/><path d=\"M13 19h8\"/>","history":"<path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\"/><path d=\"M3 3v5h5\"/><path d=\"M12 7v5l4 2\"/>","school":"<path d=\"M14 21v-3a2 2 0 0 0-4 0v3\"/><path d=\"M18 4.933V21\"/><path d=\"m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6\"/><path d=\"m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11\"/><path d=\"M6 4.933V21\"/><circle cx=\"12\" cy=\"9\" r=\"2\"/>","badge-check":"<path d=\"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z\"/><path d=\"m16 9-5.5 5.5L8 12\"/>","bell":"<path d=\"M10.268 21a2 2 0 0 0 3.464 0\"/><path d=\"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326\"/>","view":"<path d=\"M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2\"/><path d=\"M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2\"/><circle cx=\"12\" cy=\"12\" r=\"1\"/><path d=\"M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0\"/>","scroll":"<path d=\"M19 17V5a2 2 0 0 0-2-2H4\"/><path d=\"M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3\"/>","square-pen":"<path d=\"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7\"/><path d=\"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z\"/>","form":"<path d=\"M4 14h6\"/><path d=\"M4 2h10\"/><rect x=\"4\" y=\"18\" width=\"16\" height=\"4\" rx=\"1\"/><rect x=\"4\" y=\"6\" width=\"16\" height=\"4\" rx=\"1\"/>","plus":"<path d=\"M5 12h14\"/><path d=\"M12 5v14\"/>","log-out":"<path d=\"m16 17 5-5-5-5\"/><path d=\"M21 12H9\"/><path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\"/>","wallet":"<path d=\"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1\"/><path d=\"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4\"/>","piggy-bank":"<path d=\"M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z\"/><path d=\"M16 10h.01\"/><path d=\"M2 8v1a2 2 0 0 0 2 2h1\"/>","file-text":"<path d=\"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z\"/><path d=\"M14 2v5a1 1 0 0 0 1 1h5\"/><path d=\"M10 9H8\"/><path d=\"M16 13H8\"/><path d=\"M16 17H8\"/>","chevron-right":"<path d=\"m9 18 6-6-6-6\"/>","chart-column":"<path d=\"M3 3v16a2 2 0 0 0 2 2h16\"/><path d=\"M18 17V9\"/><path d=\"M13 17V5\"/><path d=\"M8 17v-3\"/>","chart-bar":"<path d=\"M3 3v16a2 2 0 0 0 2 2h16\"/><path d=\"M7 16h8\"/><path d=\"M7 11h12\"/><path d=\"M7 6h3\"/>","trending-up":"<path d=\"M16 7h6v6\"/><path d=\"m22 7-8.5 8.5-5-5L2 17\"/>","sparkles":"<path d=\"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z\"/><path d=\"M20 2v4\"/><path d=\"M22 4h-4\"/><circle cx=\"4\" cy=\"20\" r=\"2\"/>","search":"<path d=\"m21 21-4.34-4.34\"/><circle cx=\"11\" cy=\"11\" r=\"8\"/>","file-down":"<path d=\"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z\"/><path d=\"M14 2v5a1 1 0 0 0 1 1h5\"/><path d=\"M12 18v-6\"/><path d=\"m9 15 3 3 3-3\"/>","trash-2":"<path d=\"M10 11v6\"/><path d=\"M14 11v6\"/><path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6\"/><path d=\"M3 6h18\"/><path d=\"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"/>","rotate-ccw":"<path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\"/><path d=\"M3 3v5h5\"/>","pencil":"<path d=\"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z\"/><path d=\"m15 5 4 4\"/>","eye":"<path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>","chevron-down":"<path d=\"m6 9 6 6 6-6\"/>","chevrons-up-down":"<path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/>","copy":"<rect width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\" ry=\"2\"/><path d=\"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\"/>","circle-check":"<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m16 9-5.5 5.5L8 12\"/>","calendar-days":"<path d=\"M8 2v3\"/><path d=\"M16 2v3\"/><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M3 9h18\"/><path d=\"M8 13h.01\"/><path d=\"M12 13h.01\"/><path d=\"M16 13h.01\"/><path d=\"M8 17h.01\"/><path d=\"M12 17h.01\"/><path d=\"M16 17h.01\"/>","calendar-check":"<path d=\"M8 2v3\"/><path d=\"M16 2v3\"/><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M3 9h18\"/><path d=\"m9 15 2 2 4-4\"/>","cross":"<path d=\"M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z\"/>","layout-grid":"<rect width=\"7\" height=\"7\" x=\"3\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"7\" x=\"14\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"7\" x=\"14\" y=\"14\" rx=\"1\"/><rect width=\"7\" height=\"7\" x=\"3\" y=\"14\" rx=\"1\"/>","file-chart-column":"<path d=\"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z\"/><path d=\"M14 2v5a1 1 0 0 0 1 1h5\"/><path d=\"M8 18v-1\"/><path d=\"M12 18v-6\"/><path d=\"M16 18v-3\"/>","upload":"<path d=\"M12 3v12\"/><path d=\"m17 8-5-5-5 5\"/><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/>","file":"<path d=\"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z\"/><path d=\"M14 2v5a1 1 0 0 0 1 1h5\"/>","cloud-upload":"<path d=\"M12 13v8\"/><path d=\"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242\"/><path d=\"m8 17 4-4 4 4\"/>","database":"<ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\"/><path d=\"M3 5V19A9 3 0 0 0 21 19V5\"/><path d=\"M3 12A9 3 0 0 0 21 12\"/>","archive":"<rect width=\"20\" height=\"5\" x=\"2\" y=\"3\" rx=\"1\"/><path d=\"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8\"/><path d=\"M10 12h4\"/>","refresh-cw":"<path d=\"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8\"/><path d=\"M21 3v5h-5\"/><path d=\"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16\"/><path d=\"M8 16H3v5\"/>","shield-check":"<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\"/><path d=\"m9 12 2 2 4-4\"/>","user-cog":"<path d=\"M10 15H6a4 4 0 0 0-4 4v2\"/><path d=\"m14.305 16.53.923-.382\"/><path d=\"m15.228 13.852-.923-.383\"/><path d=\"m16.852 12.228-.383-.923\"/><path d=\"m16.852 17.772-.383.924\"/><path d=\"m19.148 12.228.383-.923\"/><path d=\"m19.53 18.696-.382-.924\"/><path d=\"m20.772 13.852.924-.383\"/><path d=\"m20.772 16.148.924.383\"/><circle cx=\"18\" cy=\"15\" r=\"3\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/>","image-plus":"<path d=\"M16 5h6\"/><path d=\"M19 2v6\"/><path d=\"M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5\"/><path d=\"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21\"/><circle cx=\"9\" cy=\"9\" r=\"2\"/>","key-round":"<path d=\"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z\"/><circle cx=\"16.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\"/>","menu":"<path d=\"M4 5h16\"/><path d=\"M4 12h16\"/><path d=\"M4 19h16\"/>","eye-off":"<path d=\"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49\"/><path d=\"M14.084 14.158a3 3 0 0 1-4.242-4.242\"/><path d=\"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143\"/><path d=\"m2 2 20 20\"/>","sidebar":"<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\"/><path d=\"M9 3v18\"/>","dot":"<circle cx=\"12\" cy=\"12\" r=\"1\"/>","user-round":"<circle cx=\"12\" cy=\"8\" r=\"5\"/><path d=\"M20 21a8 8 0 0 0-16 0\"/>","lock":"<rect width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\"/><path d=\"M7 11V7a5 5 0 0 1 10 0v4\"/>","house":"<path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\"/><path d=\"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"/>"};



function showSetup() {
  $('#loginForm').hidden = true;
  const form = document.createElement('form');
  form.className = 'grid gap-4';
  form.innerHTML = '<h2 class="font-bold text-xl">ตั้งค่าระบบครั้งแรก</h2><p class="text-sm text-muted">สร้างบัญชีผู้ดูแลระบบ โดยใช้ SETUP_TOKEN ที่กำหนดไว้บนเซิร์ฟเวอร์</p><label class="field"><span>Setup token</span><input class="input" name="setupToken" type="password" required></label><label class="field"><span>ชื่อผู้ใช้</span><input class="input" name="username" value="admin" pattern="[a-z0-9._-]{3,30}" required></label><label class="field"><span>ชื่อ-นามสกุล</span><input class="input" name="full_name" required></label><label class="field"><span>รหัสผ่าน (อย่างน้อย 8 ตัว)</span><input class="input" name="password" type="password" minlength="8" autocomplete="new-password" required></label><button class="btn btn-primary" type="submit">สร้างผู้ดูแลระบบ</button>';
  $('#loginForm').after(form);
  form.onsubmit = async e => {
    e.preventDefault(); const button = form.querySelector('button'); button.disabled = true;
    try { await api('setup', Object.fromEntries(new FormData(form))); location.reload(); }
    catch (error) { errAlert(error); button.disabled = false; }
  };
}

'use strict';
/* =====================================================================
   APP — ส่วนหน้าเว็บของระบบติดตามงบประมาณค่าใช้สอย
   ===================================================================== */
const IS_SERVER = true;
(function checkLibs() {
  const miss = [['Swal', 'SweetAlert2']].filter(([g]) => !window[g]).map(x => x[1]);
  if (!miss.length) return;
  const b = document.getElementById('boot');
  b.innerHTML = '<div style="max-width:420px;padding:24px;text-align:center;font-family:Sarabun,Tahoma,sans-serif;color:#12353A"><div style="font-size:20px;font-weight:700;margin-bottom:8px">โหลดส่วนประกอบของระบบไม่สำเร็จ</div><div style="color:#5E7B7E">ไม่สามารถโหลด ' + miss.join(', ') + ' จากอินเทอร์เน็ต กรุณาตรวจสอบการเชื่อมต่อ แล้วเปิดหน้านี้ใหม่ (ไฟล์ต้องเปิดด้วยเบราว์เซอร์ Chrome, Edge หรือ Safari ที่ต่ออินเทอร์เน็ต)</div><button onclick="location.reload()" style="margin-top:16px;height:42px;padding:0 18px;border:0;border-radius:12px;background:#0C7C82;color:#fff;font-weight:600;cursor:pointer">ลองใหม่</button></div>';
  throw new Error('Missing libraries: ' + miss.join(', '));
})();
const MONTHS = ['', 'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
const MONTHS_S = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
const FY_MONTHS = [10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const PALETTE = ['#0C7C82', '#35B4B0', '#26A69A', '#AED581', '#FFCA28', '#FF8A65', '#EF5350', '#4A2C6D', '#D32F2F', '#F57C00', '#FBC02D', '#0288D1'];
const STATUS_BADGE = { 'จ่ายแล้ว': 'b-ok', 'รอเบิกจ่าย': 'b-warn', 'ยกเลิก': 'b-muted' };
const ROLE_BADGE = { admin: 'b-plum', staff: 'b-info', viewer: 'b-muted' };

const S = { token: '', user: null, settings: {}, users: [], fiscalYears: [], moneyTypes: [], categories: [], budgets: [], transactions: [], fyId: '', page: 'dashboard',
  txf: { q: '', mt: '', cat: '', month: '', status: '', sort: 'created_at', dir: -1 }, sel: new Set(),
  rep: { type: 'money', mt: '', cat: '', m1: '', m2: '', chart: true, sign: true, orient: 'portrait' } };
const IDX = { mt: {}, cat: {}, fy: {}, user: {} };
let CHARTS = [];

/* ---------------- utilities ---------------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = n => Number(n || 0).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmt0 = n => Number(n || 0).toLocaleString('th-TH');
const sum = (arr, k) => arr.reduce((a, r) => a + (Number(k ? r[k] : r) || 0), 0);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const pct = (a, b) => b > 0 ? a / b * 100 : 0;
const thaiDate = (d = new Date()) => d.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
const thaiDateTime = iso => { if (!iso) return '-'; const d = new Date(iso); return isNaN(d) ? iso : d.toLocaleString('th-TH', { year: '2-digit', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }); };
const curBE = () => new Date().getFullYear() + 543;
function compact(n) { n = Number(n || 0); const a = Math.abs(n); if (a >= 1e6) return (n / 1e6).toFixed(2).replace(/\.?0+$/, '') + 'M'; if (a >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'; return fmt0(Math.round(n)); }
function hexA(hex, a) { const n = parseInt(String(hex || '#0C7C82').slice(1), 16); return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`; }
function darken(hex, f = .38) { const n = parseInt(String(hex || '#0C7C82').slice(1), 16); return `rgb(${((n >> 16 & 255) * (1 - f)) | 0},${((n >> 8 & 255) * (1 - f)) | 0},${((n & 255) * (1 - f)) | 0})`; }
function cBadge(name, color) { return `<span class="badge" style="background:${hexA(color, .13)};color:${darken(color, .35)}"><span class="bd" style="background:${color}"></span>${esc(name)}</span>`; }
function stBadge(s) { return `<span class="badge ${STATUS_BADGE[s] || 'b-muted'}"><span class="bd"></span>${esc(s || '-')}</span>`; }
function pctBadge(p) { const w = Number(S.settings.warn_percent || 80); const cls = p >= 100 ? 'b-bad' : p >= w ? 'b-warn' : 'b-ok'; return `<span class="badge ${cls} num">${p.toFixed(1)}%</span>`; }
function barColor(p) { const w = Number(S.settings.warn_percent || 80); return p >= 100 ? 'linear-gradient(90deg,#EF5350,#D32F2F)' : p >= w ? 'linear-gradient(90deg,#FFCA28,#F57C00)' : 'linear-gradient(90deg,#35B4B0,#0C7C82)'; }
function progress(p) { return `<div class="bar"><i style="width:${Math.min(100, Math.max(0, p)).toFixed(1)}%;background:${barColor(p)}"></i></div>`; }
function icons(root = document) {
  root.querySelectorAll('i[data-lucide]').forEach(el => {
    const n = el.getAttribute('data-lucide');
    el.outerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-${n} ${el.getAttribute('class') || ''}"${el.getAttribute('style') ? ` style="${el.getAttribute('style')}"` : ''} aria-hidden="true">${ICONS[n] || ''}</svg>`;
  });
}
const HAS_CHART = !!(window.Chart && window.ChartDataLabels), HAS_XLSX = !!window.XLSX;
function needXLSX() { if (HAS_XLSX) return true; errAlert(new Error('โหลดตัวจัดการไฟล์ Excel ไม่สำเร็จ กรุณาตรวจสอบอินเทอร์เน็ตแล้วโหลดหน้าใหม่')); return false; }
function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { return null; } }
function sstore(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); if (v === null) sessionStorage.removeItem(k); else sessionStorage.setItem(k, v); } catch (e) { return null; } }
function byName(a, b) { return (a.sort || 0) - (b.sort || 0) || String(a.name).localeCompare(String(b.name), 'th'); }
function emptyState(icon, title, sub = '', btn = '') { return `<div class="empty"><div class="ei"><i data-lucide="${icon}"></i></div><div class="font-bold text-ink text-base">${title}</div><div class="text-sm mt-1">${sub}</div>${btn ? `<div class="mt-4">${btn}</div>` : ''}</div>`; }
function downloadBlob(content, name, type) {
  const blob = content instanceof Blob ? content : new Blob([content], { type });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 800);
}

/* ---------------- feedback (loader / sweetalert) ---------------- */
let loadCount = 0;
function loading(on, text = 'กำลังประมวลผล...') {
  loadCount = Math.max(0, loadCount + (on ? 1 : -1));
  $('#loaderText').textContent = text;
  $('#loader').hidden = loadCount === 0;
}
async function withLoad(text, fn) { loading(true, text); try { return await fn(); } finally { loading(false); } }
const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 2400, timerProgressBar: true, customClass: { popup: 'swal-toast' } });
const ok = (title) => Toast.fire({ icon: 'success', title });
const errAlert = (e) => Swal.fire({ icon: 'error', title: 'ไม่สำเร็จ', text: e && e.message ? e.message : String(e), confirmButtonText: 'ตกลง', confirmButtonColor: '#0C7C82' });
function confirmBox({ title = 'ยืนยัน', html = '', icon = 'warning', confirm = 'ยืนยัน', danger = false }) {
  return Swal.fire({ title, html, icon, showCancelButton: true, confirmButtonText: confirm, cancelButtonText: 'ยกเลิก', reverseButtons: true, focusCancel: danger,
    confirmButtonColor: danger ? '#EF5350' : '#0C7C82', cancelButtonColor: '#9BB3B5' }).then(r => r.isConfirmed);
}
const confirmDelete = (what, extra = '') => confirmBox({ title: 'ยืนยันการลบ', html: `ต้องการลบ <b>${esc(what)}</b> ใช่หรือไม่?${extra ? `<div class="mt-2 text-sm" style="color:#B71C1C">${extra}</div>` : ''}<div class="mt-2 text-sm text-muted">การลบไม่สามารถกู้คืนได้</div>`, confirm: 'ลบข้อมูล', danger: true });

/* ---------------- data layer ---------------- */
async function api(action, payload = {}) {
  const response = await fetch('/api/rpc', {
    method: 'POST', credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, payload })
  });
  const r = await response.json();
  if (r.ok) return r.data;
  if (r.code === 'AUTH' && action !== 'login') sessionExpired();
  throw new Error(r.error || 'เชื่อมต่อเซิร์ฟเวอร์ไม่สำเร็จ');
}

function reindex() {
  IDX.mt = Object.fromEntries(S.moneyTypes.map(x => [x.id, x]));
  IDX.cat = Object.fromEntries(S.categories.map(x => [x.id, x]));
  IDX.fy = Object.fromEntries(S.fiscalYears.map(x => [x.id, x]));
  IDX.user = Object.fromEntries(S.users.map(x => [x.id, x]));
  S.moneyTypes.sort(byName); S.categories.sort(byName); S.fiscalYears.sort((a, b) => b.year - a.year);
}
async function loadAll() {
  const d = await api('bootstrap');
  Object.assign(S, { user: d.user, settings: d.settings, users: d.users, fiscalYears: d.fiscalYears, moneyTypes: d.moneyTypes, categories: d.categories, budgets: d.budgets, transactions: d.transactions });
  reindex();
  const pref = store('bts_fy');
  if (!IDX.fy[S.fyId]) S.fyId = IDX.fy[pref] ? pref : ((S.fiscalYears.find(f => f.is_active) || S.fiscalYears[0] || {}).id || '');
}
function upsert(table, rec) { const arr = S[table]; const i = arr.findIndex(r => r.id === rec.id); if (i >= 0) arr[i] = rec; else arr.push(rec); reindex(); }
function dropLocal(table, ids) { const s = new Set(ids); S[table] = S[table].filter(r => !s.has(r.id)); reindex(); }

/* ---------------- permissions & computations ---------------- */
const role = () => S.user ? S.user.role : 'viewer';
const isAdmin = () => role() === 'admin';
const canEditTx = () => role() === 'admin' || role() === 'staff';
const fyOf = id => IDX.fy[id] || { year: '-', name: '-' };
const fyLabel = id => 'ปีงบประมาณ ' + fyOf(id).year;
const live = t => t.status !== 'ยกเลิก';
const txFY = (fy = S.fyId) => S.transactions.filter(t => t.fiscal_year_id === fy);
function mtBudget(fy, mt) { const b = S.budgets.filter(x => x.fiscal_year_id === fy && x.money_type_id === mt); const whole = b.filter(x => !x.category_id); return whole.length ? sum(whole, 'amount') : sum(b, 'amount'); }
const totalBudget = fy => S.moneyTypes.reduce((a, m) => a + mtBudget(fy, m.id), 0);
function spent(fy, mt, cat, excludeId) { return sum(S.transactions.filter(t => t.fiscal_year_id === fy && live(t) && t.id !== excludeId && (!mt || t.money_type_id === mt) && (!cat || t.category_id === cat)), 'amount'); }
function fyStats(fy = S.fyId) {
  const tx = txFY(fy), lv = tx.filter(live);
  const paid = sum(lv.filter(t => t.status === 'จ่ายแล้ว'), 'amount'), pending = sum(lv.filter(t => t.status === 'รอเบิกจ่าย'), 'amount');
  const budget = totalBudget(fy);
  const usedB = S.moneyTypes.filter(m => mtBudget(fy, m.id) > 0).reduce((a, m) => a + spent(fy, m.id), 0);
  return { tx, lv, paid, pending, used: paid + pending, usedB, budget, remain: budget - usedB, pctUsed: pct(usedB, budget), count: lv.length, cancelled: tx.length - lv.length };
}
function alerts() {
  const out = [], fy = S.fyId, w = Number(S.settings.warn_percent || 80);
  const bs = S.budgets.filter(b => b.fiscal_year_id === fy);
  if (!bs.length && S.fiscalYears.length) out.push({ lvl: 'info', icon: 'info', t: 'ยังไม่ได้กำหนดงบจัดสรร', d: fyLabel(fy) + ' — กำหนดงบเพื่อติดตามยอดคงเหลือ', go: 'budgets' });
  bs.forEach(b => {
    const used = b.category_id ? spent(fy, b.money_type_id, b.category_id) : spent(fy, b.money_type_id);
    const p = pct(used, b.amount);
    const name = (IDX.mt[b.money_type_id] || {}).name + (b.category_id ? ' · ' + (IDX.cat[b.category_id] || {}).name : '');
    if (b.amount > 0 && p >= 100) out.push({ lvl: 'bad', icon: 'circle-alert', t: 'ใช้งบเกินที่จัดสรร', d: `${name} ใช้ไป ${p.toFixed(1)}%`, go: 'budgets' });
    else if (b.amount > 0 && p >= w) out.push({ lvl: 'warn', icon: 'triangle-alert', t: 'ใกล้ครบวงเงิน', d: `${name} ใช้ไป ${p.toFixed(1)}%`, go: 'budgets' });
  });
  const pend = txFY(fy).filter(t => t.status === 'รอเบิกจ่าย').length;
  if (pend) out.push({ lvl: 'warn', icon: 'clock', t: 'รายการรอเบิกจ่าย', d: `${pend} รายการ`, go: 'transactions', f: { status: 'รอเบิกจ่าย' } });
  return out;
}
function reporter() {
  const s = S.settings, u = IDX.user[s.reporter_user_id];
  return { name: s.reporter_name || (u && u.full_name) || (S.user && S.user.full_name) || '-', position: s.reporter_position || (u && u.position) || (S.user && S.user.position) || '' };
}
function dupKey(t) { return [t.money_type_id, String(t.voucher_no).replace(/\s|\./g, ''), Number(t.amount).toFixed(2), String(t.description).trim()].join('|'); }

/* ---------------- charts ---------------- */
const GRID = { color: '#EDF3F3', drawTicks: false };
const centerText = { id: 'centerText', afterDraw(c) { const o = c.options.plugins.centerText; if (!o || !o.label) return; const { ctx, chartArea: a } = c; const x = (a.left + a.right) / 2, y = (a.top + a.bottom) / 2; ctx.save(); ctx.textAlign = 'center'; ctx.fillStyle = '#5E7B7E'; ctx.font = "500 12px Sarabun, Tahoma"; ctx.fillText(o.label, x, y - 10); ctx.fillStyle = '#12353A'; ctx.font = "800 18px Sarabun, Tahoma"; ctx.fillText(o.value, x, y + 12); ctx.restore(); } };
if (HAS_CHART) {
Chart.register(ChartDataLabels);
Chart.defaults.font.family = "'Sarabun', Tahoma, sans-serif";
Chart.defaults.font.size = 12.5;
Chart.defaults.color = '#5E7B7E';
Chart.defaults.plugins.datalabels.display = false;
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.boxWidth = 8;
Chart.defaults.plugins.legend.labels.padding = 14;
Chart.defaults.plugins.tooltip.backgroundColor = '#12353A';
Chart.defaults.plugins.tooltip.padding = 10;
Chart.defaults.plugins.tooltip.cornerRadius = 10;
Chart.defaults.plugins.tooltip.callbacks.label = ctx => { const v = typeof ctx.raw === 'number' ? ctx.raw : (ctx.parsed && (ctx.parsed.y ?? ctx.parsed.x)); return ` ${ctx.dataset.label || ctx.label}: ${fmt(v)} บาท`; };
Chart.register(centerText);
}

function destroyCharts() { CHARTS.forEach(c => { try { c.destroy(); } catch (e) { } }); CHARTS = []; }
const chartBuilders = new Map();
let chartObs = null;
function chartBox(id, cls = '') { return `<div class="chart-box ${cls}" data-chart="${id}"><div class="skel absolute" style="inset:12px 16px"></div></div>`; }
function mountCharts(builders) {
  Object.entries(builders).forEach(([k, fn]) => chartBuilders.set(k, fn));
  if (chartObs) chartObs.disconnect();
  chartObs = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { chartObs.unobserve(e.target); drawChart(e.target); } }), { rootMargin: '120px' }) : null;
  $$('[data-chart]').forEach(el => chartObs ? chartObs.observe(el) : drawChart(el));
}
function drawChart(el) {
  const fn = chartBuilders.get(el.dataset.chart); if (!fn) return;
  setTimeout(() => {
    if (!el.isConnected) return;
    if (!HAS_CHART) { const sk0 = el.querySelector('.skel'); if (sk0) sk0.remove(); el.innerHTML = emptyState('chart-pie', 'โหลดกราฟไม่สำเร็จ', 'ตรวจสอบอินเทอร์เน็ตแล้วโหลดหน้าใหม่'); icons(el); return; }
    const cfg = fn();
    const sk = el.querySelector('.skel'); if (sk) sk.remove();
    if (!cfg) { el.innerHTML = emptyState('chart-pie', 'ยังไม่มีข้อมูลสำหรับแสดงกราฟ'); icons(); return; }
    const cv = document.createElement('canvas'); el.appendChild(cv);
    CHARTS.push(new Chart(cv, cfg));
  }, 140);
}
const dlBar = (horizontal = false) => ({ display: ctx => (ctx.dataset.data[ctx.dataIndex] || 0) > 0, anchor: 'end', align: 'end', offset: 2, clamp: true, color: '#12353A', font: { weight: 700, size: 11 }, formatter: v => compact(v) });

function cfgMonthly(fy) {
  const tx = txFY(fy).filter(live); if (!tx.length) return null;
  const mts = S.moneyTypes.filter(m => tx.some(t => t.money_type_id === m.id));
  const totals = FY_MONTHS.map(m => sum(tx.filter(t => t.month === m), 'amount'));
  return { type: 'bar', data: { labels: FY_MONTHS.map(m => MONTHS_S[m]), datasets: mts.map((m, i) => ({ label: m.name, data: FY_MONTHS.map(mm => sum(tx.filter(t => t.month === mm && t.money_type_id === m.id), 'amount')), backgroundColor: m.color, borderRadius: 6, borderSkipped: false, maxBarThickness: 38,
    datalabels: i === mts.length - 1 ? { display: ctx => totals[ctx.dataIndex] > 0, anchor: 'end', align: 'end', color: '#12353A', font: { weight: 700, size: 11 }, formatter: (v, ctx) => compact(totals[ctx.dataIndex]) } : { display: false } })) },
    options: { responsive: true, maintainAspectRatio: false, layout: { padding: { top: 22 } }, plugins: { legend: { position: 'bottom' } }, scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, grid: GRID, border: { display: false }, ticks: { callback: v => compact(v) } } } } };
}
function cfgDoughnut(fy, field = 'money_type_id', idx = IDX.mt, list = S.moneyTypes) {
  const tx = txFY(fy).filter(live); if (!tx.length) return null;
  const items = list.map(m => ({ m, v: sum(tx.filter(t => t[field] === m.id), 'amount') })).filter(x => x.v > 0).sort((a, b) => b.v - a.v);
  const total = sum(items, 'v');
  return { type: 'doughnut', data: { labels: items.map(x => x.m.name), datasets: [{ data: items.map(x => x.v), backgroundColor: items.map(x => x.m.color), borderColor: '#fff', borderWidth: 3, hoverOffset: 8 }] },
    options: { responsive: true, maintainAspectRatio: false, cutout: '62%', plugins: { legend: { position: 'bottom' }, centerText: { label: 'รวมทั้งสิ้น', value: compact(total) },
      datalabels: { display: ctx => ctx.dataset.data[ctx.dataIndex] / total >= .05, color: '#fff', font: { weight: 800, size: 12 }, formatter: v => (v / total * 100).toFixed(1) + '%' } } } };
}
function cfgCategory(fy) {
  const tx = txFY(fy).filter(live); if (!tx.length) return null;
  const items = S.categories.map(c => ({ c, v: sum(tx.filter(t => t.category_id === c.id), 'amount') })).filter(x => x.v > 0).sort((a, b) => b.v - a.v);
  return { type: 'bar', data: { labels: items.map(x => x.c.name), datasets: [{ label: 'ยอดเบิกจ่าย', data: items.map(x => x.v), backgroundColor: items.map(x => x.c.color), borderRadius: 8, borderSkipped: false, maxBarThickness: 26, datalabels: dlBar(true) }] },
    options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, layout: { padding: { right: 54 } }, plugins: { legend: { display: false } }, scales: { x: { grid: GRID, border: { display: false }, ticks: { callback: v => compact(v) } }, y: { grid: { display: false } } } } };
}
function cfgBudgetVsUsed(fy) {
  const mts = S.moneyTypes.filter(m => mtBudget(fy, m.id) > 0 || spent(fy, m.id) > 0);
  if (!mts.length || totalBudget(fy) <= 0) return null;
  return { type: 'bar', data: { labels: mts.map(m => m.name), datasets: [
    { label: 'งบจัดสรร', data: mts.map(m => mtBudget(fy, m.id)), backgroundColor: mts.map(m => hexA(m.color, .28)), borderRadius: 8, maxBarThickness: 34, datalabels: dlBar() },
    { label: 'ใช้ไป', data: mts.map(m => spent(fy, m.id)), backgroundColor: mts.map(m => m.color), borderRadius: 8, maxBarThickness: 34, datalabels: dlBar() }] },
    options: { responsive: true, maintainAspectRatio: false, layout: { padding: { top: 22 } }, plugins: { legend: { position: 'bottom' } }, scales: { x: { grid: { display: false } }, y: { grid: GRID, border: { display: false }, ticks: { callback: v => compact(v) } } } } };
}
function chartImage(cfg, w = 900, h = 340) {
  return new Promise(res => {
    if (!cfg || !HAS_CHART) return res('');
    const holder = document.createElement('div'); holder.style.cssText = `position:fixed;left:-10000px;top:0;width:${w}px;height:${h}px`;
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h; holder.appendChild(cv); document.body.appendChild(holder);
    cfg.options = Object.assign({}, cfg.options, { responsive: false, animation: false, devicePixelRatio: 2, maintainAspectRatio: false });
    const ch = new Chart(cv, cfg);
    setTimeout(() => { const url = cv.toDataURL('image/png'); ch.destroy(); holder.remove(); res(url); }, 60);
  });
}

/* ---------------- shell: brand, nav, footer ---------------- */
const NAV = [
  { group: 'ภาพรวม', items: [{ id: 'dashboard', label: 'แดชบอร์ด', icon: 'layout-dashboard' }] },
  { group: 'งบประมาณ', items: [
    { id: 'transactions', label: 'รายการเบิกจ่าย', icon: 'receipt-text', pill: () => txFY().length },
    { id: 'budgets', label: 'งบจัดสรร', icon: 'wallet-cards' },
    { id: 'reports', label: 'รายงาน / พิมพ์', icon: 'printer' }] },
  { group: 'ข้อมูลหลัก', items: [
    { id: 'fiscalYears', label: 'ปีงบประมาณ', icon: 'calendar-range', pill: () => S.fiscalYears.length },
    { id: 'moneyTypes', label: 'ประเภทเงิน', icon: 'banknote' },
    { id: 'categories', label: 'หมวดรายจ่าย', icon: 'tags' }] },
  { group: 'ระบบ', items: [
    { id: 'dataio', label: 'นำเข้า / ส่งออก', icon: 'file-spreadsheet', roles: ['admin', 'staff'] },
    { id: 'users', label: 'ผู้ใช้งาน', icon: 'users', roles: ['admin'] },
    { id: 'logs', label: 'ประวัติการใช้งาน', icon: 'history', roles: ['admin'] },
    { id: 'settings', label: 'ตั้งค่าระบบ', icon: 'settings', roles: ['admin'] }] }
];
const PAGE_META = {};
NAV.forEach(g => g.items.forEach(i => PAGE_META[i.id] = i));
const canSee = id => { const m = PAGE_META[id]; return m && (!m.roles || m.roles.includes(role())); };

function logoHTML(cls = '') { const l = S.settings.logo; return l ? `<img src="${l}" alt="โลโก้" loading="lazy" class="${cls}">` : '<i data-lucide="school"></i>'; }
function applyBrand(info) {
  const s = info || S.settings;
  const logo = s.logo ? `<img src="${s.logo}" alt="โลโก้โรงเรียน" loading="lazy">` : '<i data-lucide="school"></i>';
  ['#loginLogo', '#sbLogo'].forEach(id => { const el = $(id); if (el) el.innerHTML = logo; });
  $('#loginSchool').textContent = s.school_name || 'โรงเรียน';
  $('#loginAff').textContent = s.affiliation || '';
  $('#loginSys').textContent = s.system_name || 'ระบบติดตามงบประมาณค่าใช้สอย';
  $('#sbSchool').textContent = s.school_name || 'โรงเรียน';
  $('#sbSys').textContent = s.system_name || 'ระบบติดตามงบประมาณค่าใช้สอย';
  document.title = (s.system_name || 'ระบบติดตามงบประมาณค่าใช้สอย') + (s.school_name ? ' | ' + s.school_name : '');
  icons();
}
function renderNav() {
  $('#navList').innerHTML = NAV.map(g => {
    const items = g.items.filter(i => canSee(i.id));
    if (!items.length) return '';
    return `<div class="nav-group">${g.group}</div>` + items.map(i => `<button class="nav-item ${S.page === i.id ? 'active' : ''}" data-go="${i.id}"><i data-lucide="${i.icon}"></i><span>${i.label}</span>${i.pill ? `<span class="pill num">${fmt0(i.pill())}</span>` : ''}</button>`).join('');
  }).join('');
  const st = fyStats();
  $('#sbFy').innerHTML = `<div class="flex items-center justify-between text-xs font-semibold text-muted"><span>${esc(fyLabel(S.fyId))}</span><span class="num">${st.budget ? st.pctUsed.toFixed(1) + '%' : '-'}</span></div>
    <div class="font-bold text-brand mt-1 num">${fmt(st.used)} <span class="text-xs font-medium text-muted">บาท</span></div>
    <div class="mt-2">${progress(st.budget ? st.pctUsed : 0)}</div>
    <div class="text-[11px] text-muted mt-1.5">${st.budget ? 'คงเหลือ ' + fmt(st.remain) + ' บาท' : 'ยังไม่ได้กำหนดงบจัดสรร'}</div>`;
  $$('#bottomNav [data-go]').forEach(b => b.classList.toggle('active', b.dataset.go === S.page));
  $('#fabAdd').hidden = !canEditTx();
  icons();
}
function renderFySelect() {
  const opts = S.fiscalYears.map(f => `<option value="${f.id}" ${f.id === S.fyId ? 'selected' : ''}>ปีงบ ${f.year}${f.is_active ? ' (ปัจจุบัน)' : ''}</option>`).join('') || '<option value="">ยังไม่มีปีงบประมาณ</option>';
  $('#fySelect').innerHTML = opts; $('#fySelectM').innerHTML = opts;
}
function renderUser() {
  const u = S.user || {};
  $('#avatar').textContent = (u.full_name || u.username || '?').trim().charAt(0);
  $('#uName').textContent = u.full_name || u.username;
  $('#uRole').textContent = CORE.ROLES[u.role] || '';
}
function renderFooter() {
  const r = reporter(), s = S.settings;
  $('#footer').innerHTML = `<div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
    <div class="flex items-center gap-2 flex-wrap"><i data-lucide="wallet-cards" class="text-brand"></i><b class="text-ink">${esc(s.system_name || 'ระบบติดตามงบประมาณค่าใช้สอย')}</b><span>·</span><span>${esc(s.school_name || '')}</span></div>
    <div class="flex items-center gap-2 flex-wrap"><i data-lucide="badge-check" class="text-brand"></i>ครูผู้รายงาน: <b class="text-ink">${esc(r.name)}</b>${r.position ? `<span>(${esc(r.position)})</span>` : ''}<span>· © ${curBE()}</span></div></div>`;
  icons();
}
function renderBell() {
  const a = alerts();
  const n = a.filter(x => x.lvl !== 'info').length;
  $('#bellDot').hidden = !n; $('#bellDot').textContent = n;
  const cls = { bad: 'b-bad', warn: 'b-warn', info: 'b-info' };
  $('#bellDd').innerHTML = `<div class="px-3 pt-2 pb-1 font-bold flex items-center justify-between">การแจ้งเตือน <span class="badge b-brand">${a.length}</span></div>` +
    (a.length ? a.map((x, i) => `<button class="dd-item items-start" data-alert="${i}"><span class="badge ${cls[x.lvl]}" style="padding:6px"><i data-lucide="${x.icon}"></i></span><span class="min-w-0"><span class="block font-semibold">${esc(x.t)}</span><span class="block text-xs text-muted">${esc(x.d)}</span></span></button>`).join('')
      : '<div class="p-4 text-center text-sm text-muted">ไม่มีการแจ้งเตือน งบประมาณอยู่ในเกณฑ์ปกติ</div>');
  $('#bellDd')._alerts = a;
  icons();
}
function refreshShell() { renderNav(); renderFySelect(); renderUser(); renderFooter(); renderBell(); applyBrand(); }
function setTitle() {
  const m = PAGE_META[S.page] || {};
  $('#pageTitle').textContent = m.label || '';
  $('#pageSub').textContent = `${S.settings.school_name || ''} · ${fyLabel(S.fyId)}`;
}
function openMenu() { document.body.classList.add('menu-open'); }
function closeMenu() { document.body.classList.remove('menu-open'); }

/* ---------------- router ---------------- */
const PAGES = {};
function skeleton(page) {
  const stat = `<div class="card p-5 flex flex-col gap-3"><div class="skel" style="width:44px;height:44px;border-radius:14px"></div><div class="skel" style="height:14px;width:55%"></div><div class="skel" style="height:24px;width:75%"></div></div>`;
  const rows = Array.from({ length: 7 }, () => `<div class="flex gap-4 items-center px-5 py-3.5 border-b border-line"><div class="skel" style="height:14px;width:8%"></div><div class="skel" style="height:14px;width:16%"></div><div class="skel" style="height:14px;flex:1"></div><div class="skel" style="height:14px;width:14%"></div></div>`).join('');
  if (page === 'dashboard') return `<div class="grid grid-cols-2 xl:grid-cols-4 gap-4">${stat.repeat(4)}</div><div class="grid lg:grid-cols-3 gap-4 mt-4"><div class="card lg:col-span-2 p-5"><div class="skel" style="height:280px"></div></div><div class="card p-5"><div class="skel" style="height:280px"></div></div></div>`;
  return `<div class="card p-4 flex gap-3 flex-wrap"><div class="skel" style="height:42px;flex:1;min-width:200px"></div><div class="skel" style="height:42px;width:140px"></div><div class="skel" style="height:42px;width:140px"></div></div><div class="card mt-4 overflow-hidden">${rows}</div>`;
}
async function go(page, opt = {}) {
  if (!canSee(page)) page = 'dashboard';
  S.page = page; closeMenu(); destroyCharts(); chartBuilders.clear();
  $('#userDd').hidden = true; $('#bellDd').hidden = true;
  setTitle(); renderNav();
  const v = $('#view');
  v.innerHTML = skeleton(page);
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  await sleep(200);
  if (S.page !== page) return;
  try { PAGES[page](opt); } catch (e) { console.error(e); v.innerHTML = `<div class="card">${emptyState('circle-alert', 'แสดงหน้านี้ไม่สำเร็จ', esc(e.message))}</div>`; }
  v.classList.remove('fade-in'); void v.offsetWidth; v.classList.add('fade-in');
  icons();
}
function rerender() { refreshShell(); go(S.page); }

/* ---------------- modal ---------------- */
function openModal({ title, icon = 'square-pen', body, size = '', submitText = 'บันทึก', onSubmit, footer, onOpen, readonly = false }) {
  const root = document.createElement('div');
  root.className = 'modal';
  root.innerHTML = `<div class="ov"></div><form class="box ${size}" novalidate>
    <div class="mh"><div class="ic"><i data-lucide="${icon}"></i></div><div class="font-bold text-lg flex-1 min-w-0 truncate">${title}</div><button type="button" class="act" data-x aria-label="ปิด"><i data-lucide="x"></i></button></div>
    <div class="mb">${body}</div>
    <div class="mf">${footer !== undefined ? footer : `<button type="button" class="btn btn-light" data-x>${readonly ? 'ปิด' : 'ยกเลิก'}</button>${readonly ? '' : `<button type="submit" class="btn btn-primary"><i data-lucide="save"></i><span>${submitText}</span></button>`}`}</div></form>`;
  $('#modalRoot').appendChild(root);
  document.body.style.overflow = 'hidden';
  const close = () => { root.remove(); if (!$('#modalRoot').children.length) document.body.style.overflow = ''; };
  root.querySelectorAll('[data-x]').forEach(b => b.onclick = close);
  root.querySelector('.ov').onclick = close;
  root.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  const form = root.querySelector('form');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!onSubmit) return close();
    const btn = form.querySelector('button[type=submit]');
    const fd = Object.fromEntries(new FormData(form).entries());
    const html = btn ? btn.innerHTML : '';
    if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spin sm"></span><span>กำลังบันทึก...</span>'; }
    loading(true, 'กำลังบันทึกข้อมูล...');
    try { const r = await onSubmit(fd, form); if (r !== false) close(); }
    catch (er) { errAlert(er); }
    finally { loading(false); if (btn && btn.isConnected) { btn.disabled = false; btn.innerHTML = html; icons(); } }
  });
  icons();
  if (onOpen) onOpen(form, close);
  setTimeout(() => { const f = form.querySelector('.mb input:not([type=hidden]):not([type=checkbox]):not([readonly]), .mb textarea'); if (f && window.innerWidth > 640) f.focus(); }, 60);
  return { root, form, close };
}
const opt = (v, label, sel) => `<option value="${esc(v)}" ${String(v) === String(sel) ? 'selected' : ''}>${esc(label)}</option>`;
const fySelectOpts = sel => S.fiscalYears.map(f => opt(f.id, 'ปีงบประมาณ ' + f.year, sel)).join('');
const mtOpts = (sel, all = false) => (all ? opt('', 'ทุกประเภทเงิน', sel) : opt('', '— เลือกประเภทเงิน —', sel)) + S.moneyTypes.filter(m => m.active || m.id === sel).map(m => opt(m.id, m.name, sel)).join('');
const catOpts = (sel, all = false, allLabel = 'ทุกหมวดรายจ่าย') => (all ? opt('', allLabel, sel) : opt('', '— เลือกหมวดรายจ่าย —', sel)) + S.categories.filter(c => c.active || c.id === sel).map(c => opt(c.id, c.name, sel)).join('');
const monthOpts = (sel, all = false) => (all ? opt('', 'ทุกเดือน', sel) : '') + FY_MONTHS.map(m => opt(m, MONTHS[m], sel)).join('');

/* =====================================================================
   PAGE: Dashboard
   ===================================================================== */
const SHORTCUTS = [
  { label: 'เพิ่มรายการ', icon: 'plus', g: ['#0C7C82', '#35B4B0'], act: () => openTxModal(), need: canEditTx },
  { label: 'รายการเบิกจ่าย', icon: 'receipt-text', g: ['#0288D1', '#4FC3F7'], go: 'transactions' },
  { label: 'งบจัดสรร', icon: 'wallet-cards', g: ['#26A69A', '#AED581'], go: 'budgets' },
  { label: 'รายงาน', icon: 'printer', g: ['#F57C00', '#FFCA28'], go: 'reports' },
  { label: 'ปีงบประมาณ', icon: 'calendar-range', g: ['#4A2C6D', '#9575CD'], go: 'fiscalYears' },
  { label: 'ประเภทเงิน', icon: 'banknote', g: ['#D32F2F', '#FF8A65'], go: 'moneyTypes' },
  { label: 'หมวดรายจ่าย', icon: 'tags', g: ['#F9A825', '#FFE082'], go: 'categories' },
  { label: 'นำเข้า/ส่งออก', icon: 'file-spreadsheet', g: ['#2E7D32', '#9CCC65'], go: 'dataio' },
  { label: 'ผู้ใช้งาน', icon: 'users', g: ['#01579B', '#35B4B0'], go: 'users' },
  { label: 'ประวัติ', icon: 'history', g: ['#546E7A', '#90A4AE'], go: 'logs' },
  { label: 'ตั้งค่า', icon: 'settings', g: ['#37474F', '#78909C'], go: 'settings' },
  { label: 'ออกจากระบบ', icon: 'log-out', g: ['#EF5350', '#FF8A65'], act: () => logout() }
];
PAGES.dashboard = function () {
  const fy = S.fyId, st = fyStats(fy), w = Number(S.settings.warn_percent || 80);
  const usedP = st.pctUsed;
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'สวัสดีตอนเช้า' : hour < 17 ? 'สวัสดีตอนบ่าย' : 'สวัสดีตอนเย็น';
  const shortcuts = SHORTCUTS.filter(s => (!s.go || canSee(s.go)) && (!s.need || s.need()));
  const mtCards = S.moneyTypes.filter(m => m.active || spent(fy, m.id) > 0).map(m => {
    const b = mtBudget(fy, m.id), u = spent(fy, m.id), p = pct(u, b), n = st.lv.filter(t => t.money_type_id === m.id).length;
    return `<div class="card p-4 flex flex-col gap-3">
      <div class="flex items-center justify-between gap-2">${cBadge(m.name, m.color)}<span class="text-xs text-muted num">${fmt0(n)} รายการ</span></div>
      <div><div class="text-xs text-muted">ใช้ไป</div><div class="text-xl font-extrabold num" style="color:${darken(m.color, .2)}">${fmt(u)}</div></div>
      ${progress(b ? p : 0)}
      <div class="flex justify-between text-xs text-muted num"><span>งบ ${b ? fmt(b) : 'ยังไม่กำหนด'}</span><span>${b ? (p >= w ? `<b style="color:${p >= 100 ? '#D32F2F' : '#F57C00'}">${p.toFixed(1)}%</b>` : p.toFixed(1) + '%') : '—'}</span></div></div>`;
  }).join('');
  const recent = [...st.tx].sort((a, b) => (b.created_at > a.created_at ? 1 : -1)).slice(0, 8);
  const top = [...st.lv].sort((a, b) => b.amount - a.amount).slice(0, 5);

  $('#view').innerHTML = `
  <section class="md:hidden mb-5">
    <div class="card p-5" style="border-radius:24px">
      <div class="flex items-center justify-between mb-4"><div><div class="text-sm text-muted">${greet}</div><div class="font-bold text-lg">${esc(S.user.full_name)}</div></div><span class="badge b-brand">${esc(fyLabel(fy))}</span></div>
      <div class="ios-grid">${shortcuts.map((s, i) => `<button class="ios-app" data-sc="${i}"><span class="ios-icon" style="background:linear-gradient(145deg,${s.g[0]},${s.g[1]})"><i data-lucide="${s.icon}"></i></span><span>${s.label}</span></button>`).join('')}</div>
    </div>
  </section>

  <section class="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
    <div class="card stat hero"><div class="ic"><i data-lucide="wallet"></i></div><div><div class="lbl">งบจัดสรรทั้งหมด</div><div class="val num">${st.budget ? fmt(st.budget) : '—'}</div></div><div class="text-xs" style="color:rgba(255,255,255,.85)">${st.budget ? 'บาท · ' + esc(fyLabel(fy)) : 'ยังไม่ได้กำหนดงบ'}</div></div>
    <div class="card stat"><div class="ic" style="background:#E1F2FB;color:#0288D1"><i data-lucide="receipt-text"></i></div><div><div class="lbl">เบิกจ่ายแล้ว</div><div class="val num">${fmt(st.paid)}</div></div><div class="text-xs text-muted num">${st.pending ? 'รอเบิกจ่าย ' + fmt(st.pending) + ' บาท' : 'บาท'}</div></div>
    <div class="card stat"><div class="ic" style="background:${st.remain < 0 ? '#FDE8E8' : '#EFF7E6'};color:${st.remain < 0 ? '#D32F2F' : '#558B2F'}"><i data-lucide="piggy-bank"></i></div><div><div class="lbl">คงเหลือ</div><div class="val num" style="color:${st.remain < 0 ? '#D32F2F' : 'inherit'}">${st.budget ? fmt(st.remain) : '—'}</div></div><div class="flex items-center gap-2">${st.budget ? pctBadge(usedP) + '<span class="text-xs text-muted">ใช้ไปแล้ว</span>' : '<span class="text-xs text-muted">กำหนดงบที่เมนูงบจัดสรร</span>'}</div></div>
    <div class="card stat"><div class="ic" style="background:#FFF6DA;color:#C49000"><i data-lucide="file-text"></i></div><div><div class="lbl">จำนวนรายการ</div><div class="val num">${fmt0(st.count)}</div></div><div class="text-xs text-muted num">เฉลี่ย ${fmt(st.count ? st.used / st.count : 0)} บาท/รายการ</div></div>
  </section>

  <section class="mt-5">
    <div class="flex items-center justify-between mb-3"><h2 class="font-bold text-base flex items-center gap-2 m-0"><i data-lucide="banknote" class="text-brand"></i>การใช้งบตามประเภทเงิน</h2><button class="btn btn-soft btn-sm" data-go="budgets">จัดการงบ <i data-lucide="chevron-right"></i></button></div>
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">${mtCards || `<div class="card sm:col-span-2 xl:col-span-4">${emptyState('banknote', 'ยังไม่มีประเภทเงิน')}</div>`}</div>
  </section>

  <section class="grid lg:grid-cols-3 gap-4 mt-5">
    <div class="card lg:col-span-2 min-w-0"><div class="card-h"><div class="card-t"><i data-lucide="chart-column"></i>รายจ่ายรายเดือน (ต.ค. – ก.ย.)</div><span class="badge b-brand">${esc(fyLabel(fy))}</span></div>${chartBox('monthly', 'tall')}</div>
    <div class="card min-w-0"><div class="card-h"><div class="card-t"><i data-lucide="chart-pie"></i>สัดส่วนตามประเภทเงิน</div></div>${chartBox('mtDonut', 'tall')}</div>
  </section>
  <section class="grid lg:grid-cols-2 gap-4 mt-4">
    <div class="card min-w-0"><div class="card-h"><div class="card-t"><i data-lucide="chart-bar"></i>รายจ่ายตามหมวดรายจ่าย</div></div>${chartBox('category')}</div>
    <div class="card min-w-0"><div class="card-h"><div class="card-t"><i data-lucide="trending-up"></i>งบจัดสรรเทียบกับการใช้จริง</div></div>${chartBox('budgetVs')}</div>
  </section>

  <section class="grid xl:grid-cols-3 gap-4 mt-4">
    <div class="card xl:col-span-2 min-w-0 overflow-hidden"><div class="card-h pb-3"><div class="card-t"><i data-lucide="clock"></i>รายการล่าสุด</div><button class="btn btn-soft btn-sm" data-go="transactions">ดูทั้งหมด <i data-lucide="chevron-right"></i></button></div>
      <div class="table-wrap"><table class="tbl"><thead><tr><th>เลขที่</th><th>รายการ</th><th>ประเภทเงิน</th><th class="r">จำนวนเงิน</th><th>สถานะ</th></tr></thead><tbody>
      ${recent.map(t => `<tr class="cursor-pointer" data-view="${t.id}"><td class="whitespace-nowrap font-semibold">${esc(t.voucher_no || '-')}<div class="text-xs text-muted font-normal">${MONTHS_S[t.month]} ${String(t.year).slice(-2)}</div></td><td><div class="clamp2">${esc(t.description)}</div></td><td>${cBadge((IDX.mt[t.money_type_id] || {}).name || '-', (IDX.mt[t.money_type_id] || {}).color)}</td><td class="r num font-bold">${fmt(t.amount)}</td><td>${stBadge(t.status)}</td></tr>`).join('') || `<tr><td colspan="5">${emptyState('receipt-text', 'ยังไม่มีรายการเบิกจ่าย')}</td></tr>`}
      </tbody></table></div></div>
    <div class="card min-w-0"><div class="card-h pb-2"><div class="card-t"><i data-lucide="sparkles"></i>รายจ่ายสูงสุด 5 อันดับ</div></div>
      <div class="p-3 flex flex-col gap-1">${top.map((t, i) => `<button class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-brand-50 text-left w-full cursor-pointer" data-view="${t.id}"><span class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0" style="background:${hexA(PALETTE[i], .15)};color:${darken(PALETTE[i], .25)}">${i + 1}</span><span class="min-w-0 flex-1"><span class="block text-sm font-semibold truncate">${esc(t.description)}</span><span class="block text-xs text-muted">${esc((IDX.cat[t.category_id] || {}).name || '')} · ${esc(t.voucher_no)}</span></span><span class="num font-bold text-sm whitespace-nowrap">${compact(t.amount)}</span></button>`).join('') || emptyState('sparkles', 'ยังไม่มีข้อมูล')}</div></div>
  </section>`;

  $$('[data-sc]').forEach(b => b.onclick = () => { const s = shortcuts[b.dataset.sc]; s.go ? go(s.go) : s.act(); });
  mountCharts({ monthly: () => cfgMonthly(fy), mtDonut: () => cfgDoughnut(fy), category: () => cfgCategory(fy), budgetVs: () => cfgBudgetVsUsed(fy) });
};

/* =====================================================================
   PAGE: Transactions
   ===================================================================== */
function filteredTx() {
  const f = S.txf, q = f.q.trim().toLowerCase();
  let list = txFY().filter(t => (!f.mt || t.money_type_id === f.mt) && (!f.cat || t.category_id === f.cat) && (!f.month || t.month === Number(f.month)) && (!f.status || t.status === f.status)
    && (!q || (t.description + ' ' + t.voucher_no + ' ' + t.note + ' ' + t.amount).toLowerCase().includes(q)));
  const k = f.sort, d = f.dir;
  const fyIdx = m => FY_MONTHS.indexOf(m);
  list.sort((a, b) => {
    let x, y;
    if (k === 'month') { x = fyIdx(a.month); y = fyIdx(b.month); }
    else if (k === 'amount') { x = a.amount; y = b.amount; }
    else if (k === 'voucher_no') { return d * String(a.voucher_no).localeCompare(String(b.voucher_no), 'th', { numeric: true }); }
    else { x = a.created_at; y = b.created_at; }
    return x > y ? d : x < y ? -d : 0;
  });
  return list;
}
PAGES.transactions = function (o = {}) {
  if (o.filter) Object.assign(S.txf, { q: '', mt: '', cat: '', month: '', status: '' }, o.filter);
  S.sel.clear();
  const f = S.txf, edit = canEditTx();
  $('#view').innerHTML = `
  <div class="card p-4">
    <div class="flex flex-col lg:flex-row gap-3">
      <div class="search flex-1 min-w-0"><i data-lucide="search"></i><input id="fq" class="input" placeholder="ค้นหา รายการ เลขที่ บจ. จำนวนเงิน..." value="${esc(f.q)}"></div>
      <div class="flex gap-2 flex-wrap">
        ${edit ? '<button class="btn btn-primary" id="addTx"><i data-lucide="plus"></i>เพิ่มรายการ</button>' : ''}
        <button class="btn btn-light" id="expTx"><i data-lucide="file-down"></i><span class="hidden sm:inline">ส่งออก Excel</span></button>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
      <select id="fmt" class="input">${mtOpts(f.mt, true)}</select>
      <select id="fcat" class="input">${catOpts(f.cat, true)}</select>
      <select id="fmonth" class="input">${monthOpts(f.month, true)}</select>
      <select id="fst" class="input">${opt('', 'ทุกสถานะ', f.status)}${CORE.STATUSES.map(s => opt(s, s, f.status)).join('')}</select>
    </div>
  </div>
  <div class="card mt-4 overflow-hidden">
    <div class="flex items-center justify-between gap-3 flex-wrap px-4 sm:px-5 py-3.5 border-b border-line">
      <div id="txSum" class="flex items-center gap-2 flex-wrap text-sm"></div>
      <div class="flex items-center gap-2">
        <button id="bulkDel" class="btn btn-danger btn-sm" hidden><i data-lucide="trash-2"></i>ลบที่เลือก <span id="selN" class="num"></span></button>
        <button id="clrF" class="btn btn-light btn-sm"><i data-lucide="rotate-ccw"></i>ล้างตัวกรอง</button>
      </div>
    </div>
    <div class="table-wrap" style="max-height:calc(100dvh - 120px)"><table class="tbl"><thead><tr>
      ${edit ? '<th class="c" style="width:44px"><input type="checkbox" class="chk" id="chkAll" aria-label="เลือกทั้งหมด"></th>' : ''}
      <th style="width:52px">#</th><th class="cursor-pointer" data-sort="month">เดือน ${sortIc('month')}</th><th class="cursor-pointer" data-sort="voucher_no">เลขที่ ${sortIc('voucher_no')}</th><th>รายการ</th><th>ประเภทเงิน</th><th>หมวดรายจ่าย</th><th class="r cursor-pointer" data-sort="amount">จำนวนเงิน ${sortIc('amount')}</th><th>สถานะ</th><th class="r">จัดการ</th>
    </tr></thead><tbody id="txBody"></tbody></table><div id="txSentinel" style="height:1px"></div></div>
  </div>`;

  const list = filteredTx();
  const dups = {}; txFY().forEach(t => { const k = dupKey(t); dups[k] = (dups[k] || 0) + 1; });
  const total = sum(list.filter(live), 'amount');
  $('#txSum').innerHTML = `<span class="badge b-brand num">${fmt0(list.length)} รายการ</span><span class="text-muted">รวม</span><b class="num text-brand">${fmt(total)}</b><span class="text-muted">บาท</span>${list.some(t => t.status === 'ยกเลิก') ? '<span class="text-xs text-muted">(ไม่รวมรายการยกเลิก)</span>' : ''}`;
  const body = $('#txBody');
  let shown = 0;
  const rowHTML = (t, i) => {
    const mt = IDX.mt[t.money_type_id] || {}, ct = IDX.cat[t.category_id] || {};
    return `<tr data-view="${t.id}" class="cursor-pointer" style="${t.status === 'ยกเลิก' ? 'opacity:.55' : ''}">
      ${edit ? `<td class="c" data-stop><input type="checkbox" class="chk rowchk" value="${t.id}" ${S.sel.has(t.id) ? 'checked' : ''} aria-label="เลือก"></td>` : ''}
      <td class="text-muted num">${i + 1}</td>
      <td class="whitespace-nowrap">${MONTHS_S[t.month] || '-'} ${String(t.year).slice(-2)}</td>
      <td class="whitespace-nowrap font-semibold">${esc(t.voucher_no || '-')}${dups[dupKey(t)] > 1 ? ' <span class="badge b-warn" title="พบรายการที่เลขที่ จำนวนเงิน และรายละเอียดตรงกัน">ซ้ำ?</span>' : ''}</td>
      <td><div class="clamp2">${esc(t.description)}</div></td>
      <td>${cBadge(mt.name || '-', mt.color)}</td><td>${cBadge(ct.name || '-', ct.color)}</td>
      <td class="r num font-bold whitespace-nowrap">${fmt(t.amount)}</td>
      <td>${stBadge(t.status)}</td>
      <td class="r whitespace-nowrap" data-stop>${edit ? `<button class="act" data-edit="${t.id}" title="แก้ไข"><i data-lucide="pencil"></i></button><button class="act del" data-del="${t.id}" title="ลบ"><i data-lucide="trash-2"></i></button>` : `<button class="act" data-view="${t.id}" title="ดู"><i data-lucide="eye"></i></button>`}</td></tr>`;
  };
  const more = () => { if (shown >= list.length) return; const next = list.slice(shown, shown + 40); body.insertAdjacentHTML('beforeend', next.map((t, j) => rowHTML(t, shown + j)).join('')); shown += next.length; icons(); };
  if (!list.length) body.innerHTML = `<tr><td colspan="10">${emptyState('search', 'ไม่พบรายการ', 'ลองเปลี่ยนคำค้นหรือตัวกรอง หรือเพิ่มรายการใหม่', edit ? '<button class="btn btn-primary" data-add-tx><i data-lucide="plus"></i>เพิ่มรายการเบิกจ่าย</button>' : '')}</td></tr>`;
  else more();
  const obs = new IntersectionObserver(es => { if (es[0].isIntersecting) more(); }, { root: $('.table-wrap'), rootMargin: '300px' });
  obs.observe($('#txSentinel'));

  const refilter = () => go('transactions');
  let qT; $('#fq').oninput = e => { clearTimeout(qT); qT = setTimeout(() => { S.txf.q = e.target.value; PAGES.transactions(); icons(); const el = $('#fq'); el.focus(); el.setSelectionRange(el.value.length, el.value.length); }, 300); };
  $('#fmt').onchange = e => { S.txf.mt = e.target.value; refilter(); };
  $('#fcat').onchange = e => { S.txf.cat = e.target.value; refilter(); };
  $('#fmonth').onchange = e => { S.txf.month = e.target.value; refilter(); };
  $('#fst').onchange = e => { S.txf.status = e.target.value; refilter(); };
  $('#clrF').onclick = () => { Object.assign(S.txf, { q: '', mt: '', cat: '', month: '', status: '' }); refilter(); };
  $$('[data-sort]').forEach(th => th.onclick = () => { const k = th.dataset.sort; S.txf.dir = S.txf.sort === k ? -S.txf.dir : -1; S.txf.sort = k; refilter(); });
  $('#expTx').onclick = () => exportTx(list);
  if ($('#addTx')) $('#addTx').onclick = () => openTxModal();
  const updSel = () => { $('#bulkDel').hidden = !S.sel.size; $('#selN').textContent = S.sel.size ? `(${S.sel.size})` : ''; };
  body.addEventListener('change', e => { if (e.target.classList.contains('rowchk')) { e.target.checked ? S.sel.add(e.target.value) : S.sel.delete(e.target.value); updSel(); } });
  if ($('#chkAll')) $('#chkAll').onchange = e => { S.sel = new Set(e.target.checked ? list.map(t => t.id) : []); $$('.rowchk').forEach(c => c.checked = e.target.checked); updSel(); };
  $('#bulkDel').onclick = async () => {
    const ids = [...S.sel];
    if (!await confirmDelete(`รายการที่เลือก ${ids.length} รายการ`, `ยอดรวม ${fmt(sum(S.transactions.filter(t => S.sel.has(t.id)), 'amount'))} บาท`)) return;
    try { await withLoad('กำลังลบข้อมูล...', () => api('remove', { table: 'transactions', ids })); dropLocal('transactions', ids); ok(`ลบ ${ids.length} รายการแล้ว`); rerender(); } catch (e) { errAlert(e); }
  };
};
function sortIc(k) { return S.txf.sort === k ? `<i data-lucide="${S.txf.dir > 0 ? 'chevron-down' : 'chevron-down'}" style="${S.txf.dir > 0 ? 'transform:rotate(180deg)' : ''}"></i>` : '<i data-lucide="chevrons-up-down" style="opacity:.4"></i>'; }

function nextVoucher(fy, mt) {
  let max = 0; const yy = String(fyOf(fy).year).slice(-2);
  S.transactions.filter(t => t.fiscal_year_id === fy && t.money_type_id === mt).forEach(t => { const m = String(t.voucher_no).match(/(\d+)\s*\/\s*\d+/); if (m) max = Math.max(max, Number(m[1])); });
  return `บจ${max + 1}/${yy}`;
}
function openTxModal(rec) {
  if (!canEditTx()) return;
  if (!S.fiscalYears.length) return Swal.fire({ icon: 'info', title: 'ยังไม่มีปีงบประมาณ', text: 'กรุณาเพิ่มปีงบประมาณก่อนบันทึกรายการ', confirmButtonColor: '#0C7C82' }).then(() => go('fiscalYears'));
  const r = rec || { fiscal_year_id: S.fyId, month: new Date().getMonth() + 1, year: curBE(), status: 'จ่ายแล้ว' };
  const m = openModal({
    title: rec ? 'แก้ไขรายการเบิกจ่าย' : 'เพิ่มรายการเบิกจ่าย', icon: rec ? 'square-pen' : 'receipt-text', size: 'lg',
    body: `<div class="grid sm:grid-cols-2 gap-4">
      <label class="field"><span>ปีงบประมาณ <em>*</em></span><select name="fiscal_year_id" class="input" required>${fySelectOpts(r.fiscal_year_id)}</select></label>
      <label class="field"><span>สถานะ</span><select name="status" class="input">${CORE.STATUSES.map(s => opt(s, s, r.status)).join('')}</select></label>
      <label class="field"><span>ประเภทเงิน <em>*</em></span><select name="money_type_id" class="input" required>${mtOpts(r.money_type_id)}</select></label>
      <label class="field"><span>หมวดรายจ่าย <em>*</em></span><select name="category_id" class="input" required>${catOpts(r.category_id)}</select></label>
      <label class="field"><span>เลขที่ บจ.</span><div class="flex gap-2"><input name="voucher_no" class="input" value="${esc(r.voucher_no || '')}" placeholder="เช่น บจ12/69"><button type="button" class="btn btn-soft" id="genV" title="ใช้เลขถัดไป">เลขถัดไป</button></div></label>
      <label class="field"><span>จำนวนเงิน (บาท) <em>*</em></span><input name="amount" type="number" step="0.01" min="0.01" inputmode="decimal" class="input num" value="${r.amount || ''}" required placeholder="0.00"></label>
      <label class="field"><span>วันที่เอกสาร</span><input name="doc_date" type="date" class="input" value="${esc(r.doc_date || '')}"><span class="hint">ระบุแล้วระบบจะตั้งเดือน/ปีให้อัตโนมัติ</span></label>
      <div class="grid grid-cols-2 gap-3"><label class="field"><span>เดือน <em>*</em></span><select name="month" class="input">${monthOpts(r.month)}</select></label><label class="field"><span>ปี พ.ศ. <em>*</em></span><input name="year" type="number" class="input num" value="${r.year || curBE()}" min="2400" max="2800"></label></div>
      <label class="field sm:col-span-2"><span>รายการ / รายละเอียด <em>*</em></span><textarea name="description" class="input" rows="3" required placeholder="เช่น ค่าใช้สอย ค่าจ้างเหมาบริการรักษาความปลอดภัย เดือน...">${esc(r.description || '')}</textarea></label>
      <label class="field sm:col-span-2"><span>หมายเหตุ</span><input name="note" class="input" value="${esc(r.note || '')}"></label>
      <div id="budgetHint" class="sm:col-span-2"></div>
    </div>`,
    onSubmit: async fd => {
      const saved = await api('save', { table: 'transactions', record: Object.assign({ id: rec ? rec.id : undefined }, fd) });
      upsert('transactions', saved); ok(rec ? 'แก้ไขรายการแล้ว' : 'เพิ่มรายการแล้ว'); rerender();
    }
  });
  const F = m.form, el = n => F.elements[n];
  const hint = () => {
    const fy = el('fiscal_year_id').value, mt = el('money_type_id').value, cat = el('category_id').value, amt = Number(el('amount').value || 0);
    if (!mt) { $('#budgetHint', F).innerHTML = ''; return; }
    const catB = S.budgets.find(b => b.fiscal_year_id === fy && b.money_type_id === mt && b.category_id === cat && cat);
    const B = catB ? catB.amount : mtBudget(fy, mt), U = catB ? spent(fy, mt, cat, rec && rec.id) : spent(fy, mt, '', rec && rec.id);
    const label = (IDX.mt[mt] || {}).name + (catB ? ' · ' + (IDX.cat[cat] || {}).name : '');
    if (!B) { $('#budgetHint', F).innerHTML = `<div class="rounded-xl p-3 text-sm flex items-center gap-2" style="background:#F2F7F7"><i data-lucide="info" class="text-brand"></i>ยังไม่ได้กำหนดงบจัดสรรของ ${esc(label)} · ใช้ไปแล้ว ${fmt(U)} บาท</div>`; icons(); return; }
    const after = B - U - amt, over = after < 0;
    $('#budgetHint', F).innerHTML = `<div class="rounded-xl p-3 text-sm" style="background:${over ? '#FDECEC' : '#EAF6F5'}"><div class="flex items-center gap-2 font-semibold" style="color:${over ? '#B71C1C' : '#0C7C82'}"><i data-lucide="${over ? 'triangle-alert' : 'piggy-bank'}"></i>งบ ${esc(label)}</div>
      <div class="grid grid-cols-3 gap-2 mt-2 num"><div><div class="text-xs text-muted">งบจัดสรร</div><b>${fmt(B)}</b></div><div><div class="text-xs text-muted">ใช้ไปแล้ว</div><b>${fmt(U)}</b></div><div><div class="text-xs text-muted">คงเหลือหลังบันทึก</div><b style="color:${over ? '#D32F2F' : 'inherit'}">${fmt(after)}</b></div></div></div>`;
    icons();
  };
  ['fiscal_year_id', 'money_type_id', 'category_id', 'amount'].forEach(n => el(n).addEventListener('input', hint));
  el('doc_date').addEventListener('change', e => { const v = e.target.value; if (/^\d{4}-\d{2}-\d{2}$/.test(v)) { el('month').value = Number(v.slice(5, 7)); el('year').value = Number(v.slice(0, 4)) + 543; } });
  $('#genV', F).onclick = () => { const mt = el('money_type_id').value; if (!mt) return Toast.fire({ icon: 'info', title: 'เลือกประเภทเงินก่อน' }); el('voucher_no').value = nextVoucher(el('fiscal_year_id').value, mt); };
  hint();
}
function viewTx(id) {
  const t = S.transactions.find(x => x.id === id); if (!t) return;
  const mt = IDX.mt[t.money_type_id] || {}, ct = IDX.cat[t.category_id] || {}, edit = canEditTx();
  const row = (k, v) => `<div class="flex flex-col gap-0.5 py-2.5 border-b border-line"><span class="text-xs text-muted">${k}</span><span class="font-medium">${v}</span></div>`;
  const m = openModal({
    title: 'รายละเอียดรายการ', icon: 'receipt-text', readonly: true,
    body: `<div class="rounded-2xl p-4 mb-3 text-white" style="background:linear-gradient(135deg,#0C7C82,#35B4B0)"><div class="text-sm opacity-85">จำนวนเงิน</div><div class="text-3xl font-extrabold num">${fmt(t.amount)} <span class="text-base font-medium">บาท</span></div><div class="mt-2 flex gap-2 flex-wrap">${stBadge(t.status)}<span class="badge" style="background:rgba(255,255,255,.2);color:#fff">${esc(t.voucher_no || 'ไม่มีเลขที่')}</span></div></div>
      ${row('รายการ', `<span style="white-space:pre-wrap">${esc(t.description)}</span>`)}
      <div class="grid grid-cols-2 gap-x-4">${row('ประเภทเงิน', cBadge(mt.name || '-', mt.color))}${row('หมวดรายจ่าย', cBadge(ct.name || '-', ct.color))}${row('เดือน/ปี', MONTHS[t.month] + ' ' + t.year)}${row('ปีงบประมาณ', fyOf(t.fiscal_year_id).year)}${row('วันที่เอกสาร', t.doc_date ? thaiDate(new Date(t.doc_date)) : '-')}${row('บันทึกโดย', esc(t.created_by || '-'))}${row('บันทึกเมื่อ', thaiDateTime(t.created_at))}${row('แก้ไขล่าสุด', thaiDateTime(t.updated_at))}</div>
      ${t.note ? row('หมายเหตุ', esc(t.note)) : ''}`,
    footer: `<button type="button" class="btn btn-light" data-x>ปิด</button>${edit ? `<button type="button" class="btn btn-danger" id="vDel"><i data-lucide="trash-2"></i>ลบ</button><button type="button" class="btn btn-primary" id="vEdit"><i data-lucide="pencil"></i>แก้ไข</button>` : ''}`
  });
  if (edit) { $('#vEdit', m.root).onclick = () => { m.close(); openTxModal(t); }; $('#vDel', m.root).onclick = () => { m.close(); delTx(t.id); }; }
}
async function delTx(id) {
  const t = S.transactions.find(x => x.id === id); if (!t) return;
  if (!await confirmDelete(`${t.voucher_no || ''} ${t.description.slice(0, 60)}`, `จำนวนเงิน ${fmt(t.amount)} บาท`)) return;
  try { await withLoad('กำลังลบข้อมูล...', () => api('remove', { table: 'transactions', id })); dropLocal('transactions', [id]); ok('ลบรายการแล้ว'); rerender(); } catch (e) { errAlert(e); }
}
function txAOA(list) {
  return [['ลำดับ', 'ปีงบประมาณ', 'ประเภทเงิน', 'หมวดรายจ่าย', 'เลขที่', 'วันที่เอกสาร', 'เดือน', 'ปี', 'รายการ', 'จำนวนเงิน', 'สถานะ', 'หมายเหตุ', 'บันทึกโดย', 'บันทึกเมื่อ'],
    ...list.map((t, i) => [i + 1, fyOf(t.fiscal_year_id).year, (IDX.mt[t.money_type_id] || {}).name || '', (IDX.cat[t.category_id] || {}).name || '', t.voucher_no, t.doc_date, MONTHS[t.month], t.year, t.description, t.amount, t.status, t.note, t.created_by, t.created_at])];
}
function exportTx(list) {
  if (!needXLSX()) return;
  const wb = XLSX.utils.book_new(); const ws = XLSX.utils.aoa_to_sheet(txAOA(list));
  ws['!cols'] = [{ wch: 6 }, { wch: 10 }, { wch: 22 }, { wch: 16 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 7 }, { wch: 60 }, { wch: 14 }, { wch: 11 }, { wch: 20 }, { wch: 12 }, { wch: 22 }];
  XLSX.utils.book_append_sheet(wb, ws, 'รายการเบิกจ่าย');
  XLSX.writeFile(wb, `รายการเบิกจ่าย_ปีงบ${fyOf(S.fyId).year}.xlsx`);
  ok('ส่งออกไฟล์ Excel แล้ว');
}

/* =====================================================================
   PAGE: Budgets
   ===================================================================== */
PAGES.budgets = function () {
  const fy = S.fyId, edit = canEditTx(), st = fyStats(fy);
  const rows = S.budgets.filter(b => b.fiscal_year_id === fy).map(b => {
    const used = b.category_id ? spent(fy, b.money_type_id, b.category_id) : spent(fy, b.money_type_id);
    return { b, used, remain: b.amount - used, p: pct(used, b.amount), mt: IDX.mt[b.money_type_id] || {}, ct: b.category_id ? (IDX.cat[b.category_id] || {}) : null };
  }).sort((a, b) => (a.mt.sort - b.mt.sort) || ((a.ct ? a.ct.sort : 0) - (b.ct ? b.ct.sort : 0)));
  // ประเภทเงิน/หมวดที่มีการใช้จ่ายแต่ยังไม่ได้จัดสรรงบ
  const unb = [];
  S.moneyTypes.forEach(m => {
    const has = S.budgets.some(b => b.fiscal_year_id === fy && b.money_type_id === m.id);
    const u = spent(fy, m.id);
    if (!has && u > 0) unb.push({ m, u });
  });
  $('#view').innerHTML = `
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
    <div class="card stat hero"><div class="ic"><i data-lucide="wallet"></i></div><div class="lbl">งบจัดสรรรวม</div><div class="val num">${fmt(st.budget)}</div></div>
    <div class="card stat"><div class="ic" style="background:#E1F2FB;color:#0288D1"><i data-lucide="receipt-text"></i></div><div class="lbl">ใช้ไปแล้ว (ส่วนที่มีงบ)</div><div class="val num">${fmt(st.usedB)}</div></div>
    <div class="card stat"><div class="ic" style="background:#EFF7E6;color:#558B2F"><i data-lucide="piggy-bank"></i></div><div class="lbl">คงเหลือ</div><div class="val num" style="color:${st.remain < 0 ? '#D32F2F' : 'inherit'}">${fmt(st.remain)}</div></div>
    <div class="card stat"><div class="ic" style="background:#FFF1E0;color:#F57C00"><i data-lucide="chart-pie"></i></div><div class="lbl">ร้อยละการใช้งบ</div><div class="val num">${st.budget ? st.pctUsed.toFixed(1) + '%' : '—'}</div></div>
  </div>
  ${unb.length ? `<div class="card mt-4 p-4" style="background:#FFF8EC;border-color:#FFE0B2"><div class="flex items-center gap-2 font-bold" style="color:#B85A00"><i data-lucide="triangle-alert"></i>มีการใช้จ่ายที่ยังไม่ได้จัดสรรงบ</div><div class="flex flex-wrap gap-2 mt-3">${unb.map(x => `<button class="badge cursor-pointer" style="background:#fff;border:1px solid #FFE0B2;color:#7A4300;padding:6px 12px" data-quick="${x.m.id}">${esc(x.m.name)} · ใช้ไป ${fmt(x.u)} บาท ${edit ? '<i data-lucide="plus"></i>' : ''}</button>`).join('')}</div></div>` : ''}
  <div class="card mt-4 overflow-hidden">
    <div class="card-h pb-3 flex-wrap"><div class="card-t"><i data-lucide="wallet-cards"></i>งบจัดสรร ${esc(fyLabel(fy))}</div>
      ${edit ? `<div class="flex gap-2 flex-wrap"><button class="btn btn-light btn-sm" id="cpB"><i data-lucide="copy"></i>คัดลอกจากปีอื่น</button><button class="btn btn-primary btn-sm" id="addB"><i data-lucide="plus"></i>เพิ่มงบจัดสรร</button></div>` : ''}</div>
    <div class="table-wrap"><table class="tbl"><thead><tr><th>ประเภทเงิน</th><th>หมวดรายจ่าย</th><th class="r">งบจัดสรร</th><th class="r">ใช้ไป</th><th class="r">คงเหลือ</th><th style="min-width:160px">การใช้งบ</th><th>หมายเหตุ</th>${edit ? '<th class="r">จัดการ</th>' : ''}</tr></thead><tbody>
    ${rows.map(x => `<tr><td>${cBadge(x.mt.name || '-', x.mt.color)}</td><td>${x.ct ? cBadge(x.ct.name, x.ct.color) : '<span class="badge b-muted">ทุกหมวด</span>'}</td><td class="r num font-semibold">${fmt(x.b.amount)}</td><td class="r num">${fmt(x.used)}</td><td class="r num font-bold" style="color:${x.remain < 0 ? '#D32F2F' : '#0C7C82'}">${fmt(x.remain)}</td><td><div class="flex items-center gap-2"><div class="flex-1">${progress(x.p)}</div>${pctBadge(x.p)}</div></td><td class="text-sm text-muted">${esc(x.b.note)}</td>${edit ? `<td class="r whitespace-nowrap"><button class="act" data-eb="${x.b.id}"><i data-lucide="pencil"></i></button><button class="act del" data-db="${x.b.id}"><i data-lucide="trash-2"></i></button></td>` : ''}</tr>`).join('')
      || `<tr><td colspan="8">${emptyState('wallet-cards', 'ยังไม่มีงบจัดสรรในปีงบประมาณนี้', 'กำหนดวงเงินของแต่ละประเภทเงินหรือหมวดรายจ่าย เพื่อให้ระบบติดตามยอดคงเหลือและแจ้งเตือนเมื่อใกล้ครบวงเงิน', edit ? '<button class="btn btn-primary" id="addB2"><i data-lucide="plus"></i>เพิ่มงบจัดสรร</button>' : '')}</td></tr>`}
    </tbody>${rows.length ? `<tfoot><tr><td colspan="2">รวม (นับเฉพาะงบระดับประเภทเงิน)</td><td class="r num">${fmt(st.budget)}</td><td class="r num">${fmt(st.usedB)}</td><td class="r num">${fmt(st.remain)}</td><td colspan="${edit ? 3 : 2}"></td></tr></tfoot>` : ''}</table></div>
  </div>
  <p class="hint mt-3 flex items-start gap-2"><i data-lucide="info" class="text-brand mt-0.5"></i>กำหนดงบแบบ "ทุกหมวด" เพื่อคุมวงเงินทั้งประเภทเงิน หรือแยกรายหมวดเพื่อคุมละเอียดขึ้น หากประเภทเงินใดมีทั้งสองแบบ ยอดรวมจะใช้งบแบบ "ทุกหมวด"</p>`;
  const add = (pre) => openBudgetModal(null, pre);
  if ($('#addB')) $('#addB').onclick = () => add();
  if ($('#addB2')) $('#addB2').onclick = () => add();
  if ($('#cpB')) $('#cpB').onclick = copyBudgetModal;
  $$('[data-quick]').forEach(b => b.onclick = () => edit && add({ money_type_id: b.dataset.quick }));
  $$('[data-eb]').forEach(b => b.onclick = () => openBudgetModal(S.budgets.find(x => x.id === b.dataset.eb)));
  $$('[data-db]').forEach(b => b.onclick = async () => {
    const x = S.budgets.find(y => y.id === b.dataset.db);
    if (!await confirmDelete(`งบจัดสรร ${(IDX.mt[x.money_type_id] || {}).name} ${fmt(x.amount)} บาท`)) return;
    try { await withLoad('กำลังลบ...', () => api('remove', { table: 'budgets', id: x.id })); dropLocal('budgets', [x.id]); ok('ลบงบจัดสรรแล้ว'); rerender(); } catch (e) { errAlert(e); }
  });
};
function openBudgetModal(rec, pre = {}) {
  const r = rec || Object.assign({ fiscal_year_id: S.fyId, category_id: '' }, pre);
  openModal({
    title: rec ? 'แก้ไขงบจัดสรร' : 'เพิ่มงบจัดสรร', icon: 'wallet-cards',
    body: `<div class="grid gap-4">
      <label class="field"><span>ปีงบประมาณ <em>*</em></span><select name="fiscal_year_id" class="input">${fySelectOpts(r.fiscal_year_id)}</select></label>
      <label class="field"><span>ประเภทเงิน <em>*</em></span><select name="money_type_id" class="input" required>${mtOpts(r.money_type_id)}</select></label>
      <label class="field"><span>หมวดรายจ่าย</span><select name="category_id" class="input">${catOpts(r.category_id, true, 'ทุกหมวด (คุมวงเงินทั้งประเภทเงิน)')}</select></label>
      <label class="field"><span>วงเงินงบจัดสรร (บาท) <em>*</em></span><input name="amount" type="number" step="0.01" min="0" inputmode="decimal" class="input num" value="${r.amount ?? ''}" required placeholder="0.00"></label>
      <label class="field"><span>หมายเหตุ</span><input name="note" class="input" value="${esc(r.note || '')}" placeholder="เช่น ตามแผนปฏิบัติการประจำปี"></label></div>`,
    onSubmit: async fd => { const saved = await api('save', { table: 'budgets', record: Object.assign({ id: rec ? rec.id : undefined }, fd) }); upsert('budgets', saved); ok('บันทึกงบจัดสรรแล้ว'); rerender(); }
  });
}
function copyBudgetModal() {
  const others = S.fiscalYears.filter(f => f.id !== S.fyId && S.budgets.some(b => b.fiscal_year_id === f.id));
  if (!others.length) return Swal.fire({ icon: 'info', title: 'ไม่มีปีงบประมาณอื่นที่มีงบจัดสรร', confirmButtonColor: '#0C7C82' });
  openModal({
    title: 'คัดลอกงบจัดสรร', icon: 'copy', size: 'sm', submitText: 'คัดลอก',
    body: `<div class="grid gap-4"><label class="field"><span>คัดลอกจาก</span><select name="fromId" class="input">${others.map(f => opt(f.id, 'ปีงบประมาณ ' + f.year)).join('')}</select></label>
      <div class="field"><span>ไปยัง</span><div class="input flex items-center bg-brand-50 font-semibold">${esc(fyLabel(S.fyId))}</div></div><p class="hint">คัดลอกเฉพาะรายการที่ยังไม่มีในปีปลายทาง สามารถแก้ไขวงเงินภายหลังได้</p></div>`,
    onSubmit: async fd => { const r = await api('copyBudgets', { fromId: fd.fromId, toId: S.fyId }); await loadAll(); ok(`คัดลอก ${r.copied} รายการแล้ว`); rerender(); }
  });
}

/* =====================================================================
   PAGE: Fiscal years
   ===================================================================== */
PAGES.fiscalYears = function () {
  const admin = isAdmin();
  $('#view').innerHTML = `
  <div class="flex items-center justify-between gap-3 flex-wrap mb-4"><p class="text-muted m-0 text-sm">ปีงบประมาณของไทยเริ่ม 1 ตุลาคม ถึง 30 กันยายนของปีถัดไป</p>${admin ? '<button class="btn btn-primary" id="addFy"><i data-lucide="plus"></i>เพิ่มปีงบประมาณ</button>' : ''}</div>
  <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
  ${S.fiscalYears.map(f => {
    const st = fyStats(f.id);
    return `<div class="card p-5 flex flex-col gap-4 ${f.id === S.fyId ? 'ring-2 ring-brand-2' : ''}">
      <div class="flex items-start justify-between gap-3"><div><div class="text-xs text-muted font-semibold">ปีงบประมาณ</div><div class="text-3xl font-extrabold num text-brand leading-tight">${f.year}</div></div>
      <div class="flex flex-col items-end gap-1">${f.is_active ? '<span class="badge b-ok"><i data-lucide="circle-check"></i>ปีปัจจุบัน</span>' : '<span class="badge b-muted">ปีอื่น</span>'}${f.id === S.fyId ? '<span class="badge b-brand">กำลังแสดง</span>' : ''}</div></div>
      <div class="text-sm text-muted flex items-center gap-2"><i data-lucide="calendar-days"></i>${thaiDate(new Date(f.start_date))} – ${thaiDate(new Date(f.end_date))}</div>
      <div class="grid grid-cols-3 gap-2 text-center"><div class="rounded-xl p-2" style="background:#F5FAFA"><div class="text-[11px] text-muted">รายการ</div><div class="font-bold num">${fmt0(st.count)}</div></div><div class="rounded-xl p-2" style="background:#F5FAFA"><div class="text-[11px] text-muted">ใช้ไป</div><div class="font-bold num">${compact(st.used)}</div></div><div class="rounded-xl p-2" style="background:#F5FAFA"><div class="text-[11px] text-muted">งบจัดสรร</div><div class="font-bold num">${st.budget ? compact(st.budget) : '—'}</div></div></div>
      ${f.note ? `<div class="text-sm">${esc(f.note)}</div>` : ''}
      <div class="flex gap-2 flex-wrap mt-auto">
        <button class="btn btn-soft btn-sm flex-1" data-view-fy="${f.id}"><i data-lucide="eye"></i>ดูข้อมูลปีนี้</button>
        ${admin && !f.is_active ? `<button class="btn btn-light btn-sm" data-act-fy="${f.id}" title="ตั้งเป็นปีปัจจุบัน"><i data-lucide="calendar-check"></i></button>` : ''}
        ${admin ? `<button class="btn btn-light btn-sm" data-edit-fy="${f.id}" title="แก้ไข"><i data-lucide="pencil"></i></button><button class="btn btn-danger btn-sm" data-del-fy="${f.id}" title="ลบ"><i data-lucide="trash-2"></i></button>` : ''}
      </div></div>`;
  }).join('') || `<div class="card sm:col-span-2 xl:col-span-3">${emptyState('calendar-range', 'ยังไม่มีปีงบประมาณ', 'เพิ่มปีงบประมาณเพื่อเริ่มบันทึกรายการ')}</div>`}
  </div>`;
  if ($('#addFy')) $('#addFy').onclick = () => openFyModal();
  $$('[data-view-fy]').forEach(b => b.onclick = () => { S.fyId = b.dataset.viewFy; store('bts_fy', S.fyId); refreshShell(); go('dashboard'); });
  $$('[data-edit-fy]').forEach(b => b.onclick = () => openFyModal(IDX.fy[b.dataset.editFy]));
  $$('[data-act-fy]').forEach(b => b.onclick = async () => {
    const f = IDX.fy[b.dataset.actFy];
    if (!await confirmBox({ title: 'ตั้งเป็นปีปัจจุบัน', html: `ตั้ง <b>ปีงบประมาณ ${f.year}</b> เป็นปีปัจจุบันของระบบ`, icon: 'question' })) return;
    try { await withLoad('กำลังบันทึก...', () => api('setActiveYear', { id: f.id })); await loadAll(); S.fyId = f.id; store('bts_fy', f.id); ok('ตั้งปีปัจจุบันแล้ว'); rerender(); } catch (e) { errAlert(e); }
  });
  $$('[data-del-fy]').forEach(b => b.onclick = async () => {
    const f = IDX.fy[b.dataset.delFy];
    const nT = S.transactions.filter(t => t.fiscal_year_id === f.id).length, nB = S.budgets.filter(x => x.fiscal_year_id === f.id).length;
    if (!await confirmDelete(`ปีงบประมาณ ${f.year}`, nT || nB ? `ข้อมูลในปีนี้จะถูกลบทั้งหมด: รายการเบิกจ่าย ${fmt0(nT)} รายการ และงบจัดสรร ${fmt0(nB)} รายการ` : '')) return;
    try { await withLoad('กำลังลบ...', () => api('remove', { table: 'fiscalYears', id: f.id })); await loadAll(); ok('ลบปีงบประมาณแล้ว'); rerender(); } catch (e) { errAlert(e); }
  });
};
function openFyModal(rec) {
  const next = S.fiscalYears.length ? Math.max(...S.fiscalYears.map(f => f.year)) + 1 : CORE.fiscalOf(new Date().getMonth() + 1, curBE());
  const r = rec || { year: next };
  const d = CORE.fyDates(r.year);
  const m = openModal({
    title: rec ? 'แก้ไขปีงบประมาณ' : 'เพิ่มปีงบประมาณ', icon: 'calendar-range',
    body: `<div class="grid sm:grid-cols-2 gap-4">
      <label class="field"><span>ปีงบประมาณ (พ.ศ.) <em>*</em></span><input name="year" type="number" min="2400" max="2800" class="input num" value="${r.year}" required></label>
      <label class="field"><span>ชื่อ</span><input name="name" class="input" value="${esc(r.name || 'ปีงบประมาณ ' + r.year)}"></label>
      <label class="field"><span>วันเริ่มต้น</span><input name="start_date" type="date" class="input" value="${r.start_date || d.start}"></label>
      <label class="field"><span>วันสิ้นสุด</span><input name="end_date" type="date" class="input" value="${r.end_date || d.end}"></label>
      <label class="field sm:col-span-2"><span>หมายเหตุ</span><input name="note" class="input" value="${esc(r.note || '')}"></label>
      <label class="flex items-center gap-2 sm:col-span-2 cursor-pointer"><input type="checkbox" name="is_active" class="chk" ${r.is_active ? 'checked' : ''}> ตั้งเป็นปีงบประมาณปัจจุบัน</label></div>`,
    onSubmit: async fd => {
      fd.is_active = !!fd.is_active;
      const saved = await api('save', { table: 'fiscalYears', record: Object.assign({ id: rec ? rec.id : undefined }, fd) });
      await loadAll(); if (!rec) { S.fyId = saved.id; store('bts_fy', saved.id); }
      ok(rec ? 'แก้ไขปีงบประมาณแล้ว' : 'เพิ่มปีงบประมาณแล้ว'); rerender();
    }
  });
  const F = m.form;
  F.elements.year.addEventListener('input', e => { const y = Number(e.target.value); if (y > 2400 && y < 2800) { const dd = CORE.fyDates(y); F.elements.start_date.value = dd.start; F.elements.end_date.value = dd.end; F.elements.name.value = 'ปีงบประมาณ ' + y; } });
}

/* =====================================================================
   PAGE: Money types / Categories (master data)
   ===================================================================== */
function masterPage(table) {
  const label = table === 'moneyTypes' ? 'ประเภทเงิน' : 'หมวดรายจ่าย', field = table === 'moneyTypes' ? 'money_type_id' : 'category_id';
  const admin = isAdmin(), fy = S.fyId, lv = txFY(fy).filter(live), total = sum(lv, 'amount');
  const list = S[table];
  $('#view').innerHTML = `
  <div class="card overflow-hidden">
    <div class="card-h pb-3"><div class="card-t"><i data-lucide="${table === 'moneyTypes' ? 'banknote' : 'tags'}"></i>${label}ทั้งหมด <span class="badge b-brand num">${list.length}</span></div>${admin ? `<button class="btn btn-primary btn-sm" id="addM"><i data-lucide="plus"></i>เพิ่ม${label}</button>` : ''}</div>
    <div class="table-wrap"><table class="tbl"><thead><tr><th style="width:60px">ลำดับ</th><th>ชื่อ${label}</th><th>รหัส</th><th class="r">รายการ (${esc(fyLabel(fy))})</th><th class="r">ยอดเบิกจ่าย</th><th style="min-width:140px">สัดส่วน</th><th>สถานะ</th>${admin ? '<th class="r">จัดการ</th>' : ''}</tr></thead><tbody>
    ${list.map(m => { const its = lv.filter(t => t[field] === m.id), s = sum(its, 'amount'), p = pct(s, total); return `<tr><td class="num text-muted">${m.sort}</td><td><div class="flex items-center gap-3"><span class="w-3 h-8 rounded-full" style="background:${m.color}"></span><div><div class="font-semibold">${esc(m.name)}</div>${m.note ? `<div class="text-xs text-muted">${esc(m.note)}</div>` : ''}</div></div></td><td class="text-muted">${esc(m.code || '-')}</td><td class="r num">${fmt0(its.length)}</td><td class="r num font-semibold">${fmt(s)}</td><td><div class="flex items-center gap-2"><div class="bar flex-1"><i style="width:${p}%;background:${m.color}"></i></div><span class="text-xs num text-muted w-12 text-right">${p.toFixed(1)}%</span></div></td><td>${m.active ? '<span class="badge b-ok"><span class="bd"></span>ใช้งาน</span>' : '<span class="badge b-muted"><span class="bd"></span>ปิดใช้งาน</span>'}</td>${admin ? `<td class="r whitespace-nowrap"><button class="act" data-em="${m.id}"><i data-lucide="pencil"></i></button><button class="act del" data-dm="${m.id}"><i data-lucide="trash-2"></i></button></td>` : ''}</tr>`; }).join('') || `<tr><td colspan="8">${emptyState('tags', 'ยังไม่มีข้อมูล')}</td></tr>`}
    </tbody></table></div></div>
  <div class="card mt-4 min-w-0"><div class="card-h"><div class="card-t"><i data-lucide="chart-pie"></i>สัดส่วนยอดเบิกจ่ายตาม${label}</div><span class="badge b-brand">${esc(fyLabel(fy))}</span></div>${chartBox('masterChart')}</div>`;
  if ($('#addM')) $('#addM').onclick = () => openMasterModal(table);
  $$('[data-em]').forEach(b => b.onclick = () => openMasterModal(table, list.find(x => x.id === b.dataset.em)));
  $$('[data-dm]').forEach(b => b.onclick = async () => {
    const m = list.find(x => x.id === b.dataset.dm);
    if (!await confirmDelete(`${label} "${m.name}"`)) return;
    try { await withLoad('กำลังลบ...', () => api('remove', { table, id: m.id })); dropLocal(table, [m.id]); ok('ลบแล้ว'); rerender(); } catch (e) { errAlert(e); }
  });
  mountCharts({ masterChart: () => table === 'moneyTypes' ? cfgDoughnut(fy) : cfgDoughnut(fy, 'category_id', IDX.cat, S.categories) });
}
PAGES.moneyTypes = () => masterPage('moneyTypes');
PAGES.categories = () => masterPage('categories');
function openMasterModal(table, rec) {
  const label = table === 'moneyTypes' ? 'ประเภทเงิน' : 'หมวดรายจ่าย';
  const r = rec || { color: PALETTE[S[table].length % PALETTE.length], active: true };
  const m = openModal({
    title: (rec ? 'แก้ไข' : 'เพิ่ม') + label, icon: table === 'moneyTypes' ? 'banknote' : 'tags',
    body: `<div class="grid sm:grid-cols-2 gap-4">
      <label class="field sm:col-span-2"><span>ชื่อ${label} <em>*</em></span><input name="name" class="input" value="${esc(r.name || '')}" required></label>
      <label class="field"><span>รหัส</span><input name="code" class="input" value="${esc(r.code || '')}" placeholder="ไม่บังคับ"></label>
      <label class="field"><span>ลำดับการแสดง</span><input name="sort" type="number" class="input num" value="${r.sort || ''}" placeholder="อัตโนมัติ"></label>
      <div class="field sm:col-span-2"><span>สีประจำ (ใช้ในกราฟและป้าย)</span><div class="flex items-center gap-2 flex-wrap" id="sw">${PALETTE.map(c => `<button type="button" class="swatch ${c === r.color ? 'on' : ''}" style="background:${c}" data-c="${c}" aria-label="${c}"></button>`).join('')}<input type="color" name="color" value="${r.color}" class="w-10 h-9 rounded-lg border border-line cursor-pointer" title="เลือกสีเอง"></div><div id="swPrev" class="mt-1"></div></div>
      <label class="field sm:col-span-2"><span>หมายเหตุ</span><input name="note" class="input" value="${esc(r.note || '')}"></label>
      <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="active" class="chk" ${r.active ? 'checked' : ''}> เปิดใช้งาน</label></div>`,
    onSubmit: async fd => { fd.active = !!fd.active; const saved = await api('save', { table, record: Object.assign({ id: rec ? rec.id : undefined }, fd) }); upsert(table, saved); ok('บันทึกแล้ว'); rerender(); }
  });
  const F = m.form, prev = () => { $('#swPrev', F).innerHTML = cBadge(F.elements.name.value || 'ตัวอย่าง', F.elements.color.value); };
  $$('[data-c]', F).forEach(b => b.onclick = () => { F.elements.color.value = b.dataset.c; $$('[data-c]', F).forEach(x => x.classList.toggle('on', x === b)); prev(); });
  F.elements.color.oninput = () => { $$('[data-c]', F).forEach(x => x.classList.remove('on')); prev(); };
  F.elements.name.oninput = prev; prev();
}

/* =====================================================================
   PAGE: Reports
   ===================================================================== */
const REPORTS = [
  { id: 'money', icon: 'banknote', title: 'สรุปการใช้งบประมาณตามประเภทเงิน', desc: 'งบจัดสรร เบิกจ่าย คงเหลือ ร้อยละ' },
  { id: 'category', icon: 'tags', title: 'สรุปรายจ่ายตามหมวดรายจ่าย', desc: 'ยอดรวมและสัดส่วนแต่ละหมวด' },
  { id: 'cross', icon: 'layout-grid', title: 'สรุปหมวดรายจ่ายจำแนกตามประเภทเงิน', desc: 'ตารางไขว้ หมวด × ประเภทเงิน' },
  { id: 'monthly', icon: 'calendar-days', title: 'สรุปรายจ่ายรายเดือน', desc: 'รายเดือน ต.ค. – ก.ย. และยอดสะสม' },
  { id: 'budget', icon: 'wallet-cards', title: 'รายงานติดตามงบจัดสรร', desc: 'งบที่จัดสรรเทียบกับการใช้จริง' },
  { id: 'register', icon: 'list', title: 'ทะเบียนคุมการเบิกจ่าย', desc: 'รายละเอียดทุกรายการตามเงื่อนไข' }
];
function repTx() {
  const R = S.rep, i1 = R.m1 ? FY_MONTHS.indexOf(Number(R.m1)) : 0, i2 = R.m2 ? FY_MONTHS.indexOf(Number(R.m2)) : 11;
  return txFY().filter(t => live(t) && (!R.mt || t.money_type_id === R.mt) && (!R.cat || t.category_id === R.cat)).filter(t => { const i = FY_MONTHS.indexOf(t.month); return i >= i1 && i <= i2; });
}
function buildReport() {
  const R = S.rep, fy = S.fyId, tx = repTx(), total = sum(tx, 'amount');
  const mts = S.moneyTypes.filter(m => (!R.mt || m.id === R.mt) && (m.active || tx.some(t => t.money_type_id === m.id)));
  const cats = S.categories.filter(c => (!R.cat || c.id === R.cat) && (c.active || tx.some(t => t.category_id === c.id)));
  const td = (v, c = '') => `<td class="${c}">${v}</td>`;
  let head = [], rows = [], foot = null, chart = null, title = REPORTS.find(x => x.id === R.type).title;
  if (R.type === 'money') {
    head = ['ลำดับ', 'ประเภทเงิน', 'งบจัดสรร', 'เบิกจ่ายแล้ว', 'รอเบิกจ่าย', 'รวมใช้ไป', 'คงเหลือ', 'ร้อยละ', 'จำนวนรายการ'];
    let T = [0, 0, 0, 0, 0, 0];
    mts.forEach((m, i) => { const x = tx.filter(t => t.money_type_id === m.id), b = mtBudget(fy, m.id), pd = sum(x.filter(t => t.status === 'จ่ายแล้ว'), 'amount'), pn = sum(x.filter(t => t.status === 'รอเบิกจ่าย'), 'amount'), u = pd + pn; rows.push([i + 1, m.name, b, pd, pn, u, b ? b - u : null, b ? pct(u, b) : null, x.length]); T = [T[0] + b, T[1] + pd, T[2] + pn, T[3] + u, T[4] + b - u, T[5] + x.length]; });
    foot = ['', 'รวมทั้งสิ้น', T[0], T[1], T[2], T[3], T[0] ? T[4] : null, T[0] ? pct(T[3], T[0]) : null, T[5]];
    chart = totalBudget(fy) > 0 ? cfgBudgetVsUsed(fy) : cfgDoughnut(fy);
  } else if (R.type === 'category') {
    head = ['ลำดับ', 'หมวดรายจ่าย', 'จำนวนรายการ', 'จำนวนเงิน', 'ร้อยละของทั้งหมด'];
    cats.forEach((c, i) => { const x = tx.filter(t => t.category_id === c.id), s = sum(x, 'amount'); rows.push([i + 1, c.name, x.length, s, pct(s, total)]); });
    foot = ['', 'รวมทั้งสิ้น', tx.length, total, total ? 100 : 0];
    const items = cats.map(c => ({ c, v: sum(tx.filter(t => t.category_id === c.id), 'amount') })).filter(x => x.v > 0).sort((a, b) => b.v - a.v);
    chart = items.length ? { type: 'bar', data: { labels: items.map(x => x.c.name), datasets: [{ data: items.map(x => x.v), backgroundColor: items.map(x => x.c.color), borderRadius: 6, datalabels: dlBar(true) }] }, options: { indexAxis: 'y', layout: { padding: { right: 60 } }, plugins: { legend: { display: false } }, scales: { x: { grid: GRID, ticks: { callback: v => compact(v) } }, y: { grid: { display: false } } } } } : null;
  } else if (R.type === 'cross') {
    head = ['หมวดรายจ่าย', ...mts.map(m => m.name), 'รวม'];
    cats.forEach(c => { const vals = mts.map(m => sum(tx.filter(t => t.category_id === c.id && t.money_type_id === m.id), 'amount')); rows.push([c.name, ...vals, sum(vals)]); });
    foot = ['รวมทั้งสิ้น', ...mts.map(m => sum(tx.filter(t => t.money_type_id === m.id), 'amount')), total];
    chart = tx.length ? { type: 'bar', data: { labels: cats.map(c => c.name), datasets: mts.map(m => ({ label: m.name, data: cats.map(c => sum(tx.filter(t => t.category_id === c.id && t.money_type_id === m.id), 'amount')), backgroundColor: m.color, borderRadius: 4 })) }, options: { plugins: { legend: { position: 'bottom' } }, scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, grid: GRID, ticks: { callback: v => compact(v) } } } } } : null;
  } else if (R.type === 'monthly') {
    head = ['เดือน', ...mts.map(m => m.name), 'รวม', 'ยอดสะสม'];
    let cum = 0;
    FY_MONTHS.forEach(mo => { const y = mo >= 10 ? fyOf(fy).year - 1 : fyOf(fy).year; const vals = mts.map(m => sum(tx.filter(t => t.month === mo && t.money_type_id === m.id), 'amount')); const s = sum(vals); cum += s; rows.push([`${MONTHS[mo]} ${y}`, ...vals, s, cum]); });
    foot = ['รวมทั้งสิ้น', ...mts.map(m => sum(tx.filter(t => t.money_type_id === m.id), 'amount')), total, ''];
    const tot = FY_MONTHS.map(mo => sum(tx.filter(t => t.month === mo), 'amount'));
    chart = tx.length ? { type: 'bar', data: { labels: FY_MONTHS.map(m => MONTHS_S[m]), datasets: mts.map((m, i) => ({ label: m.name, data: FY_MONTHS.map(mo => sum(tx.filter(t => t.month === mo && t.money_type_id === m.id), 'amount')), backgroundColor: m.color, borderRadius: 4, datalabels: i === mts.length - 1 ? { display: c => tot[c.dataIndex] > 0, anchor: 'end', align: 'end', color: '#12353A', font: { weight: 700, size: 11 }, formatter: (v, c) => compact(tot[c.dataIndex]) } : { display: false } })) }, options: { layout: { padding: { top: 20 } }, plugins: { legend: { position: 'bottom' } }, scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, grid: GRID, ticks: { callback: v => compact(v) } } } } } : null;
  } else if (R.type === 'budget') {
    head = ['ลำดับ', 'ประเภทเงิน', 'หมวดรายจ่าย', 'งบจัดสรร', 'ใช้ไป', 'คงเหลือ', 'ร้อยละ', 'สถานะ'];
    const w = Number(S.settings.warn_percent || 80);
    S.budgets.filter(b => b.fiscal_year_id === fy && (!R.mt || b.money_type_id === R.mt) && (!R.cat || !b.category_id || b.category_id === R.cat)).sort((a, b) => ((IDX.mt[a.money_type_id] || {}).sort - (IDX.mt[b.money_type_id] || {}).sort)).forEach((b, i) => {
      const u = sum(tx.filter(t => t.money_type_id === b.money_type_id && (!b.category_id || t.category_id === b.category_id)), 'amount'), p = pct(u, b.amount);
      rows.push([i + 1, (IDX.mt[b.money_type_id] || {}).name, b.category_id ? (IDX.cat[b.category_id] || {}).name : 'ทุกหมวด', b.amount, u, b.amount - u, p, p >= 100 ? 'เกินวงเงิน' : p >= w ? 'ใกล้ครบวงเงิน' : 'ปกติ']);
    });
    chart = cfgBudgetVsUsed(fy);
  } else {
    head = ['ลำดับ', 'เดือน', 'เลขที่', 'รายการ', 'ประเภทเงิน', 'หมวดรายจ่าย', 'จำนวนเงิน', 'ยอดสะสม'];
    let cum = 0;
    [...tx].sort((a, b) => (FY_MONTHS.indexOf(a.month) - FY_MONTHS.indexOf(b.month)) || String(a.voucher_no).localeCompare(String(b.voucher_no), 'th', { numeric: true })).forEach((t, i) => { cum += t.amount; rows.push([i + 1, `${MONTHS_S[t.month]} ${String(t.year).slice(-2)}`, t.voucher_no, t.description, (IDX.mt[t.money_type_id] || {}).name, (IDX.cat[t.category_id] || {}).name, t.amount, cum]); });
    foot = ['', '', '', 'รวมทั้งสิ้น ' + fmt0(tx.length) + ' รายการ', '', '', total, ''];
  }
  const isMoney = (h) => /งบ|เบิก|ใช้ไป|คงเหลือ|จำนวนเงิน|รวม|สะสม|รอเบิก/.test(h) && !/จำนวนรายการ|ร้อยละ/.test(h);
  const moneyCol = head.map((h, i) => R.type === 'cross' || R.type === 'monthly' ? i > 0 : isMoney(h));
  const pctCol = head.map(h => /ร้อยละ/.test(h));
  const cell = (v, i) => v === null ? td('—', 'c') : typeof v === 'number' ? (pctCol[i] ? td(v.toFixed(2), 'r') : moneyCol[i] ? td(v === 0 && (R.type === 'cross' || R.type === 'monthly') ? '-' : fmt(v), 'r') : td(fmt0(v), 'c')) : td(esc(v), (i === 0 && /ลำดับ/.test(head[0]) ? 'c ' : '') + (String(v).length <= 30 ? 'nw' : ''));
  const html = `<table><thead><tr>${head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(cell).join('')}</tr>`).join('') || `<tr><td colspan="${head.length}" class="c">ไม่พบข้อมูลตามเงื่อนไข</td></tr>`}</tbody>${foot ? `<tfoot><tr class="tot">${foot.map(cell).join('')}</tr></tfoot>` : ''}</table>`;
  const f = [];
  if (R.mt) f.push('ประเภทเงิน: ' + IDX.mt[R.mt].name);
  if (R.cat) f.push('หมวด: ' + IDX.cat[R.cat].name);
  if (R.m1 || R.m2) f.push(`ช่วงเดือน: ${MONTHS[R.m1 || 10]} – ${MONTHS[R.m2 || 9]}`);
  return { title, subtitle: `${fyLabel(fy)} (${thaiDate(new Date(fyOf(fy).start_date))} – ${thaiDate(new Date(fyOf(fy).end_date))})${f.length ? ' · ' + f.join(' · ') : ''}`, head, rows, foot, html, chart };
}
async function renderPaper() {
  const R = S.rep, s = S.settings, rp = reporter(), rep = buildReport();
  const paper = $('#paper'); if (!paper) return;
  paper.className = 'paper' + (R.orient === 'landscape' ? ' landscape' : '');
  paper.innerHTML = `<div class="flex items-center justify-center gap-3 py-16 text-muted"><div class="spin"></div>กำลังสร้างรายงาน...</div>`;
  const img = R.chart && rep.chart ? await chartImage(rep.chart, R.orient === 'landscape' ? 1100 : 900, 340) : '';
  paper.innerHTML = `
    <div class="ph">${s.logo ? `<img src="${s.logo}" alt="">` : ''}<div style="flex:1"><h2>${esc(s.school_name)}</h2><div style="color:#456">${esc(s.affiliation)}${s.address ? ' · ' + esc(s.address) : ''}</div></div><div style="text-align:right;font-size:12px;color:#456">${esc(s.system_name)}<br>${esc(fyLabel(S.fyId))}</div></div>
    <div class="rt"><h3>${esc(rep.title)}</h3><div style="color:#456;font-size:13px">${esc(rep.subtitle)}</div></div>
    ${rep.html}
    ${img ? `<img class="chart-img" src="${img}" alt="กราฟประกอบรายงาน">` : ''}
    ${R.sign ? `<div class="sig"><div><div class="ln">ลงชื่อ ........................................ ผู้รายงาน</div><div>( ${esc(rp.name)} )</div><div>${esc(rp.position || 'ครู')}</div></div><div><div class="ln">ลงชื่อ ........................................</div><div>( ${esc(s.director_name || '........................................')} )</div><div>${esc(s.director_position || 'ผู้อำนวยการโรงเรียน')}</div></div></div>` : ''}
    <div class="pfoot"><span>${esc(s.system_name)} · ผู้รายงาน ${esc(rp.name)}</span><span>พิมพ์เมื่อ ${thaiDate()} ${new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.</span></div>`;
  paper._rep = rep;
}
PAGES.reports = function () {
  const R = S.rep;
  $('#view').innerHTML = `
  <div class="grid xl:grid-cols-[340px_1fr] gap-4 items-start">
    <div class="card p-4 flex flex-col gap-4 xl:sticky" style="top:84px">
      <div class="card-t"><i data-lucide="file-chart-column"></i>เลือกรายงาน</div>
      <div class="flex flex-col gap-2" id="repList">${REPORTS.map(r => `<button type="button" class="rep-opt ${R.type === r.id ? 'on' : ''}" data-rep="${r.id}"><i data-lucide="${r.icon}"></i><span class="text-left"><span class="block font-semibold text-sm">${r.title}</span><span class="block text-xs text-muted">${r.desc}</span></span></button>`).join('')}</div>
      <div class="grid grid-cols-2 gap-2">
        <label class="field col-span-2"><span>ประเภทเงิน</span><select id="rMt" class="input">${mtOpts(R.mt, true)}</select></label>
        <label class="field col-span-2"><span>หมวดรายจ่าย</span><select id="rCat" class="input">${catOpts(R.cat, true)}</select></label>
        <label class="field"><span>ตั้งแต่เดือน</span><select id="rM1" class="input">${opt('', 'ต.ค.', R.m1)}${FY_MONTHS.map(m => opt(m, MONTHS_S[m], R.m1)).join('')}</select></label>
        <label class="field"><span>ถึงเดือน</span><select id="rM2" class="input">${opt('', 'ก.ย.', R.m2)}${FY_MONTHS.map(m => opt(m, MONTHS_S[m], R.m2)).join('')}</select></label>
      </div>
      <div class="flex flex-col gap-2">
        <div class="seg w-full"><button type="button" class="flex-1 ${R.orient === 'portrait' ? 'on' : ''}" data-or="portrait">แนวตั้ง</button><button type="button" class="flex-1 ${R.orient === 'landscape' ? 'on' : ''}" data-or="landscape">แนวนอน</button></div>
        <label class="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" id="rChart" class="chk" ${R.chart ? 'checked' : ''}> แสดงกราฟประกอบ</label>
        <label class="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" id="rSign" class="chk" ${R.sign ? 'checked' : ''}> แสดงช่องลงนาม</label>
      </div>
      <div class="grid grid-cols-2 gap-2"><button class="btn btn-primary" id="rPrint"><i data-lucide="printer"></i>พิมพ์</button><button class="btn btn-light" id="rXls"><i data-lucide="file-down"></i>Excel</button></div>
    </div>
    <div class="min-w-0"><div class="rounded-3xl p-3 sm:p-6 overflow-x-auto" style="background:#E6EFEF"><div id="paper" class="paper"></div></div></div>
  </div>`;
  const upd = () => renderPaper();
  $$('[data-rep]').forEach(b => b.onclick = () => { R.type = b.dataset.rep; $$('[data-rep]').forEach(x => x.classList.toggle('on', x === b)); if (['cross', 'monthly', 'register'].includes(R.type) && S.moneyTypes.length > 3) { R.orient = 'landscape'; $$('[data-or]').forEach(x => x.classList.toggle('on', x.dataset.or === 'landscape')); } upd(); });
  $$('[data-or]').forEach(b => b.onclick = () => { R.orient = b.dataset.or; $$('[data-or]').forEach(x => x.classList.toggle('on', x === b)); upd(); });
  $('#rMt').onchange = e => { R.mt = e.target.value; upd(); };
  $('#rCat').onchange = e => { R.cat = e.target.value; upd(); };
  $('#rM1').onchange = e => { R.m1 = e.target.value; upd(); };
  $('#rM2').onchange = e => { R.m2 = e.target.value; upd(); };
  $('#rChart').onchange = e => { R.chart = e.target.checked; upd(); };
  $('#rSign').onchange = e => { R.sign = e.target.checked; upd(); };
  $('#rPrint').onclick = printReport;
  $('#rXls').onclick = exportReport;
  upd();
};
function printReport() {
  const p = $('#paper'); if (!p) return;
  $('#pageStyle').textContent = `@page{size:A4 ${S.rep.orient};margin:12mm}`;
  $('#printArea').innerHTML = p.outerHTML;
  loading(true, 'กำลังเตรียมพิมพ์...');
  setTimeout(() => { loading(false); window.print(); }, 350);
}
window.addEventListener('afterprint', () => { $('#printArea').innerHTML = ''; });
function exportReport() {
  if (!needXLSX()) return;
  const p = $('#paper'); const rep = p && p._rep; if (!rep) return;
  const s = S.settings;
  const aoa = [[s.school_name], [s.affiliation], [rep.title], [rep.subtitle], [], rep.head, ...rep.rows.map(r => r.map(v => v === null ? '' : typeof v === 'number' ? Math.round(v * 100) / 100 : v))];
  if (rep.foot) aoa.push(rep.foot.map(v => v === null ? '' : typeof v === 'number' ? Math.round(v * 100) / 100 : v));
  aoa.push([], ['ผู้รายงาน: ' + reporter().name, '', 'พิมพ์เมื่อ ' + thaiDate()]);
  const wb = XLSX.utils.book_new(), ws = XLSX.utils.aoa_to_sheet(aoa);
  ws['!cols'] = rep.head.map((h, i) => ({ wch: /รายการ/.test(h) && S.rep.type === 'register' ? 60 : i === 0 ? 18 : 16 }));
  XLSX.utils.book_append_sheet(wb, ws, 'รายงาน');
  XLSX.writeFile(wb, `${rep.title}_ปีงบ${fyOf(S.fyId).year}.xlsx`);
  ok('ส่งออกรายงานแล้ว');
}

/* =====================================================================
   PAGE: Import / Export
   ===================================================================== */
const ALIASES = {
  money_type: ['money_type', 'ประเภทเงิน', 'ประเภท', 'แหล่งเงิน'], expense_category: ['expense_category', 'หมวดรายจ่าย', 'หมวด', 'category'],
  voucher_no: ['voucher_no', 'เลขที่', 'เลขที่ บจ.', 'เลขที่บจ', 'เลขที่เอกสาร', 'เลขที่ใบเบิก'], description: ['description', 'รายการ', 'รายละเอียด'],
  amount: ['amount', 'จำนวนเงิน', 'จำนวน', 'บาท'], month: ['month', 'เดือน'], year: ['year', 'ปี', 'ปี พ.ศ.', 'พ.ศ.'], fiscal_year: ['fiscal_year', 'ปีงบประมาณ', 'ปีงบ'],
  doc_date: ['doc_date', 'วันที่', 'วันที่เอกสาร'], status: ['status', 'สถานะ'], note: ['note', 'หมายเหตุ'], created_at: ['created_at', 'บันทึกเมื่อ']
};
let IMPORT = null;
PAGES.dataio = function () {
  const admin = isAdmin();
  $('#view').innerHTML = `
  <div class="grid xl:grid-cols-3 gap-4 items-start">
    <div class="card xl:col-span-2 min-w-0 overflow-hidden">
      <div class="card-h"><div class="card-t"><i data-lucide="upload"></i>นำเข้ารายการเบิกจ่ายจาก Excel</div><button class="btn btn-soft btn-sm" id="tpl"><i data-lucide="download"></i>แม่แบบ</button></div>
      <div class="p-4 sm:p-5">
        <label class="drop block" id="drop"><input type="file" id="xf" accept=".xlsx,.xls,.csv" hidden>
          <div class="empty" style="padding:8px"><div class="ei"><i data-lucide="cloud-upload"></i></div><div class="font-bold text-ink">ลากไฟล์มาวาง หรือคลิกเพื่อเลือกไฟล์</div><div class="text-sm mt-1">รองรับ .xlsx .xls .csv · คอลัมน์ ประเภทเงิน, หมวดรายจ่าย, เลขที่, รายการ, จำนวนเงิน, เดือน, ปี (รองรับหัวคอลัมน์แบบไฟล์เดิม)</div></div></label>
        <div id="impPrev" class="mt-4"></div>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <div class="card p-5 flex flex-col gap-3"><div class="card-t"><i data-lucide="file-spreadsheet"></i>ส่งออกข้อมูล</div>
        <p class="text-sm text-muted m-0">ส่งออกเป็นไฟล์ Excel แยกข้อมูลแต่ละชีต (รายการเบิกจ่าย งบจัดสรร ปีงบประมาณ ประเภทเงิน หมวดรายจ่าย และสรุป)</p>
        <button class="btn btn-primary" id="expAll"><i data-lucide="file-down"></i>ส่งออกทั้งหมด (.xlsx)</button></div>
      ${admin ? `<div class="card p-5 flex flex-col gap-3"><div class="card-t"><i data-lucide="database"></i>สำรอง / กู้คืนข้อมูล</div>
        <p class="text-sm text-muted m-0">ไฟล์สำรอง (.json) เก็บข้อมูลทุกส่วนรวมถึงผู้ใช้และการตั้งค่า ใช้ย้ายระบบหรือกู้คืนเมื่อข้อมูลเสียหาย</p>
        <div class="grid grid-cols-2 gap-2"><button class="btn btn-light" id="bak"><i data-lucide="archive"></i>สำรอง</button><label class="btn btn-light cursor-pointer"><i data-lucide="rotate-ccw"></i>กู้คืน<input type="file" id="rst" accept=".json" hidden></label></div>
        </div>` : ''}
      <div class="card p-5 text-sm flex flex-col gap-2"><div class="card-t"><i data-lucide="info"></i>คำแนะนำ</div>
        <p class="m-0 text-muted">ระบบตรวจหาประเภทเงิน หมวดรายจ่าย และปีงบประมาณจากไฟล์ หากยังไม่มีจะสร้างให้อัตโนมัติ ปีงบประมาณคำนวณจากเดือน/ปี (ต.ค.–ธ.ค. นับเป็นปีงบถัดไป)</p>
        <p class="m-0 text-muted">รายการที่ประเภทเงิน เลขที่ จำนวนเงิน และรายละเอียดตรงกับข้อมูลเดิม จะถูกทำเครื่องหมายว่าซ้ำ และข้ามได้</p></div>
    </div>
  </div>`;
  const drop = $('#drop'), xf = $('#xf');
  ['dragover', 'dragenter'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove('over'); }));
  drop.addEventListener('drop', e => { const f = e.dataTransfer.files[0]; if (f) readImport(f); });
  xf.onchange = e => { const f = e.target.files[0]; if (f) readImport(f); xf.value = ''; };
  $('#tpl').onclick = () => {
    if (!needXLSX()) return;
    const wb = XLSX.utils.book_new(), ws = XLSX.utils.aoa_to_sheet([['ประเภทเงิน', 'หมวดรายจ่าย', 'เลขที่', 'รายการ', 'จำนวนเงิน', 'เดือน', 'ปี', 'สถานะ', 'หมายเหตุ'], ['เงินอุดหนุน', 'ค่าใช้สอย', 'บจ1/69', 'ค่าจ้างเหมาบริการรักษาความปลอดภัย เดือนตุลาคม 2568', 31000, 10, 2568, 'จ่ายแล้ว', ''], ['เงินรายได้', 'ค่าวัสดุ', 'บจ2/69', 'ค่าวัสดุสำนักงาน', 4500, 11, 2568, 'รอเบิกจ่าย', '']]);
    ws['!cols'] = [{ wch: 22 }, { wch: 16 }, { wch: 10 }, { wch: 50 }, { wch: 12 }, { wch: 7 }, { wch: 7 }, { wch: 11 }, { wch: 18 }];
    XLSX.utils.book_append_sheet(wb, ws, 'รายการเบิกจ่าย'); XLSX.writeFile(wb, 'แม่แบบนำเข้ารายการเบิกจ่าย.xlsx');
  };
  $('#expAll').onclick = exportAll;
  if ($('#bak')) $('#bak').onclick = async () => { try { const d = await withLoad('กำลังสำรองข้อมูล...', () => api('backup')); downloadBlob(JSON.stringify(d, null, 1), `backup_${(S.settings.school_name || 'school').replace(/\s+/g, '')}_${new Date().toISOString().slice(0, 10)}.json`, 'application/json'); ok('สำรองข้อมูลแล้ว'); } catch (e) { errAlert(e); } };
  if ($('#rst')) $('#rst').onchange = e => {
    const f = e.target.files[0]; if (!f) return; e.target.value = '';
    const rd = new FileReader();
    rd.onload = async () => {
      let data; try { data = JSON.parse(rd.result); } catch (er) { return errAlert(new Error('ไฟล์ไม่ใช่ไฟล์สำรองข้อมูลที่ถูกต้อง')); }
      if (!await confirmBox({ title: 'กู้คืนข้อมูล', html: `ข้อมูลปัจจุบันทั้งหมดจะถูกแทนที่ด้วยไฟล์สำรอง<br><b>${esc(data.exported_at ? thaiDateTime(data.exported_at) : '')}</b> · รายการ ${fmt0((data.transactions || []).length)} รายการ`, confirm: 'กู้คืน', danger: true })) return;
      try { await withLoad('กำลังกู้คืนข้อมูล...', () => api('restore', { data })); await loadAll(); ok('กู้คืนข้อมูลแล้ว'); rerender(); } catch (er) { errAlert(er); }
    };
    rd.readAsText(f);
  };
  if (IMPORT) renderImportPreview();
};
function readImport(file) {
  if (!needXLSX()) return;
  loading(true, 'กำลังอ่านไฟล์...');
  const rd = new FileReader();
  rd.onload = () => {
    try {
      const wb = XLSX.read(new Uint8Array(rd.result), { type: 'array', cellDates: true });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const raw = XLSX.utils.sheet_to_json(ws, { defval: '', raw: true });
      if (!raw.length) throw new Error('ไม่พบข้อมูลในไฟล์');
      const keys = Object.keys(raw[0]);
      const map = {};
      Object.entries(ALIASES).forEach(([k, al]) => { const hit = keys.find(h => al.some(a => String(h).trim().toLowerCase() === a.toLowerCase())); if (hit) map[k] = hit; });
      ['money_type', 'expense_category', 'description', 'amount'].forEach(k => { if (!map[k]) throw new Error(`ไม่พบคอลัมน์ "${ALIASES[k][1]}" ในไฟล์`); });
      if (!map.doc_date && (!map.month || !map.year)) throw new Error('ไม่พบคอลัมน์ "เดือน" และ "ปี" (หรือ "วันที่") ในไฟล์');
      const existing = new Set(S.transactions.map(t => [(IDX.mt[t.money_type_id] || {}).name, String(t.voucher_no).replace(/\s|\./g, ''), Number(t.amount).toFixed(2), String(t.description).trim()].join('|')));
      const seen = {};
      const rows = raw.map((r, i) => {
        const o = { _line: i + 2 };
        Object.entries(map).forEach(([k, h]) => o[k] = r[h]);
        if (o.doc_date instanceof Date) { const d = o.doc_date; o.doc_date = `${d.getFullYear() > 2400 ? d.getFullYear() - 543 : d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
        if (o.doc_date && /^\d{4}-\d{2}-\d{2}$/.test(o.doc_date) && !o.month) { o.month = Number(o.doc_date.slice(5, 7)); o.year = Number(o.doc_date.slice(0, 4)) + 543; }
        if (typeof o.month === 'string' && isNaN(Number(o.month))) { const mi = MONTHS.findIndex(m => m && (m === o.month.trim() || MONTHS_S[MONTHS.indexOf(m)] === o.month.trim())); o.month = mi > 0 ? mi : ''; }
        o.amount = Number(String(o.amount).replace(/,/g, '')) || 0; o.month = Number(o.month) || 0; o.year = Number(o.year) || 0; if (o.year && o.year < 2400) o.year += 543;
        if (o.created_at instanceof Date) o.created_at = o.created_at.toISOString();
        ['money_type', 'expense_category', 'voucher_no', 'description', 'status', 'note'].forEach(k => o[k] = String(o[k] ?? '').trim());
        const key = [o.money_type, o.voucher_no.replace(/\s|\./g, ''), o.amount.toFixed(2), o.description].join('|');
        o._dup = existing.has(key); o._dupFile = !!seen[key]; seen[key] = 1;
        o._err = !o.money_type ? 'ไม่มีประเภทเงิน' : !o.expense_category ? 'ไม่มีหมวดรายจ่าย' : !(o.amount > 0) ? 'จำนวนเงินไม่ถูกต้อง' : !(o.month >= 1 && o.month <= 12) ? 'เดือนไม่ถูกต้อง' : !o.year ? 'ไม่มีปี' : '';
        return o;
      });
      IMPORT = { name: file.name, rows, skipDup: true };
      renderImportPreview();
    } catch (e) { errAlert(e); }
    finally { loading(false); }
  };
  rd.onerror = () => { loading(false); errAlert(new Error('อ่านไฟล์ไม่สำเร็จ')); };
  rd.readAsArrayBuffer(file);
}
function renderImportPreview() {
  const I = IMPORT, el = $('#impPrev'); if (!el || !I) return;
  const valid = I.rows.filter(r => !r._err), dup = valid.filter(r => r._dup), send = valid.filter(r => !(I.skipDup && r._dup));
  const newMt = [...new Set(valid.map(r => r.money_type))].filter(n => !S.moneyTypes.some(m => m.name === n));
  const newCat = [...new Set(valid.map(r => r.expense_category))].filter(n => !S.categories.some(m => m.name === n));
  const fyYears = [...new Set(valid.map(r => CORE.fiscalOf(r.month, r.year)))].sort();
  el.innerHTML = `
    <div class="flex items-center gap-2 font-semibold mb-3"><i data-lucide="file-spreadsheet" class="text-brand"></i>${esc(I.name)} <button class="act ml-auto" id="impClear" title="ยกเลิก"><i data-lucide="x"></i></button></div>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
      <div class="rounded-xl p-3" style="background:#F5FAFA"><div class="text-xs text-muted">แถวทั้งหมด</div><div class="text-xl font-bold num">${fmt0(I.rows.length)}</div></div>
      <div class="rounded-xl p-3" style="background:#E3F4F1"><div class="text-xs text-muted">จะนำเข้า</div><div class="text-xl font-bold num text-brand">${fmt0(send.length)}</div></div>
      <div class="rounded-xl p-3" style="background:#FFF1E0"><div class="text-xs text-muted">ซ้ำกับข้อมูลเดิม</div><div class="text-xl font-bold num" style="color:#B85A00">${fmt0(dup.length)}</div></div>
      <div class="rounded-xl p-3" style="background:#FDE8E8"><div class="text-xs text-muted">ข้อมูลไม่ถูกต้อง</div><div class="text-xl font-bold num" style="color:#B71C1C">${fmt0(I.rows.length - valid.length)}</div></div>
    </div>
    <div class="flex flex-wrap gap-2 mt-3 text-sm">
      <span class="badge b-brand">ยอดรวมที่จะนำเข้า ${fmt(sum(send, 'amount'))} บาท</span>
      <span class="badge b-info">ปีงบประมาณ ${fyYears.join(', ') || '-'}</span>
      ${newMt.length ? `<span class="badge b-warn">สร้างประเภทเงินใหม่: ${esc(newMt.join(', '))}</span>` : ''}
      ${newCat.length ? `<span class="badge b-warn">สร้างหมวดใหม่: ${esc(newCat.join(', '))}</span>` : ''}
    </div>
    <label class="flex items-center gap-2 mt-3 text-sm cursor-pointer"><input type="checkbox" id="skipDup" class="chk" ${I.skipDup ? 'checked' : ''}> ข้ามรายการที่ซ้ำกับข้อมูลเดิม</label>
    <div class="table-wrap mt-3 border border-line rounded-xl" style="max-height:360px"><table class="tbl"><thead><tr><th>แถว</th><th>สถานะ</th><th>ประเภทเงิน</th><th>หมวด</th><th>เลขที่</th><th>รายการ</th><th class="r">จำนวนเงิน</th><th>เดือน/ปี</th></tr></thead><tbody>
      ${I.rows.slice(0, 200).map(r => `<tr><td class="num text-muted">${r._line}</td><td>${r._err ? `<span class="badge b-bad">${esc(r._err)}</span>` : r._dup ? '<span class="badge b-warn">ซ้ำ</span>' : r._dupFile ? '<span class="badge b-info">ซ้ำในไฟล์</span>' : '<span class="badge b-ok">ใหม่</span>'}</td><td>${esc(r.money_type)}</td><td>${esc(r.expense_category)}</td><td class="whitespace-nowrap">${esc(r.voucher_no)}</td><td><div class="clamp2">${esc(r.description)}</div></td><td class="r num">${fmt(r.amount)}</td><td class="whitespace-nowrap">${MONTHS_S[r.month] || '-'} ${r.year || ''}</td></tr>`).join('')}
    </tbody></table></div>
    ${I.rows.length > 200 ? `<p class="hint mt-2">แสดงตัวอย่าง 200 แถวแรกจาก ${fmt0(I.rows.length)} แถว</p>` : ''}
    <div class="flex justify-end gap-2 mt-4"><button class="btn btn-light" id="impCancel">ยกเลิก</button><button class="btn btn-primary" id="impGo" ${send.length ? '' : 'disabled'}><i data-lucide="upload"></i>นำเข้า ${fmt0(send.length)} รายการ</button></div>`;
  icons();
  const clear = () => { IMPORT = null; el.innerHTML = ''; };
  $('#impClear').onclick = clear; $('#impCancel').onclick = clear;
  $('#skipDup').onchange = e => { I.skipDup = e.target.checked; renderImportPreview(); };
  $('#impGo').onclick = async () => {
    if (!await confirmBox({ title: 'ยืนยันการนำเข้า', html: `นำเข้า <b>${fmt0(send.length)}</b> รายการ ยอดรวม <b>${fmt(sum(send, 'amount'))}</b> บาท`, icon: 'question', confirm: 'นำเข้า' })) return;
    const res = { inserted: 0, errors: [], created: { moneyTypes: 0, categories: 0, fiscalYears: 0 } };
    const payload = send.map(r => { const o = {}; ['money_type', 'expense_category', 'voucher_no', 'description', 'amount', 'month', 'year', 'fiscal_year', 'doc_date', 'status', 'note', 'created_at', '_line'].forEach(k => { if (r[k] !== undefined && r[k] !== '') o[k] = r[k]; }); return o; });
    loading(true, 'กำลังนำเข้าข้อมูล...');
    try {
      for (let i = 0; i < payload.length; i += 150) {
        $('#loaderText').textContent = `กำลังนำเข้า ${fmt0(Math.min(i + 150, payload.length))} / ${fmt0(payload.length)} รายการ`;
        const r = await api('importTransactions', { rows: payload.slice(i, i + 150) });
        res.inserted += r.inserted; res.errors.push(...r.errors); Object.keys(res.created).forEach(k => res.created[k] += r.created[k]);
      }
      await loadAll();
    } catch (e) { loading(false); return errAlert(e); }
    loading(false);
    IMPORT = null;
    await Swal.fire({ icon: 'success', title: 'นำเข้าข้อมูลสำเร็จ', confirmButtonColor: '#0C7C82', confirmButtonText: 'ตกลง',
      html: `นำเข้า <b>${fmt0(res.inserted)}</b> รายการ${res.created.fiscalYears + res.created.moneyTypes + res.created.categories ? `<br><span class="text-sm">สร้างปีงบ ${res.created.fiscalYears} · ประเภทเงิน ${res.created.moneyTypes} · หมวด ${res.created.categories}</span>` : ''}${res.errors.length ? `<div class="text-sm mt-2" style="color:#B71C1C">ข้าม ${res.errors.length} แถว: ${esc(res.errors.slice(0, 3).join(' / '))}</div>` : ''}` });
    rerender();
  };
}
function exportAll() {
  if (!needXLSX()) return;
  const wb = XLSX.utils.book_new();
  const add = (name, aoa, cols) => { const ws = XLSX.utils.aoa_to_sheet(aoa); if (cols) ws['!cols'] = cols.map(w => ({ wch: w })); XLSX.utils.book_append_sheet(wb, ws, name); };
  const all = [...S.transactions].sort((a, b) => (fyOf(b.fiscal_year_id).year - fyOf(a.fiscal_year_id).year) || (FY_MONTHS.indexOf(a.month) - FY_MONTHS.indexOf(b.month)));
  add('รายการเบิกจ่าย', txAOA(all), [6, 10, 22, 16, 12, 12, 12, 7, 60, 14, 11, 20, 12, 22]);
  add('งบจัดสรร', [['ปีงบประมาณ', 'ประเภทเงิน', 'หมวดรายจ่าย', 'งบจัดสรร', 'ใช้ไป', 'คงเหลือ', 'หมายเหตุ'], ...S.budgets.map(b => { const u = b.category_id ? spent(b.fiscal_year_id, b.money_type_id, b.category_id) : spent(b.fiscal_year_id, b.money_type_id); return [fyOf(b.fiscal_year_id).year, (IDX.mt[b.money_type_id] || {}).name, b.category_id ? (IDX.cat[b.category_id] || {}).name : 'ทุกหมวด', b.amount, u, b.amount - u, b.note]; })], [10, 22, 18, 14, 14, 14, 24]);
  add('ปีงบประมาณ', [['ปีงบประมาณ', 'ชื่อ', 'วันเริ่มต้น', 'วันสิ้นสุด', 'ปีปัจจุบัน', 'จำนวนรายการ', 'ยอดใช้ไป', 'งบจัดสรร', 'หมายเหตุ'], ...S.fiscalYears.map(f => { const st = fyStats(f.id); return [f.year, f.name, f.start_date, f.end_date, f.is_active ? 'ใช่' : '', st.count, st.used, st.budget, f.note]; })], [10, 20, 12, 12, 10, 12, 14, 14, 20]);
  add('ประเภทเงิน', [['ลำดับ', 'ชื่อ', 'รหัส', 'สี', 'สถานะ', 'หมายเหตุ'], ...S.moneyTypes.map(m => [m.sort, m.name, m.code, m.color, m.active ? 'ใช้งาน' : 'ปิด', m.note])], [7, 26, 10, 10, 10, 20]);
  add('หมวดรายจ่าย', [['ลำดับ', 'ชื่อ', 'รหัส', 'สี', 'สถานะ', 'หมายเหตุ'], ...S.categories.map(m => [m.sort, m.name, m.code, m.color, m.active ? 'ใช้งาน' : 'ปิด', m.note])], [7, 26, 10, 10, 10, 20]);
  const lv = txFY().filter(live);
  add('สรุป ' + fyOf(S.fyId).year, [['หมวดรายจ่าย', ...S.moneyTypes.map(m => m.name), 'รวม'], ...S.categories.map(c => { const v = S.moneyTypes.map(m => sum(lv.filter(t => t.category_id === c.id && t.money_type_id === m.id), 'amount')); return [c.name, ...v, sum(v)]; }), ['รวม', ...S.moneyTypes.map(m => sum(lv.filter(t => t.money_type_id === m.id), 'amount')), sum(lv, 'amount')]], [18, 18, 18, 22, 18, 16]);
  XLSX.writeFile(wb, `ข้อมูลระบบงบประมาณ_${new Date().toISOString().slice(0, 10)}.xlsx`);
  ok('ส่งออกข้อมูลแล้ว');
}

/* =====================================================================
   PAGE: Users
   ===================================================================== */
PAGES.users = function () {
  $('#view').innerHTML = `<div class="card overflow-hidden">
    <div class="card-h pb-3"><div class="card-t"><i data-lucide="users"></i>ผู้ใช้งานระบบ <span class="badge b-brand num">${S.users.length}</span></div><button class="btn btn-primary btn-sm" id="addU"><i data-lucide="plus"></i>เพิ่มผู้ใช้</button></div>
    <div class="table-wrap"><table class="tbl"><thead><tr><th>ผู้ใช้</th><th>ชื่อผู้ใช้</th><th>ตำแหน่ง</th><th>สิทธิ์</th><th>สถานะ</th><th>สร้างเมื่อ</th><th class="r">จัดการ</th></tr></thead><tbody>
    ${S.users.map(u => `<tr><td><div class="flex items-center gap-3"><span class="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold" style="background:linear-gradient(135deg,#0C7C82,#35B4B0)">${esc((u.full_name || '?').charAt(0))}</span><div><div class="font-semibold">${esc(u.full_name)}</div>${u.id === S.settings.reporter_user_id ? '<span class="badge b-brand" style="font-size:11px;padding:1px 8px">ครูผู้รายงาน</span>' : ''}</div></div></td><td class="text-muted">${esc(u.username)}</td><td>${esc(u.position || '-')}</td><td><span class="badge ${ROLE_BADGE[u.role]}"><i data-lucide="shield-check"></i>${CORE.ROLES[u.role]}</span></td><td>${u.active ? '<span class="badge b-ok"><span class="bd"></span>ใช้งาน</span>' : '<span class="badge b-muted"><span class="bd"></span>ปิด</span>'}</td><td class="text-sm text-muted whitespace-nowrap">${thaiDateTime(u.created_at)}</td><td class="r whitespace-nowrap"><button class="act" data-eu="${u.id}"><i data-lucide="pencil"></i></button>${u.id !== S.user.id ? `<button class="act del" data-du="${u.id}"><i data-lucide="trash-2"></i></button>` : ''}</td></tr>`).join('')}
    </tbody></table></div></div>
    <div class="grid sm:grid-cols-3 gap-3 mt-4">${Object.entries(CORE.ROLES).map(([k, v]) => `<div class="card p-4"><span class="badge ${ROLE_BADGE[k]}">${v}</span><p class="text-sm text-muted mt-2 mb-0">${{ admin: 'จัดการได้ทุกส่วน รวมถึงผู้ใช้ ข้อมูลหลัก และการตั้งค่า', staff: 'บันทึก/แก้ไข/ลบรายการเบิกจ่ายและงบจัดสรร นำเข้าข้อมูล พิมพ์รายงาน', viewer: 'ดูแดชบอร์ด รายการ และพิมพ์รายงานได้อย่างเดียว' }[k]}</p></div>`).join('')}</div>`;
  $('#addU').onclick = () => openUserModal();
  $$('[data-eu]').forEach(b => b.onclick = () => openUserModal(IDX.user[b.dataset.eu]));
  $$('[data-du]').forEach(b => b.onclick = async () => {
    const u = IDX.user[b.dataset.du];
    if (!await confirmDelete(`ผู้ใช้ ${u.full_name} (${u.username})`)) return;
    try { await withLoad('กำลังลบ...', () => api('remove', { table: 'users', id: u.id })); dropLocal('users', [u.id]); ok('ลบผู้ใช้แล้ว'); rerender(); } catch (e) { errAlert(e); }
  });
};
function openUserModal(rec) {
  const r = rec || { role: 'staff', active: true };
  openModal({
    title: rec ? 'แก้ไขผู้ใช้งาน' : 'เพิ่มผู้ใช้งาน', icon: 'user-cog',
    body: `<div class="grid sm:grid-cols-2 gap-4">
      <label class="field"><span>ชื่อ-นามสกุล <em>*</em></span><input name="full_name" class="input" value="${esc(r.full_name || '')}" required></label>
      <label class="field"><span>ตำแหน่ง</span><input name="position" class="input" value="${esc(r.position || '')}" placeholder="เช่น ครูชำนาญการ"></label>
      <label class="field"><span>ชื่อผู้ใช้ <em>*</em></span><input name="username" class="input" value="${esc(r.username || '')}" required autocomplete="off" placeholder="a-z 0-9"></label>
      <label class="field"><span>รหัสผ่าน ${rec ? '' : '<em>*</em>'}</span><input name="password" type="password" class="input" autocomplete="new-password" ${rec ? 'placeholder="เว้นว่างหากไม่ต้องการเปลี่ยน"' : 'required placeholder="อย่างน้อย 8 ตัวอักษร"'}></label>
      <label class="field"><span>สิทธิ์การใช้งาน</span><select name="role" class="input">${Object.entries(CORE.ROLES).map(([k, v]) => opt(k, v, r.role)).join('')}</select></label>
      <label class="flex items-center gap-2 cursor-pointer self-end h-11"><input type="checkbox" name="active" class="chk" ${r.active ? 'checked' : ''}> เปิดใช้งานบัญชี</label></div>`,
    onSubmit: async fd => {
      fd.active = !!fd.active;
      const saved = await api('save', { table: 'users', record: Object.assign({ id: rec ? rec.id : undefined }, fd) });
      upsert('users', saved); if (saved.id === S.user.id) Object.assign(S.user, saved);
      ok('บันทึกผู้ใช้แล้ว'); rerender();
    }
  });
}

/* =====================================================================
   PAGE: Logs
   ===================================================================== */
PAGES.logs = async function () {
  let data = [];
  try { data = await api('logs', { limit: 1000 }); } catch (e) { errAlert(e); }
  if (S.page !== 'logs') return;
  const color = a => /ลบ/.test(a) ? 'b-bad' : /เพิ่ม|นำเข้า/.test(a) ? 'b-ok' : /แก้ไข|บันทึก|ตั้ง|คัดลอก/.test(a) ? 'b-info' : /เข้าสู่|ออกจาก/.test(a) ? 'b-muted' : 'b-plum';
  const draw = q => {
    const list = data.filter(l => !q || JSON.stringify(l).toLowerCase().includes(q.toLowerCase()));
    $('#logBody').innerHTML = list.slice(0, 500).map(l => `<tr><td class="whitespace-nowrap text-sm">${thaiDateTime(l.timestamp)}</td><td class="font-semibold">${esc(l.username)}</td><td><span class="badge ${color(l.action)}">${esc(l.action)}</span></td><td>${esc(l.target || '-')}</td><td class="text-sm text-muted"><div class="clamp2">${esc(l.detail)}</div></td></tr>`).join('') || `<tr><td colspan="5">${emptyState('history', 'ไม่พบประวัติ')}</td></tr>`;
  };
  $('#view').innerHTML = `<div class="card overflow-hidden"><div class="card-h pb-3 flex-wrap"><div class="card-t"><i data-lucide="history"></i>ประวัติการใช้งาน <span class="badge b-brand num">${fmt0(data.length)}</span></div>
    <div class="flex gap-2 flex-1 justify-end min-w-[240px]"><div class="search flex-1 max-w-sm"><i data-lucide="search"></i><input id="lq" class="input" placeholder="ค้นหาผู้ใช้ การกระทำ รายละเอียด"></div><button class="btn btn-danger" id="clrLog"><i data-lucide="trash-2"></i><span class="hidden sm:inline">ล้างประวัติ</span></button></div></div>
    <div class="table-wrap" style="max-height:calc(100dvh - 200px)"><table class="tbl"><thead><tr><th>วันเวลา</th><th>ผู้ใช้</th><th>การกระทำ</th><th>ส่วนที่เกี่ยวข้อง</th><th>รายละเอียด</th></tr></thead><tbody id="logBody"></tbody></table></div></div>`;
  draw(''); icons();
  $('#lq').oninput = e => draw(e.target.value);
  $('#clrLog').onclick = async () => { if (!await confirmDelete('ประวัติการใช้งานทั้งหมด')) return; try { await withLoad('กำลังล้าง...', () => api('clearLogs')); ok('ล้างประวัติแล้ว'); go('logs'); } catch (e) { errAlert(e); } };
};

/* =====================================================================
   PAGE: Settings
   ===================================================================== */
PAGES.settings = function () {
  const s = S.settings;
  let logo = s.logo || '';
  $('#view').innerHTML = `<form id="setForm" class="grid xl:grid-cols-2 gap-4 items-start" novalidate>
    <div class="card p-5 flex flex-col gap-4"><div class="card-t"><i data-lucide="school"></i>ข้อมูลโรงเรียน</div>
      <div class="flex items-center gap-4 flex-wrap">
        <div id="logoPrev" class="logo-prev">${logo ? `<img src="${logo}" alt="โลโก้">` : '<i data-lucide="image-plus"></i>'}</div>
        <div class="flex flex-col gap-2"><div class="flex gap-2 flex-wrap"><label class="btn btn-soft btn-sm cursor-pointer"><i data-lucide="upload"></i>อัปโหลดโลโก้<input type="file" id="logoFile" accept="image/*" hidden></label><button type="button" class="btn btn-light btn-sm" id="logoDel"><i data-lucide="trash-2"></i>ลบ</button></div><span class="hint">PNG/JPG ระบบจะย่อขนาดให้อัตโนมัติ (แสดงตัวอย่างก่อนบันทึก)</span></div>
      </div>
      <label class="field"><span>ชื่อโรงเรียน <em>*</em></span><input name="school_name" class="input" value="${esc(s.school_name)}" required></label>
      <label class="field"><span>สังกัด</span><input name="affiliation" class="input" value="${esc(s.affiliation)}" placeholder="เช่น สำนักงานเขตพื้นที่การศึกษามัธยมศึกษา..."></label>
      <label class="field"><span>ที่อยู่ (แสดงในหัวรายงาน)</span><input name="address" class="input" value="${esc(s.address)}"></label>
      <label class="field"><span>ชื่อระบบ</span><input name="system_name" class="input" value="${esc(s.system_name)}"></label>
    </div>
    <div class="flex flex-col gap-4">
      <div class="card p-5 flex flex-col gap-4"><div class="card-t"><i data-lucide="badge-check"></i>ครูผู้รายงานและผู้ลงนาม</div>
        <label class="field"><span>ครูผู้รายงาน (ดึงจากรายชื่อผู้ใช้งาน)</span><select name="reporter_user_id" class="input">${opt('', '— ใช้ชื่อผู้ที่เข้าสู่ระบบ —', s.reporter_user_id)}${S.users.filter(u => u.active).map(u => opt(u.id, u.full_name + (u.position ? ' · ' + u.position : ''), s.reporter_user_id)).join('')}</select></label>
        <div class="grid sm:grid-cols-2 gap-3"><label class="field"><span>ชื่อผู้รายงาน (ระบุเอง)</span><input name="reporter_name" class="input" value="${esc(s.reporter_name)}" placeholder="เว้นว่าง = ใช้จากรายชื่อ"></label><label class="field"><span>ตำแหน่งผู้รายงาน</span><input name="reporter_position" class="input" value="${esc(s.reporter_position)}" placeholder="เว้นว่าง = ใช้จากรายชื่อ"></label></div>
        <div class="grid sm:grid-cols-2 gap-3"><label class="field"><span>ชื่อผู้อำนวยการ</span><input name="director_name" class="input" value="${esc(s.director_name)}"></label><label class="field"><span>ตำแหน่ง</span><input name="director_position" class="input" value="${esc(s.director_position)}"></label></div>
        <div class="grid sm:grid-cols-2 gap-3"><label class="field"><span>เจ้าหน้าที่การเงิน</span><input name="finance_name" class="input" value="${esc(s.finance_name)}"></label><label class="field"><span>ตำแหน่ง</span><input name="finance_position" class="input" value="${esc(s.finance_position)}"></label></div>
        <div id="repPrev" class="rounded-xl p-3 text-sm" style="background:var(--brand-50)"></div>
      </div>
      <div class="card p-5 flex flex-col gap-4"><div class="card-t"><i data-lucide="bell"></i>การแจ้งเตือน</div>
        <label class="field"><span>แจ้งเตือนเมื่อใช้งบถึงร้อยละ</span><div class="flex items-center gap-3"><input name="warn_percent" type="range" min="50" max="100" step="5" value="${esc(s.warn_percent || 80)}" class="flex-1" style="accent-color:#0C7C82"><span id="wpV" class="badge b-warn num">${esc(s.warn_percent || 80)}%</span></div></label>
      </div>
      <div class="flex justify-end gap-2"><button type="button" class="btn btn-light" id="setReset"><i data-lucide="rotate-ccw"></i>คืนค่า</button><button class="btn btn-primary"><i data-lucide="save"></i>บันทึกการตั้งค่า</button></div>
    </div></form>`;
  const F = $('#setForm');
  const repPrev = () => { const u = IDX.user[F.elements.reporter_user_id.value] || S.user; $('#repPrev').innerHTML = `<b>แสดงที่ footer:</b> ครูผู้รายงาน ${esc(F.elements.reporter_name.value || u.full_name)} ${esc(F.elements.reporter_position.value || u.position || '')}`; };
  ['reporter_user_id', 'reporter_name', 'reporter_position'].forEach(n => F.elements[n].addEventListener('input', repPrev)); repPrev();
  F.elements.warn_percent.oninput = e => $('#wpV').textContent = e.target.value + '%';
  $('#logoFile').onchange = e => {
    const f = e.target.files[0]; if (!f) return;
    if (!/^image\//.test(f.type)) return errAlert(new Error('กรุณาเลือกไฟล์รูปภาพ'));
    const rd = new FileReader();
    rd.onload = () => { const img = new Image(); img.onload = () => { const max = 320, sc = Math.min(1, max / Math.max(img.width, img.height)); const cv = document.createElement('canvas'); cv.width = Math.round(img.width * sc); cv.height = Math.round(img.height * sc); cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height); logo = cv.toDataURL('image/png'); if (logo.length > 300000) logo = cv.toDataURL('image/jpeg', .85); $('#logoPrev').innerHTML = `<img src="${logo}" alt="ตัวอย่างโลโก้">`; Toast.fire({ icon: 'info', title: 'แสดงตัวอย่างแล้ว กดบันทึกเพื่อใช้งาน' }); }; img.src = rd.result; };
    rd.readAsDataURL(f); e.target.value = '';
  };
  $('#logoDel').onclick = () => { logo = ''; $('#logoPrev').innerHTML = '<i data-lucide="image-plus"></i>'; icons(); };
  $('#setReset').onclick = () => go('settings');
  F.onsubmit = async e => {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(F).entries()); fd.logo = logo;
    if (!fd.school_name.trim()) return errAlert(new Error('กรุณากรอกชื่อโรงเรียน'));
    try { S.settings = await withLoad('กำลังบันทึกการตั้งค่า...', () => api('saveSettings', { settings: fd })); ok('บันทึกการตั้งค่าแล้ว'); refreshShell(); setTitle(); } catch (er) { errAlert(er); }
  };
};

/* =====================================================================
   Profile / password / auth
   ===================================================================== */
function openProfile() {
  const u = S.user;
  openModal({ title: 'ข้อมูลส่วนตัว', icon: 'user-cog', size: 'sm',
    body: `<div class="grid gap-4"><div class="flex items-center gap-3"><span class="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold" style="background:linear-gradient(135deg,#0C7C82,#35B4B0)">${esc(u.full_name.charAt(0))}</span><div><div class="font-bold">${esc(u.username)}</div><span class="badge ${ROLE_BADGE[u.role]}">${CORE.ROLES[u.role]}</span></div></div>
      <label class="field"><span>ชื่อ-นามสกุล <em>*</em></span><input name="full_name" class="input" value="${esc(u.full_name)}" required></label>
      <label class="field"><span>ตำแหน่ง</span><input name="position" class="input" value="${esc(u.position)}"></label></div>`,
    onSubmit: async fd => { const r = await api('saveProfile', fd); Object.assign(S.user, r); upsert('users', Object.assign({}, IDX.user[r.id] || {}, r)); ok('บันทึกแล้ว'); refreshShell(); }
  });
}
function openPassword() {
  openModal({ title: 'เปลี่ยนรหัสผ่าน', icon: 'key-round', size: 'sm', submitText: 'เปลี่ยนรหัสผ่าน',
    body: `<div class="grid gap-4"><label class="field"><span>รหัสผ่านเดิม</span><input name="oldPassword" type="password" class="input" required autocomplete="current-password"></label><label class="field"><span>รหัสผ่านใหม่</span><input name="newPassword" type="password" class="input" required minlength="8" autocomplete="new-password"></label><label class="field"><span>ยืนยันรหัสผ่านใหม่</span><input name="confirm" type="password" class="input" required autocomplete="new-password"></label></div>`,
    onSubmit: async fd => { if (fd.newPassword !== fd.confirm) throw new Error('รหัสผ่านใหม่ทั้งสองช่องไม่ตรงกัน'); await api('changePassword', fd); ok('เปลี่ยนรหัสผ่านแล้ว'); }
  });
}
function setToken(t, remember) {
  S.token = t || '';
  if (!t) { sstore('bts_token', null); store('bts_token', null); return; }
  if (remember) store('bts_token', t); else sstore('bts_token', t);
}
function getToken() { return sstore('bts_token') || store('bts_token') || ''; }
async function logout() {
  if (!await confirmBox({ title: 'ออกจากระบบ', html: 'ต้องการออกจากระบบใช่หรือไม่?', icon: 'question', confirm: 'ออกจากระบบ', danger: true })) return;
  await withLoad('กำลังออกจากระบบ...', () => api('logout').catch(() => { }));
  setToken(''); S.user = null; showLogin(); ok('ออกจากระบบแล้ว');
}
let expiredShown = false;
function sessionExpired() {
  if (expiredShown || !S.user) return; expiredShown = true;
  setToken(''); S.user = null;
  Swal.fire({ icon: 'info', title: 'เซสชันหมดอายุ', text: 'กรุณาเข้าสู่ระบบใหม่', confirmButtonColor: '#0C7C82', confirmButtonText: 'ตกลง' }).then(() => { expiredShown = false; showLogin(); });
}
function showLogin() {
  $('#app').hidden = true; $('#loginView').hidden = false; $('#boot').hidden = true;
  $('#demoHint').hidden = IS_SERVER; $('#lgPass').value = '';
  destroyCharts(); $('#modalRoot').innerHTML = ''; document.body.style.overflow = '';
  icons();
}
function showApp() {
  $('#loginView').hidden = true; $('#boot').hidden = true; $('#app').hidden = false;
  refreshShell(); go(S.page || 'dashboard');
}

/* ---------------- events ---------------- */
document.addEventListener('click', e => {
  const g = e.target.closest('[data-go]'); if (g) { e.preventDefault(); go(g.dataset.go); return; }
  if (e.target.closest('[data-close-menu]')) { closeMenu(); return; }
  const at = e.target.closest('[data-add-tx]'); if (at) { openTxModal(); return; }
  const ed = e.target.closest('[data-edit]'); if (ed) { e.stopPropagation(); openTxModal(S.transactions.find(t => t.id === ed.dataset.edit)); return; }
  const dl = e.target.closest('[data-del]'); if (dl) { e.stopPropagation(); delTx(dl.dataset.del); return; }
  if (e.target.closest('[data-stop]') && !e.target.closest('[data-view]:not(tr)')) return;
  const vw = e.target.closest('[data-view]'); if (vw) { viewTx(vw.dataset.view); return; }
  const al = e.target.closest('[data-alert]'); if (al) { const a = $('#bellDd')._alerts[al.dataset.alert]; $('#bellDd').hidden = true; go(a.go, a.f ? { filter: a.f } : {}); return; }
  const ua = e.target.closest('#userDd [data-act]');
  if (ua) { $('#userDd').hidden = true; const a = ua.dataset.act; if (a === 'logout') logout(); else if (a === 'profile') openProfile(); else if (a === 'password') openPassword(); else if (a === 'refresh') withLoad('กำลังโหลดข้อมูลใหม่...', loadAll).then(() => { rerender(); ok('โหลดข้อมูลล่าสุดแล้ว'); }).catch(errAlert); return; }
  if (!e.target.closest('#userBtn') && !e.target.closest('#userDd')) $('#userDd').hidden = true;
  if (!e.target.closest('#bellBtn') && !e.target.closest('#bellDd')) $('#bellDd').hidden = true;
});
$('#userBtn').onclick = () => { $('#userDd').hidden = !$('#userDd').hidden; $('#bellDd').hidden = true; };
$('#bellBtn').onclick = () => { renderBell(); $('#bellDd').hidden = !$('#bellDd').hidden; $('#userDd').hidden = true; };
$('#menuBtn').onclick = openMenu;
$('#bnMenu').onclick = openMenu;
$('#fabAdd').onclick = () => openTxModal();
['#fySelect', '#fySelectM'].forEach(id => $(id).onchange = e => { S.fyId = e.target.value; store('bts_fy', S.fyId); S.sel.clear(); rerender(); });
window.addEventListener('scroll', () => $('#topbar').classList.toggle('scrolled', window.scrollY > 4), { passive: true });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
$('#lgEye').onclick = () => { const p = $('#lgPass'); p.type = p.type === 'password' ? 'text' : 'password'; $('#lgEye').innerHTML = `<i data-lucide="${p.type === 'password' ? 'eye' : 'eye-off'}"></i>`; icons(); };
/* ---------- login helpers: แป้นพิมพ์ไทย / Caps Lock ---------- */
const TH_KEYS = 'ๅ1/2-3ภ4ถ5ุ6ึ7ค8ต9จ0ข-ช=ๆqไwำeพrะtัyีuรiนoยpบ[ล]ฟaหsกdดfเg้h่jาkสlว;ง\'ผzปxแcอvิbืnทmม,ใ.ฝ/ฃ\\+!๑@๒#๓$๔%ู^฿&๕*๖(๗)๘_๙+๐Q"WฎEฑRธTํY๊UณIฯOญPฐ{,}ฤAฆSฏDโFฌG็H๋JษKศLซ:."(Z)XฉCฮVฺB์N?Mฒ<ฬ>ฦ?ฅ|';
const TH_MAP = (() => { const m = {}; const a = [...TH_KEYS]; for (let i = 0; i + 1 < a.length; i += 2) if (!(a[i] in m)) m[a[i]] = a[i + 1]; return m; })();
const hasThai = s => /[\u0E00-\u0E7F]/.test(s);
const thaiToEn = s => [...s].map(c => TH_MAP[c] ?? c).join('');
let capsOn = false;
function loginWarn() {
  const u = $('#lgUser').value, p = $('#lgPass').value, w = [];
  if (hasThai(u) || hasThai(p)) w.push('แป้นพิมพ์กำลังเป็น<b>ภาษาไทย</b> กรุณาเปลี่ยนเป็นภาษาอังกฤษก่อนพิมพ์ (ปุ่ม ~ หรือ Alt+Shift)');
  if (capsOn) w.push('เปิด <b>Caps Lock</b> อยู่ ตัวอักษรจะเป็นตัวพิมพ์ใหญ่');
  $('#lgWarn').innerHTML = w.length ? '<i data-lucide="triangle-alert"></i><span>' + w.join('<br>') + '</span>' : '';
  $('#lgWarn').hidden = !w.length; icons();
}
['#lgUser', '#lgPass'].forEach(id => {
  $(id).addEventListener('input', () => { loginWarn(); $('#lgErr').hidden = true; });
  $(id).addEventListener('keyup', e => { if (e.getModifierState) { capsOn = e.getModifierState('CapsLock'); loginWarn(); } });
});
$('#lgForgot').onclick = () => Swal.fire({ icon: 'info', title: 'เข้าสู่ระบบไม่ได้?', text: 'ตรวจสอบภาษาแป้นพิมพ์และ Caps Lock หากลืมรหัสผ่านให้ติดต่อผู้ดูแลระบบเพื่อเปลี่ยนรหัสผ่านในหน้าผู้ใช้งาน', confirmButtonText: 'เข้าใจแล้ว' });
$('#loginForm').addEventListener('submit', async e => {
  e.preventDefault();
  const btn = $('#lgBtn'), html = btn.innerHTML, err = $('#lgErr');
  err.hidden = true;
  btn.disabled = true; btn.innerHTML = '<span class="spin sm"></span> กำลังเข้าสู่ระบบ...';
  const user = $('#lgUser').value.trim(), pass = $('#lgPass').value;
  try {
    let r;
    try { r = await api('login', { username: user, password: pass }); }
    catch (er) {
      if (!(hasThai(user) || hasThai(pass))) throw er;
      r = await api('login', { username: thaiToEn(user), password: thaiToEn(pass) });
      Toast.fire({ icon: 'info', title: 'ระบบแปลงตัวอักษรจากแป้นพิมพ์ไทยให้อัตโนมัติ' });
    }
    setToken(r.token, $('#lgRemember').checked);
    try { await withLoad('กำลังโหลดข้อมูล...', loadAll); }
    catch (er) { throw new Error('เข้าสู่ระบบสำเร็จ แต่โหลดข้อมูลไม่ได้: ' + er.message); }
    S.page = 'dashboard'; showApp();
    ok('ยินดีต้อนรับ ' + S.user.full_name);
  } catch (er) {
    err.innerHTML = esc(er.message || er) + (/รหัสผ่าน/.test(er.message) ? '<br><span style="font-size:12.5px">ตรวจสอบแป้นพิมพ์ภาษาอังกฤษ และ Caps Lock</span>' : '');
    err.hidden = false;
    errAlert(er);
  }
  finally { btn.disabled = false; btn.innerHTML = html; icons(); }
});

/* ---------------- boot ---------------- */
(async function boot() {
  document.querySelectorAll('.yr').forEach(el => el.textContent = curBE());

  try {
    const info = await api('publicInfo');
    applyBrand(info);
    if (!info.initialized) { showLogin(); showSetup(); return; }
  } catch (e) {
    $('#boot').hidden = true;
    showLogin();
    $('#lgErr').textContent = 'เชื่อมต่อฐานข้อมูลไม่ได้: ' + e.message;
    $('#lgErr').hidden = false;
    return;
  }
  S.token = getToken();
  if (S.token) {
    try { await loadAll(); showApp(); return; } catch (e) { setToken(''); }
  }
  showLogin();
})();

