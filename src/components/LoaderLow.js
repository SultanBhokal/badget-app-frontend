import { useStorage } from "../hooks/store";
import "./loaderlow.css";

function LoaderLow() {
    const lowLoading = useStorage((state) => state.lowLoading)
    if (!lowLoading) return null
    return (
        <div class="cover-spin"></div>
    )
}

export default LoaderLow