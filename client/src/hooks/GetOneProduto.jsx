import { useEffect, useState } from "react";
import client from "../api/Api";

function GetOneProduto(id) {
    const [produto, setProduto] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const produtoData = async () => {
        try {
            const res = await client.get(`/produtos/${id}`);
            setLoading(false);
            if (res.data) {
                setProduto(res.data);
            } else {
                setProduto([]);
            }
        } catch (err) {
            setError("Lamento, ocorreu um erro ou o produto não existe!");
            setProduto([])
            setLoading(false)
        }
    };

    useEffect(() => {
        setLoading(true)
        setError(null)
        produtoData();
    }, [])

    return { produto, loading, error }
}

export default GetOneProduto;