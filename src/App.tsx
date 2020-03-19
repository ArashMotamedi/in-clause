import React, { useState, useEffect } from "react";
import styles from "./app.module.scss";

const transforms = ["none", "lowercase", "uppercase"] as const;
type ITransform = typeof transforms[number];

export function App() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [options, setOptions] = useState<IOptions>({ transform: "none", linebreak: false });

    useEffect(() => {
        if (!input.trim()) {
            setOutput("");
            return;
        }

        const inLines = input.split("\n");
        const outLines = inLines
            .filter(line => line)
            .map(line =>
                options.transform === "lowercase" ? line.toLowerCase() :
                    options.transform === "uppercase" ? line.toUpperCase() :
                        line
            )
            .map(line => `"${line}"`)

        const delimiter = options.linebreak ? ",\n" : ",";
        const output = outLines.join(delimiter);
        setOutput(output);

    }, [input, options]);

    return <div className={styles.container}>
        <div className={styles.options}>
            <label htmlFor="linebreak-option">Line break</label>
            <input
                id="linebreak-option"
                type="checkbox"
                checked={options.linebreak}
                onChange={e => {
                    console.log(e.currentTarget.value);
                    setOptions({ ...options, linebreak: e.currentTarget.checked })
                }} />
            <label htmlFor="transform-option">Transform</label>
            <select
                id="transform-option"
                value={options.transform}
                onChange={e => {
                    console.log(e.currentTarget.value);
                    setOptions({ ...options, transform: e.currentTarget.value as ITransform })
                }}
            >
                {transforms.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
        </div>
        <div className={styles.textareas}>
            <div className={styles.input}>
                <textarea className={styles.input} value={input} onChange={e => setInput(e.target.value)}></textarea>
            </div>
            <div className={styles.output}>
                <textarea readOnly className={styles.output} value={output} onFocus={e => e.target.select()} />
            </div>
        </div>
    </div >
}

interface IOptions {
    transform: ITransform;
    linebreak: boolean;
}