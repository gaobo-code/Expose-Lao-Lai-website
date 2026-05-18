import { ArrowPathIcon } from "@heroicons/react/24/outline";

const Reload = () => {

    const reloadFun = () => {
        window.location.reload();
    };

    return (
        <div
            className="w-9 h-9 fixed bottom-4 right-4 b:right-7 bg-maincolor rounded-sm flex items-center justify-center hover:bg-[#353030] transition-all duration-300 ease-out cursor-pointer"
            onClick={reloadFun}
        >
            <ArrowPathIcon className="size-6 text-white" />
        </div>
    );
};

export default Reload;
