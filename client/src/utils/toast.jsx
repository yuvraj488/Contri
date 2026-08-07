import { toast } from "react-hot-toast";
import {
  CircleCheck,
  CircleAlert,
  CircleX,
  Info,
} from "lucide-react";

const ToastCard = ({ children }) => (
  <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-4 shadow-xl">
    {children}
  </div>
);

const ToastContent = ({
  Icon,
  iconColor,
  title,
  description,
}) => (
  <div className="flex items-start gap-3">
    <Icon
      size={22}
      className={`${iconColor} mt-0.5 flex-shrink-0`}
    />

    <div className="min-w-0">
      <h4 className="font-semibold text-stone-900">
        {title}
      </h4>

      {description && (
        <p className="mt-1 text-sm leading-5 text-neutral-500">
          {description}
        </p>
      )}
    </div>
  </div>
);

const animatedToast = (
  Icon,
  iconColor,
  title,
  description,
  duration
) => {
  toast.dismiss();

  return toast.custom(
    (t) => (
      <div
        className={`transition-all duration-300 ease-out ${
          t.visible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-2 scale-95 opacity-0"
        }`}
      >
        <ToastCard>
          <ToastContent
            Icon={Icon}
            iconColor={iconColor}
            title={title}
            description={description}
          />
        </ToastCard>
      </div>
    ),
    {
      duration,
    }
  );
};

export const showSuccess = (
  title,
  description = ""
) =>
  animatedToast(
    CircleCheck,
    "text-emerald-600",
    title,
    description,
    2500
  );

export const showError = (
  title,
  description = ""
) =>
  animatedToast(
    CircleX,
    "text-red-600",
    title,
    description,
    4000
  );

export const showWarning = (
  title,
  description = ""
) =>
  animatedToast(
    CircleAlert,
    "text-amber-500",
    title,
    description,
    3500
  );

export const showInfo = (
  title,
  description = ""
) =>
  animatedToast(
    Info,
    "text-sky-600",
    title,
    description,
    2500
  );