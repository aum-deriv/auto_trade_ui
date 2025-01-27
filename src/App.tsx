import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { BuilderRoute, MonitorRoute } from "./routes";
import { WSProvider } from "./api/ws/WSProvider";
import { API_CONFIG } from "./api/config";
import styles from "./App.module.scss";

export const App = () => {
    return (
        <BrowserRouter>
            <WSProvider url={API_CONFIG.wsUrl}>
                <div className={styles.app}>
                    <Header />
                    <main className={styles.main}>
                        <Routes>
                            <Route path="/builder" element={<BuilderRoute />} />
                            <Route path="/monitor" element={<MonitorRoute />} />
                            <Route
                                path="*"
                                element={<Navigate to="/builder" replace />}
                            />
                        </Routes>
                    </main>
                </div>
            </WSProvider>
        </BrowserRouter>
    );
};
