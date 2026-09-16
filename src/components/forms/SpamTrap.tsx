import type { RefObject } from "react";

export function SpamTrap({
  id,
  inputRef,
}: {
  id: string;
  inputRef: RefObject<HTMLInputElement | null>;
}) {
  return (
    <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
      <label htmlFor={id}>Company website</label>
      <input
        ref={inputRef}
        id={id}
        name="companyWebsite"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}
