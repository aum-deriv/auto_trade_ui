import { Panel, PanelGroup } from "react-resizable-panels";
import { Text } from "@deriv-com/quill-ui";
import { ParametersForm } from "./components";
import { AIBuilder } from "./components/AIBuilder";
import { ResizeHandle } from "../ResizeHandle";
import styles from "./BuilderPanel.module.scss";

export const BuilderPanel = () => {
    return (
        <div className={styles.container}>
            <Text size="lg" bold>
                Strategy Builder
            </Text>

            <PanelGroup direction="vertical" className={styles.panelGroup}>
                <Panel className={styles.panel}>
                    <ParametersForm />
                </Panel>
                <ResizeHandle direction="vertical" />
                <Panel className={styles.panel}>
                    <AIBuilder />
                </Panel>
            </PanelGroup>
        </div>
    );
};
