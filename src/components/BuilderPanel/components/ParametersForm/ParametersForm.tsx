import { useState } from "react";
import { Strategy } from "../../../../api/hooks/derived/types";
import { StrategySelector } from "./components";
import styles from "./ParametersForm.module.scss";

export const ParametersForm = () => {
    const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(
        null
    );

    return (
        <div className={styles.container}>
            <StrategySelector
                value={selectedStrategy}
                onChange={setSelectedStrategy}
            />
        </div>
    );
};
