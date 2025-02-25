import { FUNCTION_URL } from "./config";

interface RecallProps {
    index: number;
    total: number;
    spec: any;
    vegaSpec: any;
}

export async function recallLogger (props: RecallProps) {
    if (process.env.NODE_ENV === 'production') {
        try {
            const res = await fetch(FUNCTION_URL.general, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(props)
            });
            const result = await res.json();
        } catch (error) {
            console.error(error);
        }
    } else {
        console.log(`current env ${process.env.NODE_ENV}`, props);
    }
}