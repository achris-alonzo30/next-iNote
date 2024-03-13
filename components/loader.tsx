import { FallingLines } from "react-loader-spinner";
export const Loader = () => {
    return (
        <div className="flex flex-col gap-y-2">
            <FallingLines
                color="#a1a1aa"
                width="100"
                visible={true}
            />
            <span className="text-zinc-300 text-xl font-semibold animate-pulse">Loading...</span>
        </div>
    )
}
