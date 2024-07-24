import * as React from "react";
import { cn } from "../../lib/utils";

const Avatar = ({ className, name, src, ...props }) => (
  <div className={cn("inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-200", className)} {...props}>
    {src ? (
      <img className="w-full h-full rounded-full" src={src} alt={name} />
    ) : (
      <span className="text-sm font-medium text-gray-600">{name[0]}</span>
    )}
  </div>
);

export default Avatar;
