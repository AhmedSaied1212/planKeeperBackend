import React, { useEffect, useState } from "react";

function Quran() {
  const [quran, setQuran] = useState([]);
  const [surahs, setSurahs] = useState([]);
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // تحميل المصحف كامل
  useEffect(() => {
    setLoading(true);
    fetch("http://api.alquran.cloud/v1/quran/quran-uthmani")
      .then((res) => res.json())
      .then((data) => {
        setQuran(data.data.surahs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // تحميل قائمة السور
  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => setSurahs(data.data));
  }, []);

  // البحث عن سورة
  const search = (n) => {
    setLoading(true);
    setSurah(null);

    fetch(`https://api.alquran.cloud/v1/surah/${n}`)
      .then((res) => res.json())
      .then((data) => {
        setSurah(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="flex w-full bg-[#f9f5e7] h-screen">
      {/* Hamburger Menu Button - Mobile Only */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 right-4 z-50 md:hidden flex flex-col gap-1.5 bg-[#c8aa6b] p-3 rounded-lg hover:bg-[#b8994a] transition"
      >
        <span className="w-6 h-1 bg-white rounded"></span>
        <span className="w-6 h-1 bg-white rounded"></span>
        <span className="w-6 h-1 bg-white rounded"></span>
      </button>

      {/* Overlay - Mobile Only */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        ></div>
      )}

      {/* Sidebar - Responsive */}
      <div
        className={`fixed md:static inset-y-0 right-0 w-[400px] bg-[#eee7d7] p-4 border-l-4 border-[#c8aa6b] overflow-auto transition-transform duration-300 z-40 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0`}
        style={{ fontFamily: "'Scheherazade', serif" }}
      >
        <h1 className="text-4xl text-right font-bold mb-4 text-[#4a3f2b]">
          السور
        </h1>

        {surahs.map((s) => (
          <div
            key={s.number}
            onClick={() => {
              search(s.number);
              setSidebarOpen(false);
            }}
            className="p-3 cursor-pointer hover:bg-[#e0d2b5] border-b border-[#c8aa6b] flex flex-col text-right transition"
          >
            <span className="text-3xl font-bold">{s.name}</span>
            <span className="text-xl text-[#6a5c3a]">
              {s.numberOfAyahs} آية
            </span>
          </div>
        ))}
      </div>

      {/* Main Content - Responsive */}
      <div className="flex-1 flex flex-col items-center p-4 md:p-5 overflow-auto w-full">
        {/* رسالة تحميل */}
        {loading && (
          <div
            className="text-3xl md:text-5xl font-bold text-[#8a6d3b] mt-10 animate-pulse text-center"
            style={{ fontFamily: "'Scheherazade', serif" }}
          >
            جاري التحميل برجاء الانتظار...
          </div>
        )}

        {/* عرض سورة واحدة */}
        {!loading && surah && (
          <div
            className="w-full md:w-[80%] lg:w-[70%] text-center leading-loose mt-2 md:mt-5 px-4"
            style={{ fontFamily: "'Scheherazade', serif" }}
          >
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-4">
              <div className="bg-[#d4b46e] text-white px-4 py-2 rounded-lg font-bold text-lg md:text-xl">
                السورة: {surah.number}
              </div>
              <div className="bg-[#c8aa6b] text-white px-4 py-2 rounded-lg font-bold text-lg md:text-xl">
                الآيات: {surah.numberOfAyahs}
              </div>
              <div className="bg-[#8a6d3b] text-white px-4 py-2 rounded-lg font-bold text-lg md:text-xl">
                الصفحة: {surah.ayahs[0]?.page}
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-[#4a3f2b]">
              {surah.name}
            </h1>

            <p className="text-2xl md:text-4xl font-bold text-[#1b1b1b]">
              {surah.ayahs.map((a, i) => (
                <span key={i}>
                  {a.text}

                  {/* رقم الآية المزخرف */}
                  <span
                    className="mx-3 inline-flex justify-center items-center text-2xl
                               w-12 h-12 rounded-full 
                               border-4 border-[#d4b46e]
                               bg-[#fff9e6]
                               shadow-lg
                               font-semibold
                               text-[#7a5e2f]"
                  >
                    {a.numberInSurah}
                  </span>
                </span>
              ))}
            </p>
          </div>
        )}

        {/* عرض المصحف كامل لو مفيش بحث */}
        {!loading &&
          !surah &&
          quran.map((s, index) => (
            <div
              key={index}
              className="w-full md:w-[80%] lg:w-[70%] text-center my-6 md:my-10 leading-loose px-4"
              style={{ fontFamily: "'Scheherazade', serif" }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-[#4a3f2b]">
                {s.name}
              </h1>

              <p className="text-2xl md:text-4xl font-bold text-[#1b1b1b]">
                {s.ayahs.map((a, i) => (
                  <span key={i}>
                    {a.text}

                    <span
                      className="mx-1 md:mx-3 inline-flex justify-center items-center text-lg md:text-2xl
                               w-8 h-8 md:w-12 md:h-12 rounded-full 
                               border-2 md:border-4 border-[#d4b46e]
                               bg-[#fff9e6]
                               shadow-lg
                               font-semibold
                               text-[#7a5e2f]"
                    >
                      {a.numberInSurah}
                    </span>
                  </span>
                ))}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Quran;
