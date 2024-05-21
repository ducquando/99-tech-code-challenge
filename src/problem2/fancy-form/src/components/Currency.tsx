import { useState, useEffect } from "react";

export const Currency = () => {
    const [currency, setCurrency] = useState("");

    useEffect(() => {
        fetch('https://interview.switcheo.com/prices.json')
            .then(response => response.json())
            .then(json => setCurrency(json[0]["currency"]))
    }, []);

    return (
        <div>
            {currency}
        </div>
    );
}