import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import axios from 'axios';

function Weather() {

    const [input, setInput] = useState("");
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    // Tailwind class variables

    // 1. Container
    const containerClass = "min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617]"; 
    const cardClass = "w-full max-w-md rounded-3xl border-2 border-blue-300/30 bg-blue-900/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,140,255,0.25)] p-6 text-white transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,200,255,0.6)]";
    
    // 2. Search Bar
    const searchWrapperClass = "flex items-center w-full max-w-md mx-auto bg-gradient-to-r from-white/90 to-white/70 rounded-full px-3 sm:px-4 py-2 shadow-inner border border-white/40 focus-within:ring-2 focus-within:ring-cyan-300 transition-all";
    const searchInputClass = "flex-1 min-w-0 bg-transparent text-gray-800 outline-none text-base sm:text-lg placeholder-gray-500 px-2";
    const searchIconClass = "flex-shrink-0 text-cyan-600 cursor-pointer transition-all duration-200 hover:scale-110 hover:text-blue-700 active:scale-95 text-lg sm:text-xl";

    // 3. Loading
    const loadingWrapperClass = "h-64 flex flex-col items-center justify-center gap-4";
    const loadingSpinnerClass = "w-12 h-12 border-4 border-white/30 border-t-cyan-400 rounded-full animate-spin";
    const loadingTextClass = "text-lg font-semibold animate-pulse text-cyan-200";

    // 4. Error
    const errorWrapperClass = "h-64 flex flex-col items-center justify-center gap-2 text-center";
    const errorTextClass = "text-lg font-medium text-red-200";

    // 5. Weather
    const locationClass = "text-2xl font-semibold tracking-wide bg-gradient-to-r from-cyan-200 to-blue-300 bg-clip-text text-transparent transition-all duration-300 hover:tracking-widest";
    const weatherIconClass = "w-28 h-28 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] transition-transform duration-300 hover:scale-110";
    const temperatureClass = "text-5xl font-bold bg-gradient-to-r from-yellow-200 via-orange-300 to-red-400 bg-clip-text text-transparent drop-shadow-lg";
    const conditionClass = "mt-1 text-base opacity-90 italic text-blue-100";

    // 6. Divider
    const dividerClass = "w-full border-t border-white/20 my-6";
    const extraInfoClass = "flex justify-between text-center";

    // 7. Humidity & Wind Speed
    const infoBoxClass = "flex flex-col items-center mr-2 w-1/2 p-3 rounded-xl bg-white/5 border border-white/10 transition-all duration-300";
    const humidityHoverClass = "hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]";
    const windHoverClass = "hover:bg-purple-400/10 hover:shadow-[0_0_20px_rgba(180,0,255,0.4)]";
    const infoLabelClass = "text-sm opacity-80";
    const infoValueClass = "text-lg font-semibold text-cyan-200";

    async function weatherApp() {

        if (input === "") {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            }, 1500);
            setError("Search City");
        }

        else {

            try {
                setLoading(true);
                setTimeout(() => {
                    setLoading(false)
                }, 2000);
                setError("Search City");
                const res = await axios.get(`https://api.weatherapi.com/v1/current.json?key=ab5b58beed904cc79fd65013261802&q=${input}&aqi=yes`);
                setError("");
                setData(res.data);
            }

            catch (error) {
                setTimeout(() => {
                    setLoading(false)
                }, 2000);
                setError(error.response.data.error.message);
            }

            finally {
                setInput("");
            }
        }
    }

    return <>
        <div className={containerClass}>
            <div className={cardClass}>
                {/* Search */}
                <div className={searchWrapperClass}>
                    <input className={searchInputClass} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search place..." />
                    <span className={searchIconClass} onClick={weatherApp}><FaSearch size={20} /></span>
                </div>

                {/* Weather Section */}
                {
                    loading ? (
                        <div className={loadingWrapperClass}>
                            <div className={loadingSpinnerClass}></div>
                            <p className={loadingTextClass}>Searching weather...</p>
                        </div>
                    ) : error ? (
                        <div className={errorWrapperClass}>
                            <FcSearch size={32} />
                            <p className={errorTextClass}>{error}</p>
                        </div>
                    ) : data ? (
                        <div className="mt-8 text-center w-full">
                            <h2 className={locationClass}>
                                {[data?.location?.name, data?.location?.country].filter(Boolean).join(", ")}
                            </h2>
                            <div className="flex justify-center mt-4">
                                <img src={data?.current?.condition?.icon} alt="weather" className={weatherIconClass} />
                            </div>
                            <div className="mt-2">
                                <span className={temperatureClass}>
                                    {data?.current?.temp_c} <span className="text-5xl text-white">°C</span>
                                </span>
                            </div>
                            <p className={conditionClass}>{data?.current?.condition?.text}</p>
                            <div className={dividerClass}></div>
                            <div className={extraInfoClass}>
                                <div className={`${infoBoxClass} ${humidityHoverClass}`}>
                                    <span className={infoLabelClass}>Humidity</span>
                                    <span className={infoValueClass}>{data?.current?.humidity}%</span>
                                </div>
                                <div className={`${infoBoxClass} ${windHoverClass}`}>
                                    <span className={infoLabelClass}>Wind</span>
                                    <span className="text-lg font-semibold text-purple-200">{data?.current?.wind_kph} km/h</span>
                                </div>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        </div>
    </>
}

export default Weather