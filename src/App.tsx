import { Header } from "./components/Header";
import { AppContent } from "./components/AppContent";
import { WSProvider } from "./api/ws";
import styles from "./App.module.scss";

function App() {
    return (
        <div className={styles.app}>
            <Header />
            <main className={styles.main}>
                <WSProvider url="ws://localhost:8080/ws">
                    <AppContent />
                </WSProvider>
            </main>
        </div>
    );
}

export default App;
