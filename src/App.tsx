import { Header } from "./components/Header";
import { AppContent } from "./components/AppContent";
import styles from "./App.module.scss";

function App() {
    return (
        <div className={styles.app}>
            <Header />
            <main className={styles.main}>
                <AppContent />
            </main>
        </div>
    );
}

export default App;
