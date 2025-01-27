import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { BuilderRoute, MonitorRoute } from "./routes";
import { WSProvider } from "./api/ws/WSProvider";
import { API_CONFIG } from "./api/config";
import styles from "./App.module.scss";
import { ThemeProvider } from "@deriv-com/quill-ui";

export const App = () => {
    return (
        <BrowserRouter>
            <WSProvider url={API_CONFIG.wsUrl}>
                <ThemeProvider theme="light">
                    <div className={styles.app}>
                        <Header />
                        <main className={styles.main}>
                            <Routes>
                                <Route
                                    path="/builder"
                                    element={<BuilderRoute />}
                                />
                                <Route
                                    path="/monitor"
                                    element={<MonitorRoute />}
                                />
                                <Route
                                    path="*"
                                    element={<Navigate to="/builder" replace />}
                                />
                            </Routes>
                        </main>
                    </div>
                </ThemeProvider>
            </WSProvider>
        </BrowserRouter>
    );
};
