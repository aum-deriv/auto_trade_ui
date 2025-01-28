import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { BuilderRoute, MonitorRoute } from "./routes";
import { WSProvider } from "./api/ws/WSProvider";
import { API_CONFIG } from "./api/config";
import styles from "./App.module.scss";
import { SnackbarController, ThemeProvider } from "@deriv-com/quill-ui";
import { SnackbarProvider } from "@deriv-com/quill-ui";

export const App = () => {
    return (
        <BrowserRouter>
            <WSProvider url={API_CONFIG.wsUrl}>
                <ThemeProvider theme="light">
                    <div className={styles.app}>
                        <Header />
                        <SnackbarProvider>
                            <SnackbarController />
                            <main className={styles.main}>
                                <Routes>
                                    <Route
                                        path="/builder"
                                        element={<BuilderRoute />}
                                    />
                                    <Route
                                        path="/dashboard"
                                        element={<MonitorRoute />}
                                    />
                                    <Route
                                        path="*"
                                        element={
                                            <Navigate to="/dashboard" replace />
                                        }
                                    />
                                </Routes>
                            </main>
                        </SnackbarProvider>
                    </div>
                </ThemeProvider>
            </WSProvider>
        </BrowserRouter>
    );
};
