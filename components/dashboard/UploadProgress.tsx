import { uploadSteps } from "@/lib/upload-steps";
import type { UploadStatus } from "@/types/workspace";

type UploadProgressProps = {
  uploadStatus: UploadStatus;
};

export function UploadProgress({ uploadStatus }: UploadProgressProps) {
  if (uploadStatus === "idle") return null;

  return (
    <div className="mt-5 rounded-lg border border-zinc-800 bg-zinc-950/80 p-4">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="font-medium text-zinc-200">{uploadStatus}</span>
        <span className="text-zinc-500">
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
                  isComplete ? "bg-blue-500" : "bg-zinc-800"
                }`}
              />
              <span
                className={`hidden text-xs sm:block ${
                  isComplete ? "text-zinc-200" : "text-zinc-600"
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
