import { uploadSteps } from "@/lib/upload-steps";
import type { UploadStatus } from "@/types/workspace";

type UploadProgressProps = {
  uploadStatus: UploadStatus;
};

export function UploadProgress({ uploadStatus }: UploadProgressProps) {
  if (uploadStatus === "idle") return null;

  return (
    <div className="mt-5 rounded-2xl border border-white/80 bg-white/65 p-4 shadow-sm backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="font-bold text-slate-800">{uploadStatus}</span>
        <span className="text-slate-500">
          {uploadStatus === "Completed" ? "Done" : "Processing"}
        </span>
      </div>

      <div className="grid gap-2 sm:grid-cols-5">
        {uploadSteps.map((step) => {
          const isComplete =
            uploadSteps.indexOf(step) <= uploadSteps.indexOf(uploadStatus);

          return (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`h-2 flex-1 rounded-full ${
                  isComplete ? "bg-blue-500" : "bg-slate-200"
                }`}
              />
              <span
                className={`hidden text-xs sm:block ${
                  isComplete ? "text-slate-700" : "text-slate-400"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
